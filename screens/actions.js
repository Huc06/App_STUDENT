// actions.js

// export const ADD_MAJOR = 'ADD_MAJOR';
// export const REMOVE_MAJOR = 'REMOVE_MAJOR';
// export const SET_STUDENT_INFO = 'SET_STUDENT_INFO';

// export const addMajor = (index) => ({
//   type: ADD_MAJOR,
//   payload: index,
// });

// export const removeMajor = (index) => ({
//   type: REMOVE_MAJOR,
//   payload: index,
// });

// export const setStudentInfo = (name) => ({
//   type: SET_STUDENT_INFO,
//   payload: name,
// });


export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const ADD_MAJOR = 'ADD_MAJOR';
export const REMOVE_MAJOR = 'REMOVE_MAJOR';

export const addStudent = (student) => ({
  type: ADD_STUDENT,
  payload: student,
});

export const updateStudent = (student) => ({
  type: UPDATE_STUDENT,
  payload: student,
});

export const deleteStudent = (mssv) => ({
  type: DELETE_STUDENT,
  payload: mssv,
});

export const addMajor = (index) => ({
  type: ADD_MAJOR,
  payload: index,
});

export const removeMajor = (index) => ({
  type: REMOVE_MAJOR,
  payload: index,
});

// actions.js
export const SET_SELECTED_MAJOR = 'SET_SELECTED_MAJOR';

export const setSelectedMajor = (major) => ({
  type: SET_SELECTED_MAJOR,
  payload: major,
});

// actions.js
export const REMOVE_ALL_MAJORS = 'REMOVE_ALL_MAJORS';

export const removeAllMajors = () => ({
    type: REMOVE_ALL_MAJORS,
});