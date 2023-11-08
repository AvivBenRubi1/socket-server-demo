const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const DroneData = require("./DTOs/drone-data.dto");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
let drone_id = 1052654852;

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("dji_telemetry", (sd) => {
    console.log(sd);
    socket.broadcast.emit("dji_telemetry", sd);
  });

  const coordinates = [
    [31.9560679241175, 34.842889310330996],
    [31.957824237325653, 34.83903162954704],
    [31.95471104357846, 34.839407138809634],
  ];
  const a = coordinates.map((coord) => coord.reverse());

  socket.emit("get_antenna", {
    latitude: 31.956506679241175,
    longitude: 34.842889310330996,
    geo: a
  });

  
  function createDrone() {
    let droneData = new DroneData(31.5017, 34.4668, drone_id.toString());
    console.log(droneData, "start");
    const interval = setInterval(() => {
      socket.emit("dji_telemetry", droneData);
      droneData.latitude += 0.024;
      droneData.longitude += 0.023;
      droneData.altitude = 123.254;
    }, 1000);
    if (drone_id < 1052654854) drone_id++;
  }

  var interval = setInterval(() => {
    createDrone();
  }, 20000);

  socket.on("disconnect", () => {
    console.log("A user disconnected\n");
  });
});

const PORT = 4000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
