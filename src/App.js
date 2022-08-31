import Home from "./containers/Home";

export default () =>
  !process.env.REACT_APP_GOOGLE_API_KEY ||
    !process.env.REACT_APP_OPEN_WEATHER_API_KEY
    ?
    <h1 style={{ textAlign: "center" }}>Please ask Milos for .env file</h1>
    : <Home />;

