
// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import * as FileSystem from 'expo-file-system';

// const ReadFileScreen = () => {
//   const [fileContent1, setFileContent1] = useState('');
//   const [fileContent2, setFileContent2] = useState('');
//   const [students, setStudents] = useState([]);
//   const [users, setUsers] = useState([]);

//   const readFiles = async () => {
//     const path1 = `${FileSystem.documentDirectory}students.txt`; // Đảm bảo đúng tên tệp
//     const path2 = `${FileSystem.documentDirectory}users.txt`;    // Đảm bảo đúng tên tệp

//     try {
//       // Đọc file 1
//       const fileInfo1 = await FileSystem.getInfoAsync(path1);
//       if (!fileInfo1.exists) {
//         Alert.alert('File students.txt không tồn tại!');
//       } else {
//         const content1 = await FileSystem.readAsStringAsync(path1);
//         setFileContent1(content1);
//         readStudents(content1); // Gọi hàm để đọc danh sách sinh viên
//       }

//       // Đọc file 2
//       const fileInfo2 = await FileSystem.getInfoAsync(path2);
//       if (!fileInfo2.exists) {
//         Alert.alert('File users.txt không tồn tại!');
//       } else {
//         const content2 = await FileSystem.readAsStringAsync(path2);
//         setFileContent2(content2);
//         // readUsers(content2); // Gọi hàm để đọc danh sách người dùng
//       }
//     } catch (error) {
//       Alert.alert('Đã xảy ra lỗi khi đọc file.');
//     }
//   };

//   const readStudents = (content) => {
//     try {
//       const parsedStudents = JSON.parse(content) || [];
//       setStudents(parsedStudents);
//     } catch (error) {
//       Alert.alert('Đã xảy ra lỗi khi phân tích dữ liệu sinh viên.');
//     }
//   };

//   const readUsers = (content) => {
//     try {
//       const parsedUsers = JSON.parse(content) || [];
//       setUsers(parsedUsers);
//     } catch (error) {
//       Alert.alert('Đã xảy ra lỗi khi phân tích dữ liệu người dùng.');
//     }
//   };

//   useEffect(() => {
//     readFiles(); // Gọi hàm để đọc cả hai file
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Nội Dung File students.txt:</Text>
//       <Text style={styles.content}>{fileContent1 || 'Chưa có nội dung.'}</Text>

//       <Text style={styles.title}>Nội Dung File users.txt:</Text>
//       <Text style={styles.content}>{fileContent2 || 'Chưa có nội dung.'}</Text>

//       <Button title="Tải lại nội dung" onPress={readFiles} />

//       <Text style={styles.subtitle}>Danh sách sinh viên:</Text>
//       {students.length > 0 ? (
//         students.map((student, index) => (
//           <View key={index} style={styles.studentContainer}>
//             <Text>{`Tên: ${student.name}`}</Text>
//             <Text>{`MSSV: ${student.Mssv}`}</Text>
//             <Text>{`Địa chỉ: ${student.address}`}</Text>
//             <Text>{`Chuyên ngành: ${student.major}`}</Text>
//           </View>
//         ))
//       ) : (
//         <Text>Không có sinh viên nào.</Text>
//       )}

//       <Text style={styles.subtitle}>Danh sách người dùng:</Text>
//       {users.length > 0 ? (
//         users.map((user, index) => (
//           <View key={index} style={styles.studentContainer}>
//             <Text>{`Email: ${user.email}`}</Text>
//             <Text>{`Mật khẩu: ${user.password}`}</Text>
//           </View>
//         ))
//       ) : (
//         <Text>Không có người dùng nào.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f2f2f2',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   content: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   studentContainer: {
//     marginBottom: 10,
//   },
// });

// export default ReadFileScreen;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import * as FileSystem from 'expo-file-system';

// const ReadFileScreen = () => {
//   const [fileContent1, setFileContent1] = useState('');
//   const [fileContent2, setFileContent2] = useState('');
//   const [students, setStudents] = useState([]);
//   const [users, setUsers] = useState([]);

//   // Function to read both files
//   const readFiles = async () => {
//     const path1 = `${FileSystem.documentDirectory}students.txt`;
//     const path2 = `${FileSystem.documentDirectory}users.txt`;

//     try {
//       await readFile(path1, setFileContent1, readStudents);
//       await readFile(path2, setFileContent2, readUsers);
//     } catch (error) {
//       Alert.alert('Đã xảy ra lỗi khi đọc file.');
//     }
//   };

//   // Helper function to read a file
//   const readFile = async (path, setContent, parseFunction) => {
//     const fileInfo = await FileSystem.getInfoAsync(path);
//     if (!fileInfo.exists) {
//       Alert.alert(`File ${path.split('/').pop()} không tồn tại!`);
//       return;
//     }

//     const content = await FileSystem.readAsStringAsync(path);
//     setContent(content);
//     parseFunction(content);
//   };

//   // Function to parse student data
//   const readStudents = (content) => {
//     try {
//       const parsedStudents = JSON.parse(content) || [];
//       setStudents(parsedStudents);
//     } catch (error) {
//       Alert.alert('Đã xảy ra lỗi khi phân tích dữ liệu sinh viên.');
//     }
//   };

