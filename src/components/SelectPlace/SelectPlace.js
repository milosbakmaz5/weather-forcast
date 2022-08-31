import { useRef, useState, useEffect } from "react";
import map from "lodash/map";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import styles from "./SelectPlace.module.scss";

export default ({ onSelectPlace }) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [inputValue, setInputValue] = useState("");
  const [showPlacePredictions, setShowPlacePredictions] = useState(false);
  const container = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!container.current.contains(event.target)) {
        setShowPlacePredictions(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  const getPlaceDetails = (placeId) => {
    placesService?.getDetails(
      {
        placeId,
      },
      (placeDetails) =>
        onSelectPlace({
          lat: placeDetails.geometry.location.lat(),
          lon: placeDetails.geometry.location.lng(),
        })
    );
  };

  const selectPlaceHandler = (item, index) => {
    getPlaceDetails(placePredictions[index].place_id);
    setInputValue(item.description);
    getPlacePredictions({ input: item.description });
    setShowPlacePredictions(false);
  };

  const renderInputField = () => (
    <input
      value={inputValue}
      placeholder="Please enter your location..."
      spellCheck={false}
      onChange={({ target: { value }}) => {
        setInputValue(value);
        getPlacePredictions({ input: value });
      }}
      onFocus={() => {
        !showPlacePredictions && setShowPlacePredictions(true);
      }}
      loading={isPlacePredictionsLoading.toString()}
    />
  );

  const renderPlacePredictions = () =>
    showPlacePredictions && (
      <div
        className={styles.placesWrapper}
        onBlur={() => setShowPlacePredictions(false)}
      >
        {map(placePredictions, (item, index) => (
          <p
            key={item.description}
            onClick={() => selectPlaceHandler(item, index)}
          >
            {item.description}
          </p>
        ))}
      </div>
    );

  return (
    <div ref={container} className={styles.container}>
      {renderInputField()}
      {renderPlacePredictions()}
    </div>
  );
};
