import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const EditStudent = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [major, setMajor] = useState('');
  const [Mssv, setMssv] = useState('');

  useEffect(() => {
    const { student } = route.params;
    setName(student.name);
    setAddress(student.address);
    setMajor(student.major);
    setMssv(student.Mssv);
  }, []);

  const handleSubmit = () => {
    const updatedStudent = { name, address, major, Mssv };
    navigation.navigate('Home', { updatedStudent , edit: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chỉnh sửa sinh viên</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nhập tên sinh viên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mã số sinh viên"
        value={Mssv}
        onChangeText={setMssv}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập địa chỉ"
        value={address}
        onChangeText={setAddress}
      />
      
      <RNPickerSelect
        onValueChange={(value) => setMajor(value)}
        items={[
          { label: 'Công nghệ thông tin', value: 'cntt' },
          { label: 'Quản trị kinh doanh', value: 'qtkd' },
          { label: 'Sửa chữa ôtô', value: 'sco' },
          { label: 'Khoa học vật liệu', value: 'khvl' },
          { label: 'Thiết kế thời trang', value: 'tktt' },
        ]}
        style={pickerSelectStyles}
        value={major}
        placeholder={{ label: "Chọn ngành học", value: null }}
      />
      
      <Button title="Cập nhật" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
});

export default EditStudent;

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { useDispatch , useSelector } from 'react-redux';
// import { updateStudent } from './actions'; // Make sure to implement this action

// const EditStudent = ({ route, navigation }) => {
//   const { student } = route.params; // Get the selected student from the route params
//   const dispatch = useDispatch();

//   const [studentName, setStudentName] = useState(student.name);
//   const [Mssv, setMssv] = useState(student.Mssv);
//   const [address, setAddress] = useState(student.address);
//   const { current } = useSelector(state => state.major);

//   const handleSubmit = () => {
//     if (!studentName.trim() || !Mssv.trim() || !address.trim()) {
//       Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
//       return;
//     }

//     const updatedStudent = { name: studentName, Mssv, address, major };
//     dispatch(updateStudent(updatedStudent)); // Dispatch the update action
//     Alert.alert('Thành công', 'Thông tin sinh viên đã được cập nhật!');
//     navigation.goBack(); // Navigate back to the home screen
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Chỉnh sửa thông tin sinh viên</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập tên sinh viên"
//         value={studentName}
//         onChangeText={setStudentName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập mã số sinh viên (MSSV)"
//         value={Mssv}
//         onChangeText={setMssv}
//         editable={false} // MSSV should not be editable
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập địa chỉ"
//         value={address}
//         onChangeText={setAddress}
//       />
//       <Text style={styles.majorText}>
//         Ngành Học: {current.length > 0 ? current.join(' | ') : 'Chưa chọn ngành học.'}
//       </Text>
      
//       <Button title="Cập nhật thông tin" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f0f5',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   majorText: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });

// export default EditStudent;

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert , FlatList ,TouchableOpacity} from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addMajor, removeMajor, deleteStudent , updateStudent} from './actions';
// import RNPickerSelect from 'react-native-picker-select';

// const EditStudent = ({ route, navigation }) => {
//   const { student } = route.params; // Get the selected student from the route params
//   const dispatch = useDispatch();

//   const [studentName, setStudentName] = useState(student.name);
//   const [Mssv, setMssv] = useState(student.Mssv);
//   const [address, setAddress] = useState(student.address);
//   const [major, setMajor] = useState(student.major[0] || ''); // Initialize major from student
//   const { current , possible } = useSelector(state => state.major);

//   const handleSubmit = () => {
//     if (!studentName.trim() || !Mssv.trim() || !address.trim()) {
//       Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
//       return;
//     }

//     const updatedStudent = { name: studentName, Mssv, address, major: current }; // Use the defined major
//     dispatch(updateStudent(updatedStudent)); // Dispatch the update action
//     Alert.alert('Thành công', 'Thông tin sinh viên đã được cập nhật!');
//     navigation.goBack(); // Navigate back to the home screen
//   };

//   const handleAddMajor = (index) => {
//     dispatch(addMajor(index));
//   };

//   const handleRemoveMajor = (index) => {
//     dispatch(removeMajor(index));
//   };


//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Chỉnh sửa thông tin sinh viên</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập tên sinh viên"
//         value={studentName}
//         onChangeText={setStudentName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập mã số sinh viên (MSSV)"
//         value={Mssv}
//         onChangeText={setMssv}
//         editable={false} // MSSV should not be editable
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập địa chỉ"
//         value={address}
//         onChangeText={setAddress}
//       />
//       {/* <Text style={styles.majorText}>
//         Ngành Học: {current.length > 0 ? current.join('  ') : 'Chưa chọn ngành học.'}
//       </Text> */}
//       <RNPickerSelect
//               onValueChange={(value) => handleAddMajor(value)}
//               items={possible.map((major, index) => ({ label: major, value: index }))}
//               placeholder={{ label: "Chọn ngành học", value: null }}
//               value={current.length > 0 ? current[current.length - 1] : null} // Giá trị mặc định
//             />
//              <Text style={styles.header}>Ngành Học đã chọn:</Text>
//                    {current.length > 0 ? (
//                   <Text style={styles.majorText}>
//                     {'\n'}{current.join('\n')}
//                   </Text>
//                    ) : (
//                   <Text style={styles.majorText}>Chưa chọn ngành học.</Text>
//                   )}
//                   <FlatList
//                     data={current}
//                     keyExtractor={(item, index) => index.toString()}
//                     renderItem={({ item, index }) => (
//                       <View style={styles.majorItem}>
//                         <Text style={styles.majorText}>{possible[item]}</Text>
//                         <TouchableOpacity onPress={() => handleRemoveMajor(index)} style={styles.deleteButton}>
//                           <Text style={styles.deleteButtonText}>Xóa</Text>
//                         </TouchableOpacity>
//                       </View>
//                     )}
//                   />
//       <Button title="Cập nhật thông tin" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f0f0f5',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 15,
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
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
//     marginRight: 10,
//     fontSize: 18, // Đảm bảo kích thước chữ giống nhau
//   },
//   deleteButton: {
//     padding: 5,
//     backgroundColor: '#ff4d4d', // Màu nền cho nút
//     borderRadius: 5, // Bo góc
//   },
//   deleteButtonText: {
//     color: '#fff', // Màu chữ
//   },
// });

// export default EditStudent;