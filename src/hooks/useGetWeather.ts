import { useEffect, useState } from "react"
import { getLocation } from "../helpers/getLocation"
import { getWeather } from "../helpers/getWeather"

const  useGetWeather=()=>{
    const [data,setData]=useState({weather:'',iconWeather:''})

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const { latitude, longitude } = await getLocation();  
                const { temperature, iconWeather } = await getWeather(latitude, longitude);  
                setData({ weather: temperature, iconWeather: iconWeather });  
            } catch (error) {
                console.error("Error fetching weather:", error);
            }
        };

        fetchWeather();
    }, []);  
    
    return data
}

export {useGetWeather}