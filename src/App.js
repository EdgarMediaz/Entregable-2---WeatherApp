import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [weather, setWeather] = useState({})
  const [isCelcious, setIsCelcious] = useState(true);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=234e9b3fa7ea3eb74f854cbf3d893230`)
        .then(res => {
          setWeather(res.data)
          setIsLoading(false)
        })
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  console.log(weather);

  const changeTemperature = () => setIsCelcious(!isCelcious)

  return (
    <div className={(typeof weather.main !== 'undefined') ? ((weather.main.temp > 300) ? 'App-hot' : 'App') : 'App'}>
      {
        isLoading ? (
          <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        ) : (
          <div className="card">
            <h1 className='title'>Weather App</h1>
            <input type="text"
              className='search-bar'
              placeholder='Search...'
            />
            <h2 className='location'>
              {weather.name}, {weather.sys?.country}
            </h2>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <i class="fa-solid fa-temperature-half">
              <b>Temp: </b> {isCelcious ? `${(weather.main?.temp - 273.15).toFixed(0)} °C` : `${((weather.main?.temp - 273.15) * 9 / 5 + 32).toFixed(0)} °F`}
              <p>{weather.weather?.[0]?.description}</p>
            </i>
            <div className="weather-values">
              <i class="fa-solid fa-wind">
                <b>Wind: </b>{weather.wind?.speed} m/s
              </i>
              <i class="fa-solid fa-water">
                <b>Humidity: </b>{weather.main?.humidity} %
              </i>
            </div>
            <div className="max-min">
              <i class="fa-solid fa-temperature-arrow-up">
                <b>Max: </b>{isCelcious ? `${(weather.main?.temp_max - 273.15).toFixed(0)} °C` : `${((weather.main?.temp_max - 273.15) * 9 / 5 + 32).toFixed(0)} °F`}
              </i>
              <i class="fa-solid fa-temperature-arrow-down">
                <b>Min: </b>{isCelcious ? `${(weather.main?.temp_min - 273.15).toFixed(0)} °C` : `${((weather.main?.temp_min - 273.15) * 9 / 5 + 32).toFixed(0)} °F`}
              </i>
            </div>
            <button onClick={changeTemperature}>Degrees °C/°F</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
