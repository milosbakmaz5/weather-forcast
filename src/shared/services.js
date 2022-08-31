import axios from "axios";
import { weatherForcastURL } from "./data";
import { restructureWeatherForcastData } from "./util";

export const getWeatherForcastData = async (lat, lon) => {
  try {
    const { data: { list } = {} } = await axios.get(weatherForcastURL(lat, lon)) || {};
    return restructureWeatherForcastData(list);
  } catch (error) {
    throw error;
  }
};
