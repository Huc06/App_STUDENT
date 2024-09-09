
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';

// const AddStudent = ({ navigation , route }) => {  // Đảm bảo sử dụng đúng destructuring để lấy navigation
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [major, setMajor] = useState(route.params.selectedMajor || 'Chọn ngành học');
//   const [Mssv, setMssv] = useState('');

//   const handleSubmit = () => {
//     const newStudent = { name, address, major, Mssv };
//     navigation.navigate('Home', { newStudent });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Thêm sinh viên</Text>
//       <RNPickerSelect
//         onValueChange={(value) => setMajor(value)}
//         items={[
//           { label: 'Công nghệ thông tin', value: 'cntt' },
//           { label: 'Quản trị kinh doanh', value: 'qtkd' },
//           { label: 'Sửa chữa ôtô', value: 'sco' },
//           { label: 'Khoa học vật liệu', value: 'khvl' },
//           { label: 'Thiết kế thời trang', value: 'tktt' },
//         ]}
//         style={pickerSelectStyles}
//         placeholder={{ label: "Chọn ngành học", value: null }}
//         value={major} // Đặt giá trị mặc định cho RNPickerSelect
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Nhập tên sinh viên"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mã số sinh viên"
//         value={Mssv}
//         onChangeText={setMssv}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập địa chỉ"
//         value={address}
//         onChangeText={setAddress}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#f0f0f5',
//   },
//   header: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//     backgroundColor: '#fff',
//     marginBottom: 20,
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//     backgroundColor: '#fff',
//     marginBottom: 20,
//   },
// });

// export default AddStudent;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as FileSystem from 'expo-file-system';

const filePath = `${FileSystem.documentDirectory}students.txt`; // Path to the file

const AddStudent = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [major, setMajor] = useState(route.params.selectedMajor || null);
  const [Mssv, setMssv] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    readStudents();
  }, []);

  const readStudents = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        const fileContent = await FileSystem.readAsStringAsync(filePath);
        const parsedStudents = JSON.parse(fileContent) || [];
        setStudents(parsedStudents);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to read students file.');
    }
  };

  const handleSubmit = async () => {
    const newStudent = { name, address, major, Mssv };
    const updatedStudents = [...students, newStudent];

    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedStudents));
      Alert.alert('Success', 'Student added successfully!');
      navigation.navigate('Home', { newStudent });
    } catch (error) {
      Alert.alert('Error', 'Failed to save student data.');
    }
  };

  const deleteStudent = async (Mssv) => {
    const updatedStudents = students.filter(student => student.Mssv !== Mssv);
    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      Alert.alert('Success', 'Student deleted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete student data.');
    }
  };

  const updateStudent = async (Mssv, updatedInfo) => {
    const updatedStudents = students.map(student =>
      student.Mssv === Mssv ? { ...student, ...updatedInfo } : student
    );
    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
      Alert.alert('Success', 'Student updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update student data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thêm sinh viên</Text>
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
        placeholder={{ label: "Chọn ngành học", value: null }}
        value={major}
      />

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
      <Button title="Submit" onPress={handleSubmit} />
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

export default AddStudent;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { addStudent } from './actions';
// import { useNavigation } from '@react-navigation/native';

// const Student = () => {
//   const { current } = useSelector(state => state.major);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
  
//   const [studentName, setStudentName] = useState('');
//   const [Mssv, setMssv] = useState('');
//   const [address, setAddress] = useState('');

//   const handleSubmit = () => {
//     if (!studentName.trim() || !Mssv.trim() || !address.trim()) {
//       Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
//       return;
//     }

//     // if (!/^\d{8}$/.test(Mssv)) {
//     //   Alert.alert('Lỗi', 'Mã số sinh viên (MSSV) phải có 8 chữ số!');
//     //   return;
//     // }

//     Alert.alert(
//       'Xác nhận',
//       `Bạn có chắc chắn muốn tạo thông tin:\nTên: ${studentName}\nMSSV: ${Mssv}\nĐịa chỉ: ${address}\nNgành học: ${current.join(', ') || 'Chưa chọn'}`,
//       [
//         { text: 'Hủy', style: 'cancel' },
//         {
//           text: 'Gửi',
//           onPress: () => {
//             const newStudent = { name: studentName, Mssv, address, major: current };
//             dispatch(addStudent(newStudent));
//             Alert.alert('Thành công', 'Thông tin sinh viên đã được tạo thành công!');
            
//           // Clear input fields
//             setStudentName('');
//             setMssv('');
//             setAddress('');
//             navigation.navigate('Home');
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Thông tin về Sinh viên</Text>
      
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
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập địa chỉ"
//         value={address}
//         onChangeText={setAddress}
//       />
      
//       <Text style={styles.majorText}>
//         Ngành Học: {current.length > 0 ? current.join('\n') : 'Chưa chọn ngành học.'}
//       </Text>

//       <Button title="Gửi thông tin" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
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
//     width: '100%',
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

// export default Student;