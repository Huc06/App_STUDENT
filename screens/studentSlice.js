// app/studentSlice.js

import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
  },
  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
    },
    addStudent(state, action) {
      state.students.push(action.payload);
    },
    updateStudent(state, action) {
      const index = state.students.findIndex(student => student.Mssv === action.payload.Mssv);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent(state, action) {
      state.students = state.students.filter(student => student.Mssv !== action.payload);
    },
  },
});

// Export actions
export const { setStudents, addStudent, updateStudent, deleteStudent } = studentSlice.actions;

// Export reducer
export default studentSlice.reducer;