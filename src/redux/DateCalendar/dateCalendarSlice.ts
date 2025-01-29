
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DateCalendar {
    
    date:string
  }

  const initialState: DateCalendar = {
    date:'',
  };

const dateCalendarSlice=createSlice({
    name:'date',
    initialState,
    reducers:{
        setValue: (state, action:PayloadAction<string>) => {
            state.date = action.payload;
          },
    }
})
export const { setValue } = dateCalendarSlice.actions;
export default dateCalendarSlice.reducer;