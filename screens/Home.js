
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert ,TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Home = ({ navigation, route }) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); // Để lưu sinh viên đang chọn

  // useEffect(() => {
  //   if (route.params?.newStudent) {
  //     const newStudent = route.params.newStudent;

  //     // Kiểm tra trùng MSSV
  //     const existingStudent = students.find(student => student.Mssv === newStudent.Mssv);

  //     if (existingStudent) {
  //       Alert.alert('Lỗi', 'Mã số sinh viên này đã tồn tại.');
  //     } else {
  //       setStudents([...students, newStudent]);
  //     }
  //   }
  // }, [route.params?.newStudent]);

  useEffect(() => {
    // Check for new student added from Home or Drawer
    if (route.params?.newStudent) {
        const newStudent = route.params.newStudent;
        handleNewStudent(newStudent); // Add the new student to state
    }
}, [route.params]);

const handleNewStudent = (newStudent) => {
    const existingStudent = students.find(student => student.Mssv === newStudent.Mssv);
    if (!existingStudent) {
        const updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents); // Update filtered list
    } else {
        Alert.alert('Lỗi', 'Mã số sinh viên này đã tồn tại.');
    }
};

  useEffect(() => {
    filterStudents();
  }, [searchName, selectedMajor, students]);

  useEffect(() => {
    if (route.params?.updatedStudent) {
      const updatedStudent = route.params.updatedStudent;
      const index = students.findIndex(student => student.Mssv === updatedStudent.Mssv);

      if (index !== -1) {
        const updatedStudentsList = [...students];
        updatedStudentsList[index] = updatedStudent;
        setStudents(updatedStudentsList);
      }
    }
  }, [route.params?.updatedStudent]);
  const filterStudents = () => {
    let filtered = students; // Khởi tạo mảng lọc bằng mảng sinh viên gốc
  
    // Lọc theo ngành học
    if (selectedMajor && selectedMajor !== 'Tất cả') { // Chỉ lọc nếu ngành học được chọn và không phải "Tất cả"
      filtered = filtered.filter(student => student.major === selectedMajor);
    }
  
    // Lọc theo tên
    if (searchName) {
      filtered = filtered.filter(student => student.name.includes(searchName));
    }
  
    setFilteredStudents(filtered);
  };

  const handleEditStudent = () => {
    if (selectedStudent) {
      navigation.navigate('EditStudent', { student: selectedStudent });
    } else {
      Alert.alert("Thông báo", "Vui lòng chọn một sinh viên để chỉnh sửa");
    }
  };

  const handleDeleteStudent = async () => {
    if (selectedStudent) {
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn xóa sinh viên này?",
        [
          {
            text: "Hủy",
            style: "cancel"
          },
          {
            text: "Xóa",
            onPress: async () => {
              // Remove the selected student from the list
              const updatedStudents = students.filter(student => student.Mssv !== selectedStudent.Mssv);
              setStudents(updatedStudents);
              await saveToFile(updatedStudents); // Save updated list to file
              setSelectedStudent(null);
            },
            style: "destructive"
          }
        ]
      );
    } else {
      Alert.alert("Thông báo", "Vui lòng chọn một sinh viên để xóa");
    }
  };
  
  const handleAddStudent = () => {
    navigation.navigate('AddStudent', { selectedMajor }); // Truyền selectedMajor
  };

  const openDrawer = () => {
    navigation.toggleDrawer(); 
  };

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.studentItem, selectedStudent?.Mssv === item.Mssv && styles.selectedItem]}
      onPress={() => setSelectedStudent(item)}
    >
      <Text style={styles.studentName}>Tên sinh viên: {item.name}</Text>
      <Text style={styles.studentDetails}>Địa chỉ: {item.address}</Text>
      <Text style={styles.studentDetails}>Mã số sinh viên: {item.Mssv}</Text>
      <Text style={styles.studentDetails}>Ngành: {item.major}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <RNPickerSelect
        onValueChange={(value) => setSelectedMajor(value)}
        items={[
          { label: 'Tất cả', value: 'Tất cả' },
          { label: 'Công nghệ thông tin', value: 'cntt' },
          { label: 'Quản trị kinh doanh', value: 'qtkd' },
          { label: 'Sửa chữa ôtô', value: 'sco' },
          { label: 'Khoa học vật liệu', value: 'khvl' },
          { label: 'Thiết kế thời trang', value: 'tktt' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Chọn ngành học", value: '' }}
      />
      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.Mssv.toString()}
      />
       <TextInput
        style={styles.input}
        placeholder="Tìm kiếm theo tên"
        value={searchName}
        onChangeText={setSearchName}
      />
      <View style={styles.buttonContainer}>
        <Button title="Thêm mới" onPress={handleAddStudent} />
        <Button title="Chỉnh sửa" onPress={handleEditStudent} />
        <Button title="Xóa" onPress={handleDeleteStudent} />
        <Button title="Menu" onPress={openDrawer} /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  studentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: '#dcdcdc',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentDetails: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: -500,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    marginTop: 80,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
    marginTop: 80,
  },
});

