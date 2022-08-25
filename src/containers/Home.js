import { useEffect, useState } from "react";
import SelectPlace from "../components/SelectPlace/SelectPlace";
import { getCityCoordinate, getWeatherForcastData } from "../shared/services";
import { getAverageTemperature } from "../shared/util";

export default () => {
  const [error, setError] = useState();
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { lon, lat } = await getCityCoordinate("Belgrade");
        console.log(lon, lat);
        setCoordinates({ lon, lat });
        console.log(lon, lat);
      } catch (error) {
        setError(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!coordinates) return;
    (async () => {
      try {
        const weatherForcastByDays = await getWeatherForcastData(
          coordinates.lat,
          coordinates.lon
        );
        console.log(weatherForcastByDays);
        console.log(getAverageTemperature(weatherForcastByDays));
      } catch (error) {
        setError(true);
      }
    })();
  }, [coordinates]);

  if (error) return <p>Oops, something went wrong. Please try again!</p>;

  return <SelectPlace />;
};
