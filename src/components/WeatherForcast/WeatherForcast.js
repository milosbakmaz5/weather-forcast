import map from "lodash/map";
import { formatDatesOfWeatherForcast } from "../../shared/util";
import styles from "./WeatherForcast.module.scss";

export default ({ forcast, averageTemperature }) => (
  <div className={styles.container}>
    <div className={styles.avgTempWrapper}>
      <p>{formatDatesOfWeatherForcast(forcast)}</p>
      <div className={styles.avgTemp}>
        <h1>{averageTemperature}</h1>
        <span>°C</span>
      </div>
    </div>
    <div className={styles.forcastWrapper}>
      {map(forcast, ({ day, dayInWeek, avgTemp}) => (
        <div className={styles.dayForcast} key={day}>
          <p>{dayInWeek}</p>
          <div className={styles.tempWrapper}>
            <h3>{avgTemp}</h3>
            <span>°C</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

