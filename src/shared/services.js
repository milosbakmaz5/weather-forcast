import axios from "axios";
import { coordinatesURL, weatherForcastURL } from "./data";
import { restructureWeatherForcastData } from "./util";

export const getCityCoordinate = async (city) => {
  try {
    const response = await axios.get(coordinatesURL(city));
    const { lon, lat } = response.data[0];
    return { lon, lat };
  } catch (error) {
    throw error;
  }
};

export const getWeatherForcastData = async (lat, lon) => {
  try {
    const response = await axios.get(weatherForcastURL(lat, lon));
    return restructureWeatherForcastData(response.data.list);
  } catch (error) {
    throw error;
  }
};
