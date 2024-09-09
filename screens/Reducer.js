// // reducer.js
// import { combineReducers } from 'redux';
// import { ADD_MAJOR, REMOVE_MAJOR, SET_STUDENT_INFO } from './actions';

// const INITIAL_MAJOR_STATE = {
//   current: [],
//   possible: [
//     'Tất cả',
//     'Công nghệ thông tin',
//     'Quản trị kinh doanh',
//     'Sửa chữa ôtô',
//     'Khoa học vật liệu',
//     'Thiết kế thời trang',
//   ],
// };

// const INITIAL_STUDENT_STATE = {
//   name: '',
// };

// const majorReducer = (state = INITIAL_MAJOR_STATE, action) => {
//   switch (action.type) {
//     case ADD_MAJOR:
//       const { current, possible } = state;
//       const addedMajor = possible[action.payload];

//       if (addedMajor && !current.includes(addedMajor)) {
//         const newPossible = possible.filter((_, index) => index !== action.payload);
//         const newCurrent = [...current, addedMajor];
//         return { current: newCurrent, possible: newPossible };
//       }

//       return state;

//     case REMOVE_MAJOR:
//       const { current: currentMajors, possible: possibleMajors } = state;
//       const removedMajor = currentMajors[action.payload];

//       if (removedMajor) {
//         const newPossibleAfterRemoval = [...possibleMajors, removedMajor];
//         const newCurrentAfterRemoval = currentMajors.filter((_, index) => index !== action.payload);
//         return { current: newCurrentAfterRemoval, possible: newPossibleAfterRemoval };
//       }

//       return state;

//     default:
//       return state;
//   }
// };

// const studentReducer = (state = INITIAL_STUDENT_STATE, action) => {
//   switch (action.type) {
//     case SET_STUDENT_INFO:
//       return { ...state, name: action.payload };
//     default:
//       return state;
//   }
// };

// export default combineReducers({
//   major: majorReducer,
//   student: studentReducer,
// });

// reducers.js
import { ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT, ADD_MAJOR, REMOVE_MAJOR , SET_SELECTED_MAJOR , REMOVE_ALL_MAJORS  } from './actions';
import { Alert } from 'react-native'; // Đừng quên import Alert

const initialState = {
  students: [
    { Mssv: '001', name: 'Nguyễn Văn A', major: 'Công nghệ thông tin', address: 'Hà Nội' },
    { Mssv: '002', name: 'Trần Thị B', major: 'Quản trị kinh doanh', address: 'Hà Nội' },
    { Mssv: '003', name: 'Lê Văn C', major: 'Sửa chữa ôtô', address: 'Đà Nẵng' },
  ],
  major: {
    current: [],
    possible: [
       'Công nghệ thông tin',
       'Quản trị kinh doanh', 
       'Sửa chữa ôtô', 'Khoa học vật liệu', 
       'Thiết kế thời trang'],
    selectedMajor: '', // Cần được khởi tạo
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      // Kiểm tra trùng MSSV trước khi thêm
      const existingStudent = state.students.find(student => student.Mssv === action.payload.Mssv);
      if (existingStudent) {
        Alert.alert('Lỗi', 'Mã số sinh viên này đã tồn tại.');
        return state;
      }
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student =>
          student.Mssv === action.payload.Mssv ? action.payload : student
        ),
      };

    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.Mssv !== action.payload),
      };

    case ADD_MAJOR:
      return {
        ...state,
        major: {
          ...state.major,
          current: [...state.major.current, state.major.possible[action.payload]],
        },
      };

    case REMOVE_MAJOR:
      return {
        ...state,
        major: {
          ...state.major,
          current: state.major.current.filter((_, i) => i !== action.payload),
        },
      };

      case SET_SELECTED_MAJOR:
      return {
        ...state,
        major: {
          ...state.major,
          selectedMajor: action.payload, // Cập nhật ngành học đã chọn
        },
      };

      case REMOVE_ALL_MAJORS:
      return {
        ...state,
        major: {
            ...state.major,
            current: [], // Xóa tất cả ngành học đã chọn
        },
    };

    default:
      return state;
  }
};

export default reducer;
