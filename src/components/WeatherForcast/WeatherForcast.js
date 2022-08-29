import _ from "lodash";
import moment from "moment";
import { formatDatesOfWeatherForcast } from "../../shared/util";
import styles from "./WeatherForcast.module.scss";

export default ({ forcast, averageTemperature }) => {
  return (
    <div className={styles.container}>
      <div className={styles.avgTempWrapper}>
        <p>{formatDatesOfWeatherForcast(forcast)}</p>
        <div className={styles.avgTemp}>
          <h1>{averageTemperature}</h1>
          <span>°C</span>
        </div>
      </div>
      <div className={styles.forcastWrapper}>
        {_.map(forcast, (element) => (
          <div className={styles.dayForcast} key={element.day}>
            <p>{element.dayInWeek}</p>
            <div className={styles.tempWrapper}>
              <h3>{element.avgTemp}</h3>
              <span>°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
