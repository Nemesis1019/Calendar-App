import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const CustomToolbar = (toolbar:any) => {
    const handleViewChange = (view:string) => {
      toolbar.onView(view); // Cambiar la vista
    };
  
    return (
      <div className="flex flex-row gap-2 m-4  justify-between items-center">
        
        <div className="flex justify-between items-center gap-[2px]">
            <div className="bg-[#e3e3e3] h-[30px] w-[30px] rounded-t-[8px] rounded-b-[8px] rounded-r-[8px] flex justify-center items-center">
               <GrFormPrevious className="cursor-pointer" size={'32px'} onClick={() => toolbar.onNavigate("PREV")} />
            </div>
        

          <div className="cursor-pointer bg-[#e3e3e3] h-[30px] w-[80px] rounded-t-[8px] rounded-b-[8px] rounded-r-[8px] text-center flex justify-center items-center" onClick={()=>toolbar.onNavigate("TODAY")}>Hoy</div> 
          
          <div className="bg-[#e3e3e3] h-[30px] w-[30px] rounded-t-[8px] rounded-b-[8px] rounded-r-[8px] flex justify-center items-center">
               <MdOutlineNavigateNext className="cursor-pointer" size={'38px'} onClick={() => toolbar.onNavigate("NEXT")} />
            </div>
          
        </div>
        <span className="font-bold text-lg">{toolbar.label}</span>
  
        
        <div className="flex justify-center gap-4 max-h-[60px] items-center">
          <button
            onClick={() => handleViewChange("day")}
            className={`px-4 py-2 rounded-[8px]  ${
              toolbar.view === "day" ? "bg-[#F23131] text-white" : "bg-[#00000000] text-[#9A9494]"
            }`}
          >
            Día
          </button>
          <button
            onClick={() => handleViewChange("week")}
            className={`px-4 py-2 rounded-[8px] ${
              toolbar.view === "week" ? "bg-[#F23131] text-white" : "bg-[#00000000] text-[#9A9494]"
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => handleViewChange("month")}
            className={`px-4 py-2 rounded-[8px] ${
              toolbar.view === "month" ? "bg-[#F23131] text-white" : "bg-[#00000000] text-[#9A9494]"
            }`}
          >
            Mes
          </button>
        </div>
      </div>
    );
  };

  export {CustomToolbar}