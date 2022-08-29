export const weatherForcastURL = (lat, lon) =>
  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
