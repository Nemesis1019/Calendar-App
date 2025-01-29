import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment/min/moment-with-locales";
import { useEffect, useState } from "react";

import { PopUpCalendar } from "../PopUpCalendar/PopUpCalendar";
import { selectAllTasks } from '../../redux/Calendar/calendarSelectors';
import { useSelector } from 'react-redux';
import { PopUpCalendarUpdate } from '../PopUpCalendarUpdate/PopUpCalendarUpdate';
import { CustomToolbar } from '../ToolBarCustom/ToolBarCustom';
import { selectValue } from '../../redux/DateCalendar/dateCalendarSelectors';

import "./GridCalendar-styles.css";
import { locale } from '../../constants/constants';




moment.locale(locale);
const localizer = momentLocalizer(moment);
interface Event {
  title: string;
  start: Date;
  end: Date;
}
const GridCalendar = () => {

const [isOpenPopUp,setIsOpenPopUp]= useState(false)
const [isOpenPopUpUpdate,setIsOpenPopUpUpdate]= useState(false)
const [dataTime,setDataTime]=useState<{ start: Date , end: Date  }>({start:new Date(),end:new Date()})
const [dataUpdate,setDataUpdate]=useState({title:'',id:'',description:''})
const [events, setEvents] = useState<Event[]>([]);


const tasks = useSelector(selectAllTasks);
const dateValue=useSelector(selectValue)

const [selectedDate, setSelectedDate]=useState(new Date())


  useEffect(() => {

    const convertedEvents = tasks.map(event => ({
      id:event.id,
      title: event.title,
      description:event.description,
      start: new Date(event.start),
      end: new Date(event.end)
    }));

    setEvents(convertedEvents);
  }, [tasks]);

  useEffect(()=>{
      if(dateValue){
        setSelectedDate(new Date(dateValue))
      }
      
    
    
  },[dateValue])

  

  const handlePopUp=(event:any)=>{
    setDataTime({start:event.start,end:event.end})
    setIsOpenPopUp(!isOpenPopUp)
    
    
  }
  const dayPropGetter = (date:any) => {
    const isSelected =
      moment(date).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD");

    return {
      className: isSelected ? "selected-day" : "", 
      style: isSelected ? { backgroundColor: "#f28c8c", color: "#333" } : {}, 
    };
  };
  const handlePopUpUpdate=(event:any)=>{
    setDataTime({start:event.start,end:event.end})
    
    setDataUpdate({title:event.title,id:event.id,description:event.description})
    setIsOpenPopUpUpdate(!isOpenPopUpUpdate)
    
    
  }
  const closePopUp=()=>{
    setIsOpenPopUp(!isOpenPopUp)
  }
  const closePopUpUpdate=()=>{
    setIsOpenPopUpUpdate(!isOpenPopUpUpdate)
  }

  
  const handleDate=(date:Date)=>{
    
    setSelectedDate(date)
  }



  return (
    <>
     {isOpenPopUp&&<PopUpCalendar isOpenPopUp={isOpenPopUp} closePopUp={closePopUp} dataTime={{start:dataTime.start,end:dataTime.end}}/> }
     {isOpenPopUpUpdate&&<PopUpCalendarUpdate isOpenPopUp={isOpenPopUpUpdate} closePopUp={closePopUpUpdate} dataTime={{start:dataTime.start,end:dataTime.end}} uuid={dataUpdate.id} title={dataUpdate.title} description={dataUpdate.description}/>  }
     <Calendar
      localizer={localizer}
      defaultView="week"
      
      views={["day", "week", "month"]}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      date={selectedDate}
      onNavigate={(date)=>handleDate(date)}
      
      components={{
        toolbar: CustomToolbar,
        
      }}
      onSelectSlot={(event)=>handlePopUp(event)}
      onSelectEvent={(event)=>handlePopUpUpdate(event)}
      dayPropGetter={dayPropGetter}
      messages={{
        month: "Mes",
        week: "Semana",
        day: "Día",
        today: "Hoy",
        previous: "Anterior",
        next: "Siguiente",
        noEventsInRange: "No hay eventos en este rango.",
      }}
    />
    </>
   
  );
};

export { GridCalendar };
