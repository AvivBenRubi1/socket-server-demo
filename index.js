const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const DroneData = require("./DTOs/drone-data.dto");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  function startSimulation() {
    drone_id = 1;

    // function createDrone() {
    //   let droneData = new DroneData(31.5017, 34.4668, drone_id.toString());
    //   const interval = setInterval(() => {
    //     socket.emit("dji_telemetry", droneData);
    //     droneData.latitude += 0.004;
    //     droneData.longitude += 0.003;
    //   }, 1000);
    //   drone_id++;
    // }

    // createDrone();

    const coordinates = [
      [31.95650679241175, 34.842889310330996],
      [31.957824237325653, 34.83903162954704],
      [31.95471104357846, 34.839407138809634]
    ]

    const a = coordinates.map(coord => coord.reverse())
    socket.emit("get_antenna", {
      latitude: 31.95650679241175,
      longitude: 34.842889310330996,
      geo: a
    });

    var interval = setInterval(() => {
      //createDrone();
    }, 20000);
  }

  console.log("A user connected");
  startSimulation();

  socket.on("dji_telemetry", (sd) => {
    console.log(sd)
    socket.broadcast.emit("dji_telemetry", sd)
  });

  socket.on("drone_exist", (sd) => {
    console.log(sd)
    socket.broadcast.emit("dji_telemetry", sd)
  });

  socket.on("power_check_packet", (sd) => {
    console.log(sd)
    socket.broadcast.emit("dji_telemetry", sd)
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected\n");
  });
});

const PORT = 4000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
