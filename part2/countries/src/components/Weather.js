import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const APIkey = "" //insert your api key
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${APIkey}&units=metric`;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(url).then((response) => setWeather(response.data));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [url]);


  return (
    <div>
      {weather && (
        <div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
          </div>
          <strong>{weather.main.temp} C</strong>
        </div>
      )}
    </div>
  );
};

export default Weather;
