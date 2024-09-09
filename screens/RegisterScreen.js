// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import * as FileSystem from 'expo-file-system';

// const fileUri = FileSystem.documentDirectory + 'users.txt';

// const RegisterScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleRegister = async () => {
//     if (!email || !password || password !== confirmPassword) {
//       Alert.alert('Vui lòng nhập thông tin hợp lệ.');
//       return;
//     }

//     try {
//       const fileContent = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
//       const users = fileContent ? JSON.parse(fileContent) : [];

//       if (users.some(user => user.email === email)) {
//         Alert.alert('Email đã được sử dụng. Vui lòng chọn email khác.');
//         return;
//       }

//       users.push({ email, password });
//       await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(users), { encoding: FileSystem.EncodingType.UTF8 });
//       Alert.alert('Đăng ký thành công!');
//       navigation.navigate('Login');
//     } catch (error) {
//       Alert.alert('Đã xảy ra lỗi khi lưu thông tin.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Đăng Ký</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mật khẩu"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Xác nhận mật khẩu"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Đăng Ký</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Đã có tài khoản? Đăng Nhập</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f2f2f2',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//   },
//   input: {
//     width: '80%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     marginVertical: 12,
//   },
//   button: {
//     width: '80%',
//     height: 50,
//     backgroundColor: '#007aff',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   link: {
//     color: '#007aff',
//     marginTop: 10,
//   },
// });

// export default RegisterScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Vui lòng nhập email hợp lệ.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu xác nhận không khớp.');
      return;
    }

    const userData = `${email}:${password}\n`;
    const path = `${FileSystem.documentDirectory}users.txt`;

    try {
      // Kiểm tra nếu file đã tồn tại
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (fileInfo.exists) {
        const fileContent = await FileSystem.readAsStringAsync(path);
        if (fileContent.includes(email)) {
          Alert.alert('Email đã được sử dụng. Vui lòng chọn email khác.');
          return;
        }
      }

      await FileSystem.writeAsStringAsync(path, userData, { encoding: FileSystem.EncodingType.UTF8, flush: true });
      Alert.alert('Đăng ký thành công!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi khi lưu thông tin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Quay lại Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007aff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;