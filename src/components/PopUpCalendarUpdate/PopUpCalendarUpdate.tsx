import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";

import { deleteTask,  updateTask } from "../../redux/Calendar/calendarSlice";
import { selectAllTasks } from "../../redux/Calendar/calendarSelectors";

import './PopUpCalendarUpdate-style.scss'




const PopUpCalendarUpdate = ({
  isOpenPopUp,
  closePopUp,
  dataTime,
  uuid,
  title,
  description
}: {
  isOpenPopUp: boolean;
  closePopUp: () => void;
  dataTime: { start: Date; end: Date };
  uuid:string,
  title:string,
  description:string,
}) => {
const dispatch = useDispatch();

  const [timePicker, setTimePicker] = useState({
    title:title,
    description:description,
    startTime: dataTime.start.toISOString() ,
    endTime: dataTime.end.toISOString() ,
  });

  const tasks = useSelector(selectAllTasks);

  const handleFirstTimePicker = (event: any) => {

    setTimePicker((prevState) => ({ ...prevState, startTime: event.$d.toISOString() }));

  };

  const handleTitle = (event: any) => {
    
    setTimePicker((prevState) => ({ ...prevState, title:event.target.value}))

  };
  const handleDescription=(event:any)=>{
    setTimePicker((prevState) => ({ ...prevState, description:event.target.value}))
  }

  const handleSecondTimePicker = (event: any) => {

    setTimePicker((prevState) => ({ ...prevState, endTime: event.$d.toISOString() }));

  };
  const onSubmit = () => {

    if (timePicker.startTime > timePicker.endTime) {
      toast("Verifica los tiempos asiganados para el evento.")
    } else {
        
      const isOverlapping = tasks.some(
            
        (task: any) =>{if(uuid!=task.id){return dataTime.start.toISOString() <= task.end && dataTime.end.toISOString() >= task.start
         

        }}
         
       
            
      );
    
    if (isOverlapping) {
       toast("Este evento se solapa con uno existente.")
        
    }
    else{
            dispatch(updateTask({id: uuid,
              title: timePicker.title,
              description:timePicker.description,
              start: timePicker.startTime,
              end:timePicker.endTime}))
            closePopUp()
        }
      }
      

       
      
    }
  
  const handleDelete = () => {
    dispatch(deleteTask(uuid))
    closePopUp()
  };

  if (!isOpenPopUp) return null;
  return (
    <div className="bg-gray-500/50  top-0 fixed left-0 z-10 h-[100%] w-[100%] flex flex-row justify-center items-center">
      <div className="w-[90%] h-[50%] max-w-[400px] min-h-[200px] max-h-[300px] relative bg-white rounded-[20px] flex flex-col justify-center items-center">
        <img
          onClick={closePopUp}
          className="top-0 left-0 z-10  w-[15px] h-[15px] absolute cursor-pointer mt-2 ml-2"
          src="../../assets/icons/closeButton.svg"
        />
        <img
          onClick={handleDelete}
          className="top-0 right-0 z-10  w-[20px] h-[20px] absolute cursor-pointer mt-2 mr-2"
          src="../../assets/icons/deleteIcon.svg"
          
        />
        <input
          type="text"
          value={timePicker.title}
          className="rounded-[4px] h-[40px] bg-gray-200 w-[90%] mb-4"
          placeholder="Add title"
          onChange={handleTitle}
        />
        <input
          type="text"
          value={timePicker.description}
          className="rounded-[4px] h-[40px] bg-gray-200 w-[90%] "
          placeholder="Add description"
          onChange={handleDescription}
        />

        <div className="flex flex-row m-3 justify-center items-center gap-2">´

          <img
            className="w-[20px] h-[20px]"
            src="../../assets/icons/clockIcon.svg"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            
            <MobileTimePicker
              defaultValue={dayjs(dataTime.start)}
              onChange={(event) => handleFirstTimePicker(event)}
            />

          </LocalizationProvider>
          <p>-</p>

          <LocalizationProvider dateAdapter={AdapterDayjs}>

            <MobileTimePicker
              defaultValue={dayjs(dataTime.end)}
              onChange={(event) => handleSecondTimePicker(event)}
            />

          </LocalizationProvider>
         
        </div>

        <div className="w-full flex justify-end ">
          
          <button
            onClick={onSubmit}
            disabled={timePicker.title.length==0 || timePicker.description.length==0}
            className="m-3 bg-[#F23131] w-[90px] h-[40px] rounded-[4px]"
          >
            Update
          </button>
          
        </div>
      </div>
    </div>
  );
};

export { PopUpCalendarUpdate };
