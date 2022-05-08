import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [weather, setWeather] = useState({})
  const [isCelcious, setIsCelcious] = useState(true);

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=234e9b3fa7ea3eb74f854cbf3d893230`)
        .then(res => setWeather(res.data))
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  console.log(weather);

  const changeTemperature = () => setIsCelcious(!isCelcious)

  return (
    <div className="App">
      <div className="card">
        <h1>Weather App</h1>
        <h2>
          {weather.name}, {weather.sys?.country} 
        </h2>
        <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        <p>
          <b>Temperature: </b> {isCelcious ? `${(weather.main?.temp - 273.15).toFixed(2)} °C` : `${((weather.main?.temp - 273.15) * 9/5 + 32).toFixed(2)} °F`}
        </p>
        <p>
          <b>Wind: </b>{weather.wind?.speed} m/s
        </p>
        <button onClick={changeTemperature}>Degrees °C/°F</button>
      </div>
    </div>
  );
}

export default App;
