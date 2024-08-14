import { Fragment, useEffect, useMemo, useState } from "react";
import dflLogo from "./assets/dlfLogo.png";
import vrLogo from "./assets/vayuGuardLogo.jpeg";
import "./App.css";
import { Grid, Box, Stack, Typography, Container } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import {
  rangeMapping,
  parameterType,
  DIFFERENT_PARAMETERS,
  AQI_MAPPING,
  OUTDOOR_DIFFERENT_PARAMETERS,
} from "./utils";
const defaultdata = {
  sensor_id: 0,
  pm2: 0,
  pm10: 0,
  tvoc: 0,
  hcho: 0,
  temp: 0,
  humidity: 0,
  co2: 0,
  ozone: 0,
  no2: 0,
  co: 0,
};

function App() {
  const [values, setValues] = useState(0);
  const [values2, setValues2] = useState(0);
  const [data, setData] = useState({
    inSide: defaultdata,
    outSide: defaultdata,
  });

  // function generateRandomValue(limit) {
  //   let randomValue = Math.random() * limit;
  //   randomValue = randomValue.toFixed(1);
  //   return randomValue;
  // }

  const getRandomValue = (parameter, isRandom) => {
    if (parameter) {
      const { type = "", limit = "" } = parameterType?.[parameter];
      switch (type) {
        case "percentage":
        case "number":
          const value = isRandom
            ? data.outSide[parameter]
            : data.inSide[parameter];
          const matchedParameter = rangeMapping[parameter]?.find(
            (item) => value >= item.min && value <= item.max
          );

          const color = matchedParameter?.color
            ? matchedParameter?.color
            : "#90be6d";

          return { color, value };

        default:
          return { color: "", value: "" };
      }
    }
  };

  // const outSideData = () => {
  //   const mapping = {};
  //   Object.values(DIFFERENT_PARAMETERS).forEach((col) => {
  //     col.forEach(({ key }) => {
  //       console.log({ key });
  //       const { type = "", limit = "" } = parameterType?.[key];
  //       if (["percentage", "number"].includes(type)) {
  //         const value = generateRandomValue(limit);
  //         mapping[key] = value;
  //       }
  //     });
  //   });
  //   return mapping;
  // };
  const outSideData = async () => {
    const HEADERS = {
      "x-api-key":
        "888a1c2c8bfe9e8b33c8af364ca02f8cca770ac121ce8b12d71341509166fa4f",
    };
    let outsideWeather = fetch(
      // "https://cors-anywhere.herokuapp.com/https://api.ambeedata.com/weather/latest/by-lat-lng?lat=28.479161&lng=77.059325",//using CORS proxy
      "https://api.ambeedata.com/weather/latest/by-lat-lng?lat=28.479161&lng=77.059325",
      {
        headers: HEADERS,
      }
    ).then((response) => response.json());
    let outsideSensor = fetch(
      // "https://cors-anywhere.herokuapp.com/https://api.ambeedata.com/latest/by-city?city=Gurgaon",//using CORS roxy
      "https://api.ambeedata.com/latest/by-city?city=Gurgaon",
      {
        headers: HEADERS,
      }
    ).then((response) => response.json());
    [outsideSensor, outsideWeather] = await Promise.all([
      //call apis concurrently
      outsideSensor,
      outsideWeather,
    ]);
    const combineData = {
      ...outsideSensor.stations[0],
      ...outsideWeather.data,
    };
    console.log(data);
    setData({
      inSide: data.inSide,
      outSide: {
        //doing it manually because the keys already defined and the data retrieve from api are different
        co: combineData.CO,
        ozone: combineData.OZONE,
        humidity: combineData.humidity,
        pm2: combineData.PM25,
        pm10: combineData.PM10,
        temp: combineData.apparentTemperature,
        no2: combineData.NO2,
      },
    });
    console.log(combineData);
  };
  useEffect(() => {
    loadPage();
  }, [values]);

  useEffect(() => {
    //useEffect to update outside data
    outSideData();
  }, [values2]);

  const loadPage = async () => {
    // const outSide = outSideData();
    const updatedData = {
      outSide: data.outSide,
      inSide: defaultdata,
    };

    try {
      const response = await fetch(
        "https://aqm-service.vayuguard.com/sensor/get-indoor-data",
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      ).then((res) => res.json());

      if (response.success) {
        updatedData.inSide = response.data;
      }
      setData(updatedData);
    } catch (error) {
      setData(updatedData);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((prev) => prev + 1);
    }, 30000);

    outSideData(); //initializing data at the time of rendering
    const interval2 = setInterval(() => {
      //interval to update outside data every 30  min
      setValues2((prev) => prev + 1);
    }, 60 * 30 * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  const arrowSelected = useMemo(() => {
    const result = { insideAir: "", outSideAir: "" };

    if (data.inSide.pm10 > data.inSide.pm2) {
      const matchedParameter = rangeMapping.pm10?.find(
        (item) => data.inSide.pm10 >= item.min && data.inSide.pm10 <= item.max
      );
      result.insideAir = matchedParameter.color;
    } else {
      const matchedParameter = rangeMapping.pm2?.find(
        (item) => data.inSide.pm2 >= item.min && data.inSide.pm2 <= item.max
      );
      result.insideAir = matchedParameter.color;
    }

    if (data.outSide.pm10 >= data.outSide.pm2) {
      const matchedParameter = rangeMapping.pm10?.find(
        (item) => data.outSide.pm10 >= item.min && data.outSide.pm10 <= item.max
      );
      result.outSideAir = matchedParameter.color;
    } else {
      const matchedParameter = rangeMapping.pm2?.find(
        (item) => data.outSide.pm2 >= item.min && data.outSide.pm2 <= item.max
      );
      result.outSideAir = matchedParameter?.color || "";
    }

    return result;
  }, [data]);

  const CircleComponenet = ({ data }) => {
    const { name, key, unit, isRandom } = data;
    const { color, value } = getRandomValue(key, isRandom);
    return (
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            textAlign: "center",
            color: "#4582f8",
            fontSize: "1.5rem",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {name}
        </Typography>

        <Box
          sx={{
            width: "7vw",
            height: "7vw",
            borderRadius: "50%",
            border: `12px solid ${color}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              " 2px 2px 2px rgba(0, 0, 0, 0.1),4px 4px 4px rgba(0, 0, 0, 0.2), 6px 6px 6px #cbd0d5;",
          }}
        >
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: 600,
                clear: "both",
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: 600,
                clear: "both",
              }}
            >
              {unit}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", clear: "both" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={5}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ width: "100%", my: "5px" }}>
              <Box>
                {" "}
                <img width={70} src={dflLogo} alt="logo"></img>
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {" "}
                Indoor Air Quality
              </Typography>
            </Box>

            <Box sx={{ width: "100%", flex: "1 1 0" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Object.values(DIFFERENT_PARAMETERS).map((col) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                      mx: "25px",
                    }}
                  >
                    {col.map((parameter) => (
                      <CircleComponenet
                        data={{
                          name: parameter.name,
                          key: parameter.key,
                          unit: parameter.unit,
                          isRandom: false,
                        }}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ width: "100%", marginBottom: "5px" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {" "}
                AQI
              </Typography>
            </Box>

            <Box sx={{ width: "100%", flex: "1 1 0" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {AQI_MAPPING.map((item) => (
                  <Box
                    sx={{
                      width: "100%",
                      flex: "1 1 0",
                      position: "relative",
                      backgroundColor: item.color,
                    }}
                  >
                    {arrowSelected.insideAir === item.color && (
                      <ArrowLeftIcon
                        sx={{
                          fontSize: "4rem",
                          position: "absolute",
                          left: "-50px",
                          top: "25%",
                        }}
                      />
                    )}
                    {arrowSelected.outSideAir === item.color && (
                      <ArrowRightIcon
                        sx={{
                          fontSize: "4rem",
                          position: "absolute",
                          right: "-50px",
                          top: "25%",
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "16px",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={5}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ width: "100%", my: "5px" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {" "}
                <img width={80} src={vrLogo} alt="logo"></img>
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                {" "}
                Outdoor Air Quality
              </Typography>
            </Box>

            <Box sx={{ width: "100%", flex: "1 1 0" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {Object.values(OUTDOOR_DIFFERENT_PARAMETERS).map((col) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                      mx: "25px",
                    }}
                  >
                    {col.map((parameter) => (
                      <CircleComponenet
                        data={{
                          name: parameter.name,
                          key: parameter.key,
                          unit: parameter.unit,
                          isRandom: true,
                        }}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
