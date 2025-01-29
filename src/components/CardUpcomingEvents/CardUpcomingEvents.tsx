import { getDate } from '../../helpers/getDate';
import { getTime } from '../../helpers/getTime';

import './CardUpcomingEvents-style.scss'

const CardUpcomingEvents=({date,title,start,end}:{date:string,title:string,start:string,end:string})=>{
    
    
    
    return(
        <div className='ml-4'>
         <div className='text-white mt-4'>{getDate(date)}</div>
         <div className='text-gray-500'>{getTime(start)} - {getTime(end)}</div>
         <div className='text-white'>{title}</div>
        </div>
       
    )
}

export {CardUpcomingEvents}