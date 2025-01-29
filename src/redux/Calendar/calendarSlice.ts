import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description:string;
  start: string;
  end:string
}

interface TasksState {
  tasks: Task[];
}

const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const initialState: TasksState = {
  tasks: loadTasksFromLocalStorage(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
        
      state.tasks.push(action.payload);
      state.tasks.sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index >= 0){ state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));

      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));

    },
    
    resetTasks: (state) => {
        state.tasks = [];
      },
  },
});



export const { addTask, updateTask, deleteTask,resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;