//   // Function to parse user data
//   const readUsers = (content) => {
//     try {
//       const parsedUsers = JSON.parse(content) || [];
//       setUsers(parsedUsers);
//     } catch (error) {
//       Alert.alert('Đã xảy ra lỗi khi phân tích dữ liệu người dùng.');
//     }
//   };

//   useEffect(() => {
//     readFiles(); // Load files on component mount
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Nội Dung File students.txt:</Text>
//       <Text style={styles.content}>{fileContent1 || 'Chưa có nội dung.'}</Text>

//       <Text style={styles.title}>Nội Dung File users.txt:</Text>
//       <Text style={styles.content}>{fileContent2 || 'Chưa có nội dung.'}</Text>

//       <Button title="Tải lại nội dung" onPress={readFiles} />

//       <Text style={styles.subtitle}>Danh sách sinh viên:</Text>
//       {students.length > 0 ? (
//         students.map((student, index) => (
//           <View key={index} style={styles.studentContainer}>
//             <Text>{`Tên: ${student.name}`}</Text>
//             <Text>{`MSSV: ${student.Mssv}`}</Text>
//             <Text>{`Địa chỉ: ${student.address}`}</Text>
//             <Text>{`Chuyên ngành: ${student.major}`}</Text>
//           </View>
//         ))
//       ) : (
//         <Text>Không có sinh viên nào.</Text>
//       )}

//       <Text style={styles.subtitle}>Danh sách người dùng:</Text>
//       {users.length > 0 ? (
//         users.map((user, index) => (
//           <View key={index} style={styles.studentContainer}>
//             <Text>{`Email: ${user.email}`}</Text>
//             <Text>{`Mật khẩu: ${user.password}`}</Text>
//           </View>
//         ))
//       ) : (
//         <Text>Không có người dùng nào.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f2f2f2',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   content: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   studentContainer: {
//     marginBottom: 10,
//   },
// });

// export default ReadFileScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ReadFileScreen = () => {
  const [fileContent1, setFileContent1] = useState('');
  const [fileContent2, setFileContent2] = useState('');
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);

  // Function to read both files
  const readFiles = async () => {
    const path1 = `${FileSystem.documentDirectory}students.txt`;
    const path2 = `${FileSystem.documentDirectory}users.txt`;

    try {
      await readFile(path1, setFileContent1, readStudents);
      await readFile(path2, setFileContent2, readUsers);
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi khi đọc file.');
    }
  };

  // Helper function to read a file
  const readFile = async (path, setContent, parseFunction) => {
    const fileInfo = await FileSystem.getInfoAsync(path);
    if (!fileInfo.exists) {
      Alert.alert(`File ${path.split('/').pop()} không tồn tại!`);
      return;
    }

    const content = await FileSystem.readAsStringAsync(path);
    setContent(content);
    parseFunction(content);
  };

  // Function to parse student data
  const readStudents = (content) => {
    try {
      const parsedStudents = JSON.parse(content) || [];
      setStudents(parsedStudents);
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi khi phân tích dữ liệu sinh viên.');
    }
  };

  // Function to parse user data
  const readUsers = (content) => {
    try {
      const parsedUsers = JSON.parse(content) || [];
      setUsers(parsedUsers);
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi khi phân tích dữ liệu người dùng.');
    }
  };

  // Function to reset student list
  const resetStudentList = () => {
    setStudents([]);
    setFileContent1(''); // Optionally clear the file content display
    Alert.alert('Danh sách sinh viên đã được reset.');
  };

  useEffect(() => {
    readFiles(); // Load files on component mount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nội Dung File students.txt:</Text>
      <Text style={styles.content}>{fileContent1 || 'Chưa có nội dung.'}</Text>

      <Text style={styles.title}>Nội Dung File users.txt:</Text>
      <Text style={styles.content}>{fileContent2 || 'Chưa có nội dung.'}</Text>

      <Button title="Tải lại nội dung" onPress={readFiles} />
      <Button title="Reset danh sách sinh viên" onPress={resetStudentList} />

      <Text style={styles.subtitle}>Danh sách sinh viên:</Text>
      {students.length > 0 ? (
        students.map((student, index) => (
          <View key={index} style={styles.studentContainer}>
            <Text>{`Tên: ${student.name}`}</Text>
            <Text>{`MSSV: ${student.Mssv}`}</Text>
            <Text>{`Địa chỉ: ${student.address}`}</Text>
            <Text>{`Chuyên ngành: ${student.major}`}</Text>
          </View>
        ))
      ) : (
        <Text>Không có sinh viên nào.</Text>
      )}

      <Text style={styles.subtitle}>Danh sách người dùng:</Text>
      {users.length > 0 ? (
        users.map((user, index) => (
          <View key={index} style={styles.studentContainer}>
            <Text>{`Email: ${user.email}`}</Text>
            <Text>{`Mật khẩu: ${user.password}`}</Text>
          </View>
        ))
      ) : (
        <Text>Không có người dùng nào.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  studentContainer: {
    marginBottom: 10,
  },
});

export default ReadFileScreen;