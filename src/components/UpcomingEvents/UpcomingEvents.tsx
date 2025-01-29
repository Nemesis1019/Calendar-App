import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { selectAllTasks } from "../../redux/Calendar/calendarSelectors";
import { CardUpcomingEvents } from "../CardUpcomingEvents/CardUpcomingEvents";
import { useGetWeather } from "../../hooks/useGetWeather";

const UpcomingEvents=()=>{

    const tasks = useSelector(selectAllTasks);
   
    const [events,setEvents]=useState(tasks)
    

    useEffect(() => {

        setEvents(tasks);
      }, [tasks]);

      const {weather,iconWeather} =  useGetWeather();
      
    return(
        <div className="flex flex-col w-full">
        {events.length>=1&&<div className=" mt-4  text-white w-full text-center flex justify-between border-gray-700 border-t-[0.5px] border-dashed">
                                <p>Eventos programados</p>
                                <div className="flex"><div className="text-white">{weather}°C</div><img className="h-[30px] w-[30px]" src={iconWeather}/></div>
                            </div>
            }
         <div className="overflow-y-auto w-full" >
         
         
            {events.map((event)=>{
           return <CardUpcomingEvents date={event.start} title={event.title} start={event.start} end={event.end}/>
        })}
        </div>
        
        {events.length<1&&<div className=" mt-4 h-full text-white w-full text-center border-gray-700 border-t-[0.5px] border-dashed">No hay eventos programados</div>}
        </div>
       
        
        
    )
}

export {UpcomingEvents}