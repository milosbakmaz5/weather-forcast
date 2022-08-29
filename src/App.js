import Home from "./containers/Home";

export default () => {
  if (
    !process.env.REACT_APP_GOOGLE_API_KEY ||
    !process.env.REACT_APP_OPEN_WEATHER_API_KEY
  )
    return (
      <h1 style={{ textAlign: "center" }}>Please ask Milos for .env file</h1>
    );
  return <Home />;
};
