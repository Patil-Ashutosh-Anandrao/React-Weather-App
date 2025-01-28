import React from 'react'

{/* import hook from the React library*/}
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

{/* import CSS file */}
import './Weather.css'

{/* import Search Icon */}
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png' 
import search1 from '../assets/search1.png'

// defines a functional component
const Weather = () => {

    // create a reference to a DOM element
    const inputRef = useRef();

    // create a state variable and a function to update it.
    const [weatherData, setWeatherData] = useState(false);


    const allIcons ={
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    }

    // create a function to fetch weather data from the API
    const search = async (city) => {

        // check if the city name is empty
        if (city === ''){
            return alert('Please enter a city name');
        }

        // fetch weather data from the API using the city name as a parameter 
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            // This is a promise which will return the response from the server
            const response = await fetch(url); 

            // This is also a promise which will return the data in JSON format
            const data = await response.json(); 

            // check if the response is not ok
            if (!response.ok) {
                alert(data.message);
                return;
            }

            // if icon is not found in the allIcons object, then use the clear icon as default icon 
            const icon = allIcons[data.weather[0].icon] || clear ; 


            // set the weather data in the state variable 
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon, 
            }); 
        }

        // catch any error that occurs during the fetch operation 
        catch(err){
            setWeatherData(false); 
        }
    }


    // useEffect hook is used to run the search function when the component is mounted 
    useEffect(() => {
        search('london');
    }, [])




    return (
        <div>

            {/* parent container */}
            <div className='parent-container'>

                {/* Weather Card */}
                <div className="weather">

                    {/* Search Bar */}
                    <div className='search-bar'>

                        {/* Search Icon */}
                        <input ref={inputRef} type='text' placeholder='Search...' />

                        {/* Search Button */}
                        <img src={search1} alt="Search Icon" onClick={()=>search(inputRef.current.value)}/>
                    </div>



                    {/* 
                    {weatherData? 
                    <>weatherData present execute this block </>
                    :
                    <>weatherData absent execute this block</>
                    } 
                    */}

                    { weatherData ?
                        <>

                            {/* Weather details */} 
                            <img src={weatherData.icon} alt="" className='weather-icon' />
                            <p className='temperature'>{weatherData.temperature}&deg;C</p>
                            <p className='location'>{weatherData.location}</p> 

                            {/* Weather Info */}
                            <div className='weather-data'>

                                {/* Weather Info column-1 */}
                                <div className='col'>
                                    <img src={humidity} alt="" />
                                    <div>
                                        <p>{weatherData.humidity} %</p>
                                        <span>Humidity</span>
                                    </div>
                                </div>

                                
                                {/* Weather Info column-2 */}
                                <div className='col'>
                                    <img src={wind} alt="" />
                                    <div>
                                        <p>{weatherData.windSpeed} km/hr</p>
                                        <span>Wind Speed</span>
                                    </div>
                                </div>

                            </div>

                        </>
                        :
                        <>
                            <p>Weather Data Not Found</p>
                        </>
                        }

                </div>

            </div>

        </div>
    )
}

export default Weather