export default Home;


// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';
// import { useSelector, useDispatch } from 'react-redux';
// import { addMajor, removeMajor, deleteStudent, setSelectedMajor , removeAllMajors } from './actions';
// import { useNavigation } from '@react-navigation/native';

// const Home = () => {
//   const [searchName, setSearchName] = useState('');
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   console.log(filteredStudents);
//   console.log('Selected Major:', selectedMajor); // Kiểm tra giá trị
//   console.log('Possible Majors:', possible);

//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const students = useSelector(state => state.students);
//   const { current, possible , selectedMajor } = useSelector(state => state.major);

//   const filteredStudents = students.filter(student => {
//     const matchesMajor = !selectedMajor || student.major === possible[selectedMajor];
//     return matchesMajor;
// });

//   const handleAddStudent = () => {
//     navigation.navigate('AddStudent', { majors: current });
//   };

//   const handleEditStudent = () => {
//     if (selectedStudent) {
//       navigation.navigate('EditStudent', { student: selectedStudent, majors: current });
//     } else {
//       Alert.alert("Thông báo", "Vui lòng chọn một sinh viên để chỉnh sửa");
//     }
//   };

//   const handleDeleteStudent = () => {
//     if (selectedStudent) {
//       Alert.alert(
//         "Xác nhận",
//         "Bạn có chắc chắn muốn xóa sinh viên này?",
//         [
//           { text: "Hủy", style: "cancel" },
//           {
//             text: "Xóa",
//             onPress: () => {
//               dispatch(deleteStudent(selectedStudent.Mssv));
//               setSelectedStudent(null);
//             },
//             style: "destructive"
//           }
//         ]
//       );
//     } else {
//       Alert.alert("Thông báo", "Vui lòng chọn một sinh viên để xóa");
//     }
//   };
   
//   const handleRemoveMajor = (index) => {
//     dispatch(removeMajor(index));
//   };

//   const handleMajorSelect = (value) => {
//     console.log('Selected Value:', value); // Kiểm tra giá trị được chọn

//     if (value === 'Tất cả') {
//         dispatch(removeAllMajors());
//     } else {
//         const major = possible[value]; // Lấy ngành học từ giá trị
//         console.log('Major:', major); // Kiểm tra ngành học
//         dispatch(setSelectedMajor(major));

//         if (!current.includes(major)) {
//             dispatch(addMajor(value));
//         }
//     }
// };

//   const renderStudentItem = ({ item }) => (
//     <TouchableOpacity
//       style={[styles.studentInfo, selectedStudent?.Mssv === item.Mssv && styles.selectedItem]}
//       onPress={() => setSelectedStudent(item)}
//     >
//       <Text style={styles.studentName}>Tên: {item.name}</Text>
//       <Text style={styles.studentDetails}>Địa chỉ: {item.address}</Text>
//       <Text style={styles.studentDetails}>MSSV: {item.Mssv}</Text>
//       <Text style={styles.studentDetails}>Ngành: {item.major}</Text>
//     </TouchableOpacity>
//   );

