import axios from "axios";
import { weatherForcastURL } from "./data";
import { restructureWeatherForcastData } from "./util";

export const getWeatherForcastData = async (lat, lon) => {
  try {
    const response = await axios.get(weatherForcastURL(lat, lon));
    return restructureWeatherForcastData(response.data.list);
  } catch (error) {
    throw error;
  }
};
