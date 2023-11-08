class DroneData {
  serial_number;
  longitude;
  latitude;
  altitude;
  height;
  app_lat;
  app_lon;
  longitude_home;
  latitude_home;
  device_type;

  constructor(latitude, longitude, serial_number) {
    this.serial_number = serial_number;
    this.device_type = "matrice 600";
    this.latitude = latitude;
    this.longitude = longitude;
    this.height = 6

    this.app_lat = latitude + 0.07;
    this.app_lon = longitude;

    this.latitude_home = latitude -0.07;
    this.longitude_home = longitude;
  }
}

module.exports = DroneData;
