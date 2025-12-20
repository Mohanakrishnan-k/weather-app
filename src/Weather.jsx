import { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search from './assets/search.png'
import Humidity from './assets/humidity.png'
import Wind from './assets/wind.png'

const Weather = () => {

  const [weatherData, setWeatherData] = useState(false);
  const [degree, setDegree] = useState(true);

  const inputRef = useRef();

  const Search = async(city) => {

    if(city === ""){
      alert("Enter city....");
      return;
    }

      try{
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(URL);
      const Data = await response.json();  
      const data = {
         temperature: Math.floor(Data.main.temp),
         humidity: Data.main.humidity,
         city: Data.name,
         windspeed: Data.wind.speed,
         icon: Data.weather[0].icon,
         weather: Data.weather[0].main
      };
      setWeatherData(data);
      }catch(err){
        setWeatherData(false);
      }      
  }

  useEffect(()=>{
    Search("chennai");
  },[])

  return (
    <>
    
    <div className='container'>
      <h2>Weather App</h2>
       {weatherData?
       <>
        <div className='weather-input'>
           <input ref={inputRef} type="text" placeholder='Enter city'
            onKeyDown={(e)=>{
              if(e.key === "Enter") 
              {
                Search(e.target.value);
                e.target.value='';
              }
            }}
           />
           <img src={search} className='icon' onClick={() => Search(inputRef.current.value)}/>
       </div>
       <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} className='weather' loading='lazy' />
       <span className='climate'>{weatherData.weather}</span>
       <p className='temperature'>
        {degree?(`${weatherData.temperature}°C`):`${Math.floor((weatherData.temperature * 9/5)+32)}°F`}
        </p>
       <button className='toggle-btn'
       onClick={()=>setDegree(!degree)}
       >Toggle °C/°F</button>
       <p className='location'>{weatherData.city}</p>
       <div className='weather-data'>
           <div className='col'>
              <img src={Humidity} className='data-icon' />
              <div className='data-col'>
                <p>{weatherData.humidity}%</p>
                <span className='col-span'>Humidity</span>
              </div>
           </div>
           <div className='col'>
              <img src={Wind} className='data-icon wind' />
              <div className='data-col'>
                <p>{weatherData.windspeed}</p>
                <span className='col-span'>Windspeed</span>
              </div>
           </div>
       </div>
       </>:<>
        <div className='error'>
          <span>Oop's!!!!</span>
          <p>Error in fetching weather details</p>
        </div>
       </>
       }
    </div>
    </>
  )
}

export default Weather