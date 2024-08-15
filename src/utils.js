export const rangeMapping = {
  sensor_id: [
    {
      min: 70,
      max: 100,
      color: "#f94144",
    },
    {
      min: 60,
      max: 70,
      color: "#ffbf06",
    },
    {
      min: 30,
      max: 60,
      color: "#90be6d",
    },
    {
      min: 25,
      max: 30,
      color: "#ffbf06",
    },
    {
      min: 0,
      max: 30,
      color: "#f94144",
    },
  ],
  pm2: [
    {
      min: 0.0,
      max: 12.0,
      color: "#90be6d",
    },
    {
      min: 12.1,
      max: 35.4,
      color: "#f8961e",
    },
    {
      min: 35.5,
      max: 55.4,
      color: "#f3722c",
    },
    {
      min: 55.5,
      max: 150.4,
      color: "#ee0b00",
    },
    {
      min: 150.5,
      max: 250.4,
      color: "#560bad",
    },
    {
      min: 250.5,
      max: 400,
      color: "#472d30",
    },
  ],
  temp: [
    {
      min: 0.0,
      max: 12.0,
      color: "#90be6d",
    },
    {
      min: 12.1,
      max: 35.4,
      color: "#f8961e",
    },
    {
      min: 35.5,
      max: 55.4,
      color: "#f3722c",
    },
    {
      min: 55.5,
      max: 150.4,
      color: "#ee0b00",
    },
    {
      min: 150.5,
      max: 250.4,
      color: "#560bad",
    },
    {
      min: 250.5,
      max: 400,
      color: "#472d30",
    },
  ],

  pm10: [
    {
      min: 0,
      max: 54,
      color: "#90be6d",
    },
    {
      min: 55,
      max: 154,
      color: "#f8961e",
    },
    {
      min: 155,
      max: 254,
      color: "#f3722c",
    },
    {
      min: 255,
      max: 354,
      color: "#ee0b00",
    },
    {
      min: 355,
      max: 424,
      color: "#560bad",
    },
    {
      min: 425,
      max: 500,
      color: "#472d30",
    },
  ],
  co2: [
    {
      min: 400,
      max: 699,
      color: "#90be6d",
    },
    {
      min: 700,
      max: 1099,
      color: "#f8961e",
    },
    {
      min: 1100,
      max: 1599,
      color: "#f3722c",
    },
    {
      min: 1600,
      max: 2099,
      color: "#ee0b00",
    },
    {
      min: 2100,
      max: 2500,
      color: "#472d30",
    },
  ],
  tvoc: [
    {
      min: 0.0,
      max: 0.4,
      color: "#90be6d",
    },
    // {
    //   min: 12.1,
    //   max: 35.4,
    //   color: "#f8961e",
    // },
    // {
    //   min: 35.5,
    //   max: 55.4,
    //   color: "#f3722c",
    // },
    // {
    //   min: 55.5,
    //   max: 150.4,
    //   color: "#ee0b00",
    // },
    // {
    //   min: 150.5,
    //   max: 250.4,
    //   color: "#560bad",
    // },
    {
      min: 0.6,
      max: 1,
      color: "#472d30",
    },
  ],
  hcho: [
    {
      min: 0.0,
      max: 0.1,
      color: "#90be6d",
    },
    // {
    //   min: 12.1,
    //   max: 35.4,
    //   color: "#f8961e",
    // },
    // {
    //   min: 35.5,
    //   max: 55.4,
    //   color: "#f3722c",
    // },
    // {
    //   min: 55.5,
    //   max: 150.4,
    //   color: "#ee0b00",
    // },
    // {
    //   min: 150.5,
    //   max: 250.4,
    //   color: "#560bad",
    // },
    {
      min: 0.1,
      max: 1,
      color: "#472d30",
    },
  ],
  co: [
    {
      min: 0,
      max: 9999,
      color: "#427f30",
    },
  ],
  ozone: [
    {
      min: 0,
      max: 9999,
      color: "#4a7d30",
    },
  ],
  no2: [
    {
      min: 0,
      max: 9999,
      color: "#427df0",
    },
  ],
};

export const parameterType = {
  humidity: { type: "percentage", limit: 100 },
  temp: { type: "number", limit: 100 },
  pm2: { type: "number", limit: 500 },
  pm10: { type: "number", limit: 500 },
  co2: { type: "number", limit: 2500 - 400 + 400 },
  tvoc: { type: "number", limit: 0.1 },
  hcho: { type: "number", limit: 0.1 },
  co: { type: "number", limit: 0.1 },
  ozone: { type: "number", limit: 0.1 },
  no2: { type: "number", limit: 0.1 },
};

export const OUTDOOR_DIFFERENT_PARAMETERS = {
  // created new constant as the names and keys are different form inside one
  col1: [
    {
      name: "PM 2.5",
      key: "pm2",
      unit: "µg/m3",
    },
    {
      name: "PM 10",
      key: "pm10",
      unit: "µg/m3",
    },
  ],
  col2: [
    {
      name: "No2",
      key: "no2",
      unit: "ppb",
    },
    {
      name: "Ozone",
      key: "ozone",
      unit: "ppb",
    },
    {
      name: "Co",
      key: "co",
      unit: "ppm",
    },
  ],
  col3: [
    {
      name: "Humidity",
      key: "humidity",
      unit: "%",
    },
    {
      name: "Temp",
      key: "temp",
      unit: "°C",
    },
  ],
};

export const DIFFERENT_PARAMETERS = {
  col1: [
    {
      name: "PM 2.5",
      key: "pm2",
      unit: "µg/m3",
    },
    {
      name: "PM 10",
      key: "pm10",
      unit: "µg/m3",
    },
  ],
  col2: [
    {
      name: "TVOC",
      key: "tvoc",
      unit: "ppb",
    },
    {
      name: "HCHO",
      key: "hcho",
      unit: "mg/m3",
    },
    {
      name: "Co2",
      key: "co2",
      unit: "ppm",
    },
  ],
  col3: [
    {
      name: "Humidity",
      key: "humidity",
      unit: "%",
    },
    {
      name: "Temp",
      key: "temp",
      unit: "°C",
    },
  ],
};

export const AQI_MAPPING = [
  { name: "Good", height: "", color: "#90be6d" },
  { name: "Moderate", height: "", color: "#f8961e" },
  { name: "Unhealthy for sensitive group", height: "", color: "#f3722c" },
  { name: "Unhealthy", height: "", color: "#ee0b00" },
  { name: "Very Unhealthy", height: "", color: "#560bad" },
  { name: "Hazardous", height: "", color: "#472d30" },
];
