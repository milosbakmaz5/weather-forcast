import { useState } from "react";
import isEmpty from "lodash/isEmpty";

import { getWeatherForcastData } from "../shared/services";
import { getAverageTemperature, getBackgroundGradient } from "../shared/util";

import SelectPlace from "../components/SelectPlace/SelectPlace";

import styles from "./Home.module.scss";
import WeatherForcast from "../components/WeatherForcast/WeatherForcast";

export default () => {
  const [error, setError] = useState();
  const [weatherForcast, setWeatherForcast] = useState();
  const [avgTemp, setAvgTemp] = useState(20);

  const fetchWeatherForcast = async ({ lat, lon }) => {
    try {
      const data = await getWeatherForcastData(lat, lon);
      setWeatherForcast(data);
      setAvgTemp(getAverageTemperature(data));
    } catch (error) {
      setError(true);
    }
  };

  const renderSelect = () =>
    <SelectPlace onSelectPlace={fetchWeatherForcast} />

  const renderForcast = () =>
    !isEmpty(weatherForcast) &&
    <WeatherForcast forcast={weatherForcast} averageTemperature={avgTemp} />

  if (error) return <p>Oops, something went wrong. Please try again!</p>;

  return (
    <div
      className={styles.container}
      style={{
        background: getBackgroundGradient(avgTemp),
      }}
    >
      {renderSelect()}
      {renderForcast()}
    </div>
  );
};
