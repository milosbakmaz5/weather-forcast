import moment from "moment";
import _ from "lodash";

const weatherColors = {
  "-40": "#153078",
  "-39": "#143981",
  "-38": "#143e86",
  "-37": "#13478f",
  "-36": "#134c94",
  "-35": "#12559d",
  "-34": "#125aa2",
  "-33": "#1163ac",
  "-32": "#1168b1",
  "-31": "#1071ba",
  "-30": "#1076bf",
  "-29": "#1076bf",
  "-28": "#0f7fc9",
  "-27": "#0f84ce",
  "-26": "#0f84ce",
  "-25": "#0e8dd7",
  "-24": "#0e92dc",
  "-23": "#0e92dc",
  "-22": "#1897de",
  "-21": "#1f9adf",
  "-20": "#229ce0",
  "-19": "#299fe1",
  "-18": "#2ca1e2",
  "-17": "#30a3e3",
  "-16": "#30a3e3",
  "-15": "#37a7e5",
  "-14": "#3fabe7",
  "-13": "#43ade8",
  "-12": "#47afe9",
  "-11": "#47afe9",
  "-10": "#50b4eb",
  "-9": "#55b6ec",
  "-8": "#5ebbee",
  "-7": "#63beef",
  "-6": "#6ec4f2",
  "-5": "#74c7f3",
  "-4": "#74c7f3",
  "-3": "#80cef6",
  "-2": "#89d3f8",
  "-1": "#89d3f8",
  0: "#9cddfd",
  1: "#9eddfa",
  2: "#a2ddf4",
  3: "#a6ddef",
  4: "#a6ddef",
  5: "#addde5",
  6: "#b0dde0",
  7: "#b7ddd7",
  8: "#b9ddd4",
  9: "#beddcd",
  10: "#c3dcc6",
  11: "#c3dcc6",
  12: "#cddab7",
  13: "#d2d9b0",
  14: "#d2d9b0",
  15: "#dbd7a1",
  16: "#e0d69a",
  17: "#ead48c",
  18: "#f0d282",
  19: "#fdcf6f",
  20: "#fdcf6f",
  21: "#fdc86c",
  22: "#fdc66b",
  23: "#fdc169",
  24: "#fdbf68",
  25: "#fdba66",
  26: "#fdb865",
  27: "#fdb865",
  28: "#fdb363",
  29: "#fdb162",
  30: "#fdb162",
  31: "#fdae61",
  32: "#fdae61",
  33: "#fda95f",
  34: "#fda95f",
  35: "#fda85e",
  36: "#fda35c",
  37: "#fda35c",
  38: "#fe9455",
  39: "#fe9455",
  40: "#fe9455",
};

export const getBackgroundGradient = (avgTemp) => {
  const lowerTemp = avgTemp - 15;
  let lowerValue = weatherColors[lowerTemp] || weatherColors["-40"];
  let upperValue = weatherColors[avgTemp] || weatherColors[40];
  if (lowerTemp > 40) {
    lowerValue = weatherColors[40];
  }
  if (avgTemp < -40) {
    upperValue = weatherColors["-40"];
  }
  return `linear-gradient(135deg,${lowerValue},${upperValue})`;
};

export const restructureWeatherForcastData = (data) => {
  const weatherFocastByDays = {};
  data.forEach((element) => {
    const datetime = new Date(element.dt * 1000);
    const date = moment(datetime).format("M D YYYY");
    if (date in weatherFocastByDays) {
      weatherFocastByDays[date].temperatures.push(element.main.temp);
      return;
    }
    weatherFocastByDays[date] = {};
    weatherFocastByDays[date].temperatures = [];
    weatherFocastByDays[date].temperatures.push(element.main.temp);
    weatherFocastByDays[date].dayInWeek = moment(datetime).format("dddd");
  });
  Object.entries(weatherFocastByDays).forEach(([key, value]) => {
    weatherFocastByDays[key].avgTemp = Math.round(
      _.mean(value.temperatures.map((v) => Math.round(v)))
    );
    delete weatherFocastByDays[key].temperatures;
  });
  return Object.fromEntries(Object.entries(weatherFocastByDays).slice(0, 5));
};

export const getAverageTemperature = (obj) => {
  return Math.round(_.meanBy(Object.values(obj), "avgTemp"));
};
