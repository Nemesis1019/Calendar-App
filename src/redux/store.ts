import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './Calendar/calendarSlice';
import dateCalendarSlice from './DateCalendar/dateCalendarSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    value: dateCalendarSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;