//   const renderMajorButton = (major, index) => (
//     <TouchableOpacity
//       style={[styles.majorButton, selectedMajor === major && styles.selectedMajorButton]}
//       onPress={() => handleMajorSelect(index)}
//     >
//       <Text style={styles.majorButtonText}>{major}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.majorButtonsContainer}>
//         {possible.map((major, index) => renderMajorButton(major, index))}
//         <TouchableOpacity
//           style={[styles.majorButton, selectedMajor === 'Tất cả' && styles.selectedMajorButton]}
//           onPress={() => handleMajorSelect('Tất cả')}
//         >
//           <Text style={styles.majorButtonText}>Tất cả</Text>
//         </TouchableOpacity>
//       </View>
//       <TextInput
//         style={styles.input}
//         placeholder="Tìm kiếm theo tên"
//         value={searchName}
//         onChangeText={setSearchName}
//       />
//       <RNPickerSelect
//       onValueChange={handleMajorSelect}
//       items={[
//           { label: 'Tất cả', value: 'Tất cả' },
//           ...possible.map((major, index) => ({ label: major, value: index }))
//       ]}
//     placeholder={{ label: "Chọn ngành học", value: null }}
//     value={selectedMajor === 'Tất cả' ? 'Tất cả' : possible.indexOf(selectedMajor) !== -1 ? possible.indexOf(selectedMajor) : null}
// />
//       <View style={styles.buttonContainer}>
//         <Button title="Thêm mới" onPress={handleAddStudent} />
//         <Button title="Chỉnh sửa" onPress={handleEditStudent} />
//         <Button title="Xóa" onPress={handleDeleteStudent} />
//       </View>
//       <Text style={styles.header}>Ngành Học đã chọn:</Text>
//       {current.length > 0 ? (
//         <Text style={styles.majorText}>
//           {'\n'}{current.join('\n')}
//         </Text>
//       ) : (
//         <Text style={styles.majorText}>Chưa chọn ngành học.</Text>
//       )}
//       <FlatList
//         data={current}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <View style={styles.majorItem}>
//             <Text style={styles.majorText}>{possible[item]}</Text>
//             <TouchableOpacity onPress={() => handleRemoveMajor(index)} style={styles.deleteButton}>
//               <Text style={styles.deleteButtonText}>Xóa</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//       <Text style={styles.header}>Danh sách sinh viên:</Text>
//       {filteredStudents.length > 0 ? (
//         <FlatList
//           data={filteredStudents}
//           renderItem={renderStudentItem}
//           keyExtractor={(item) => item.Mssv.toString()}
//         />
//       ) : (
//         <Text style={styles.noDataText}>Không có sinh viên nào phù hợp.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f0f5',
//   },
//   studentInfo: {
//     marginBottom: 0,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   selectedItem: {
//     backgroundColor: '#dcdcdc',
//   },
//   studentName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   studentDetails: {
//     fontSize: 14,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 10,
//   },
//   noDataText: {
//     textAlign: 'center',
//     color: 'red',
//     marginVertical: 20,
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 0,
//   },
//   majorItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   majorText: {
//     marginRight: 5,
//     fontSize: 16,
//   },
//   deleteButton: {
//     padding: 5,
//     backgroundColor: '#ff4d4d',
//     borderRadius: 5,
//   },
//   deleteButtonText: {
//     color: '#fff',
//   },
//   majorButtonsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 0,
//   },
//   majorButton: {
//     backgroundColor: '#e0e0e0',
//     padding: 10,
//     borderRadius: 5,
//     margin: 5,
//   },
//   selectedMajorButton: {
//     backgroundColor: '#a0c4ff',
//   },
// });

// export default Home;