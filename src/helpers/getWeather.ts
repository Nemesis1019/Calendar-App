import { apiKeyWeather } from "../constants/constants"

const getWeather= async (latitude:string,longitude:string):Promise<{temperature:string,iconWeather:string}>=>{
    const response= await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=${latitude},${longitude}`)
    const data=await response.json()
    return{
        temperature:data.current.temp_c,
        iconWeather:data.current.condition.icon

    }
}

export {getWeather}