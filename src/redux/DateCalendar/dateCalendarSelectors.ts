import { RootState } from '../store';

export const selectValue = (state: RootState) => state.value.date;