import { CalendarCustom } from "../../components/Calendar/Calendar";
import { GridCalendar } from "../../components/GridCalendar/GridCalendar";
import { UpcomingEvents } from "../../components/UpcomingEvents/UpcomingEvents";

import './Home-style.scss'

const Home = () => {
  return (
    <div className="flex  w-full flex-col md:flex-row h-full">
      <div className="bg-calendar flex flex-col justify-center md:justify-start items-center ">
      
        <CalendarCustom />
        <div className="overflow-y-hidden hidden md:flex w-full h-full">
            <UpcomingEvents />
        </div>
        
      </div>
      <div className="w-full  max-h-screen overflow-y-auto">
        <GridCalendar />
      </div>
    </div>
  );
};

export { Home };
