import React, { useEffect, useState } from "react";
import './Weather.css';
import 'bootstrap/dist/css/bootstrap.css';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import WbTwilightSharpIcon from '@mui/icons-material/WbTwilightSharp';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';


const Weather=()=>{
    const[input,setInput]=useState("Gorakhpur");
    const[search,setSearch]=useState();
    const[city,setCity]=useState(null);
    const[date,setDate]=useState();
    const[weekday,setWeekDay]=useState();
    const[country,setCountry]=useState();
    const[wind,setWind]=useState();
   
   const week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   const day=new Date().getDay();

//feching weather data
useEffect(()=>{
        async  function fetchData(){
          const result= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=18616d7b4810af55cdca53c28e98f9a2`);
          const data= await result.json();
          setCity(data.main);
          setCountry(data.sys);
          setWind(data.wind)
          setDate(new Date().toLocaleDateString());
          setWeekDay(week[day]);
          console.log(city);
         }
        fetchData();
},[search]);

//input value    
const inputEvent=(event)=>{
    setInput(event.target.value);
}

//searching functionality
const searchItem=()=>{
  setSearch(input);

}

return(
<>
   {/*search box*/ }
   <div className="searchItem">
       <input type="text" name="" id="" onChange={inputEvent} value={input}/>
       <button className="btnSearch" onClick={searchItem}>Search</button>
    </div>

     {/*display the weather data*/}
     {!city?(<span >data not found</span>):(
     <div>
        <div className="main-div " >
                <div className="weather-status">
                    <ThunderstormOutlinedIcon style={{background:"white",color:"black",fontSize:"7rem"}}></ThunderstormOutlinedIcon>
                </div>
        
                <div className="weather-display d-flex w-100 justify-content-around ">
                    <div className="view-weather d-flex flex-row justify-content-start ">
                        <div className="tempature">
                            <h1>{city.temp} °C</h1>
                            <p>Max {city.temp_max} °C | Min {city.temp_min} °C</p>
                        </div>
                        <div>
                            <h1>HAZE</h1>
                            <p>{search},{country.country}</p>
                        </div>
                    </div>

                    <div className="weather-day">
                    <h3>{date}</h3>
                    <h3>{weekday}</h3>
                    <p>{new Date().toLocaleTimeString()}</p>
                    </div>
                </div>

                <div className="other-info ">

                    <div className="d-flex flex-row justify-content-start align-items">
                        <WbTwilightSharpIcon style={{color:"#2baea1",fontSize:"2.5rem"}}></WbTwilightSharpIcon>
                        <div>
                        <p>{country.sunset}</p>
                        <p>Sunset</p>
                        </div>  
                    </div>
                    <div className="d-flex flex-row justify-content-start align-items">  
                        <InvertColorsIcon style={{color:"#2baea1",fontSize:"2.5rem"}}></InvertColorsIcon>
                        <div>
                            <p>{city.humidity}</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-start align-items">
                    <ThunderstormOutlinedIcon style={{color:"#2baea1",fontSize:"2.5rem"}}></ThunderstormOutlinedIcon>
                        <div>
                            <p>Pressure</p>
                            <p>{city.pressure}</p>
                        </div>  
                    </div>
                    <div className="d-flex flex-row justify-content-start align-items">
                    <AirOutlinedIcon style={{color:"#2baea1",fontSize:"2.5rem"}}></AirOutlinedIcon>
                        <div>
                            <p>Wind</p>
                            <p>{wind.speed}</p>
                        </div>  
                    </div>
                   
                    
                  
                  
                </div>


        </div> 
    </div> )}
    
</>)
}

export default Weather; 