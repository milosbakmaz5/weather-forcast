import logo from "./logo.svg";
import "./App.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import _ from "lodash";
import { getBackgroundGradient } from "./shared/util";
import Home from "./containers/Home";

function App() {
  const [avgTemp, setAvgTemp] = useState();
  useEffect(() => {
    api();
  }, []);

  const api = async () => {
    // const response = await axios.get(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=Belgrade&limit=1&appid=${process.env.REACT_APP_API_KEY}`
    // );
    // const { lon, lat } = response.data[0];
    // const weatherResponse = await axios.get(
    //   `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    // );
    // const { list } = weatherResponse.data;
    // const weatherFocastByDays = {};
    // list.forEach((element) => {
    //   const datetime = new Date(element.dt * 1000);
    //   const date = moment(datetime).format("M D YYYY");
    //   if (date in weatherFocastByDays) {
    //     weatherFocastByDays[date].temperatures.push(element.main.temp);
    //     return;
    //   }
    //   weatherFocastByDays[date] = {};
    //   weatherFocastByDays[date].temperatures = [];
    //   weatherFocastByDays[date].dayInWeek = moment(datetime).format("dddd");
    // });
    // Object.entries(weatherFocastByDays).forEach(([key, value]) => {
    //   weatherFocastByDays[key].avgTemp = Math.round(
    //     _.mean(value.temperatures.map((v) => Math.round(v)))
    //   );
    //   delete weatherFocastByDays[key].temperatures;
    // });
    // setAvgTemp(20);
  };

  return (
    <div className="App">
      <header
        style={{
          background: getBackgroundGradient(avgTemp),
        }}
        className="App-header"
      >
        <Home />
      </header>
    </div>
  );
}

export default App;
