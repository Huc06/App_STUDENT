
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Email không hợp lệ');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    const path = `${FileSystem.documentDirectory}users.txt`;

    try {
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (!fileInfo.exists) {
        Alert.alert('Chưa có người dùng nào đăng ký.');
        return;
      }

      const fileContent = await FileSystem.readAsStringAsync(path);
      const users = fileContent.split('\n').filter(Boolean);

      const userFound = users.some(user => {
        const [userEmail, userPassword] = user.split(':');
        return userEmail === email && userPassword === password;
      });

      if (userFound) {
        Alert.alert('Đăng nhập thành công!');

        if (rememberMe) {
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPassword', password); // Lưu mật khẩu
        } else {
          setPassword(''); // Xóa mật khẩu trong state
          await AsyncStorage.removeItem('userPassword'); // Xóa mật khẩu từ AsyncStorage
          await AsyncStorage.setItem('userEmail', email); // Lưu email
        }

        navigation.navigate('Home');
      } else {
        Alert.alert('Đăng nhập thất bại! Tên người dùng hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      Alert.alert('Đã xảy ra lỗi khi kiểm tra thông tin.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userPassword');
    Alert.alert('Đăng xuất thành công!');
    navigation.navigate('Login');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  useEffect(() => {
    const loadCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      const savedPassword = await AsyncStorage.getItem('userPassword');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
      if (savedPassword) {
        setPassword(savedPassword);
      }
    };
    loadCredentials();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.rememberMeContainer}>
        <Switch value={rememberMe} onValueChange={setRememberMe} />
        <Text style={styles.rememberMeText}>Nhớ mật khẩu</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Chưa có tài khoản? Đăng ký</Text>
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rememberMeText: {
    marginLeft: 8,
  },
});

export default LoginScreen;