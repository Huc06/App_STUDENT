
// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import store from './screens/store'; // Adjust the path as necessary
import Home from './screens/Home';
import EditStudent from './screens/EditStudent';
import AddStudent from './screens/Addstudent';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LogoutScreen from './screens/LogoutScreen';
import ScoreboardScreen from './screens/ScoreboardScreen';
import Attendance from './screens/Attendance';
import WelcomeScreen from './screens/Welcome';
import CustomDrawerContent from './screens/CustomDrawerContent';
import ReadFileScreen from './screens/ReadfileScreen';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="EditStudent" component={EditStudent} options={{ headerTitle: 'Chỉnh Sửa Sinh Viên' }} />
      <Stack.Screen name="AddStudent" component={AddStudent} options={{ headerTitle: 'Thêm Sinh Viên' }} />
      <Stack.Screen name="Attendance" component={Attendance} options={{ headerTitle: 'Điểm Danh' }} />
      <Stack.Screen name="ScoreboardScreen" component={ScoreboardScreen} options={{ headerTitle: 'Bảng Điểm' }} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} options={{ headerTitle: 'Đăng Xuất' }} />
      <Stack.Screen name="ReadFileScreen" component={ReadFileScreen} options={{ headerTitle: 'Đọc File'}} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={StackNav} />
          <Drawer.Screen name="AddStudent" component={AddStudent} />
          <Drawer.Screen name="Bảng Điểm" component={ScoreboardScreen} options={{ headerTitle: 'Bảng Điểm' }} />
          <Drawer.Screen name="Điểm Danh" component={Attendance} options={{ headerTitle: 'Điểm Danh' }} />
          <Drawer.Screen name="Xem File" component={ReadFileScreen} options={{ headerTitle: 'Xem File' }} /> 
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
