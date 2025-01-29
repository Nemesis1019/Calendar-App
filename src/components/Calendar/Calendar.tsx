import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Holidays from 'date-holidays';

import { selectAllTasks } from '../../redux/Calendar/calendarSelectors';
import { setValue } from '../../redux/DateCalendar/dateCalendarSlice';
import { getDate } from '../../helpers/getDate';
import { country, locale, year } from '../../constants/constants';

import './Calendar-styles.css';



const hd = new Holidays(country); 
const holidays = hd.getHolidays(year); 


const CalendarCustom = () => {

  
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch();
  const [events, setEvents] = useState(tasks);
  
  useEffect(()=>{setEvents(tasks)},[tasks])
  
  

  const formatDateToString = (date: Date): string =>
    date.toISOString().split("T")[0];

 
  const eventDates = events.map((event) => formatDateToString(new Date(event.start)));

 
  const tileContent = ({ date, view }: any) => {
    if (view === "month" && eventDates.includes(formatDateToString(date))) {
      return (
        <div
          style={{
            backgroundColor: "#f28c8c",
            borderRadius: "50%",
            width: "8px",
            height: "8px",
            margin: "auto",
            marginTop: "5px",
          }}
        ></div>
      );
    }
    if (view === 'month') {
      const isHoliday = holidays.some(
        (holiday) => getDate(holiday.date)===getDate(date)
        
        
      );
      return isHoliday ? <div
      style={{
        color: "#f28c8c",
        borderRadius: "50%",
        width: "6px",
        height: "6px",
        margin: "auto",
        marginTop: "1px",
      }}
    >F</div> : null;
      
     
      
    }
  };
  
  const handleEvent=(date:any)=>{
    dispatch(setValue(date.toISOString()))
  }
  
  return (
    
    <Calendar showFixedNumberOfWeeks={true} tileContent={tileContent} onChange={handleEvent} locale={locale}/>
  );
};

export { CalendarCustom };
