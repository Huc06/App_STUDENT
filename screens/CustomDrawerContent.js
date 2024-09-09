// import React, { useState } from 'react';
// import { View, Image, ImageBackground } from 'react-native';
// import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CustomDrawerContent = (props) => {
//     const { navigation } = props;

//   const handleLogout = async () => {
//     // Thực hiện đăng xuất, xóa thông tin lưu trữ, v.v.
//     await AsyncStorage.removeItem('userEmail');
//     await AsyncStorage.removeItem('userPassword');

//     // Điều hướng về màn hình đăng nhập
//     props.navigation.navigate('Login');
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <DrawerContentScrollView {...props} contentContainerStyle={{ background: '#dde3fe' }}>
//         <ImageBackground
//           source={{
//             uri: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/bear-panda-3/sticker_4.gif?963d422d0f63bcbce679166b341b736d',
//           }}
//           style={{ width: '100%', height: 200 }}
//         >
//           <View style={{ padding: 20, alignItems: 'center' }}>
//             <Image
//               source={{
//                 uri: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/bear-panda-3/sticker_4.gif?963d422d0f63bcbce679166b341b736d',
//               }}
//               style={{ width: 100, height: 100, borderRadius: 50 }}
//             />
//           </View>
//         </ImageBackground>

//         <DrawerItem
//           label="Trang Chủ"
//           icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
//           onPress={() => navigation.navigate('Home')}
//         />
//         <DrawerItem
//           label="Thêm Sinh Viên"
//           icon={({ color, size }) => <Icon name="person-add-outline" color={color} size={size} />}
//           onPress={() => navigation.navigate('AddStudent')}
//         />
//         <DrawerItem
//           label="Bảng Điểm"
//           icon={({ color, size }) => <Icon name="clipboard-outline" color={color} size={size} />}
//           onPress={() => props.navigation.navigate('ScoreboardScreen')}
//         />
//         <DrawerItem
//           label="Điểm Danh"
//           icon={({ color, size }) => <Icon name="checkmark-done-outline" color={color} size={size} />}
//           onPress={() => props.navigation.navigate('Attendance')}
//         />
//         <DrawerItem
//           label="Đăng Xuất"
//           icon={({ color, size }) => <Icon name="log-out-outline" color={color} size={size} />}
//           onPress={handleLogout}
//         />
//       </DrawerContentScrollView>
//     </View>
//   );
// };

// export default CustomDrawerContent;

import React from 'react';
import { View, Image, ImageBackground, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  
  const handleLogout = async () => {
    const confirmLogout = await new Promise((resolve) => {
      Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn đăng xuất?",
        [
          { text: "Hủy", onPress: () => resolve(false), style: "cancel" },
          { text: "Đăng Xuất", onPress: () => resolve(true), style: "destructive" },
        ]
      );
    });

    if (confirmLogout) {
      try {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userPassword');
        Alert.alert('Đăng xuất thành công!');
        props.navigation.navigate('Login'); // Chuyển hướng về màn hình đăng nhập
      } catch (error) {
        Alert.alert('Đã xảy ra lỗi khi đăng xuất.');
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#dde3fe' }}>
        <ImageBackground
          source={{
            uri: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/bear-panda-3/sticker_4.gif?963d422d0f63bcbce679166b341b736d',
          }}
          style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={{
              uri: 'https://s3.getstickerpack.com/storage/uploads/sticker-pack/bear-panda-3/sticker_4.gif?963d422d0f63bcbce679166b341b736d',
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </ImageBackground>

        <DrawerItem
          label="Trang Chủ"
          icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
          onPress={() => navigation.navigate('Home')}
        />
        <DrawerItem
          label="Thêm Sinh Viên"
          icon={({ color, size }) => <Icon name="person-add-outline" color={color} size={size} />}
          onPress={() => navigation.navigate('AddStudent' , 'setSelectedMajor')}
        />
        <DrawerItem
          label="Bảng Điểm"
          icon={({ color, size }) => <Icon name="clipboard-outline" color={color} size={size} />}
          onPress={() => props.navigation.navigate('ScoreboardScreen')}
        />
        <DrawerItem
          label="Điểm Danh"
          icon={({ color, size }) => <Icon name="checkmark-done-outline" color={color} size={size} />}
          onPress={() => props.navigation.navigate('Attendance')}
        />
        <DrawerItem
          label="Xem File"
          icon={({ color, size }) => <Icon name="document-text-outline" color={color} size={size} />}
          onPress={() => navigation.navigate('ReadFileScreen')}
          />
        <DrawerItem
          label="Đăng Xuất"
          icon={({ color, size }) => <Icon name="log-out-outline" color={color} size={size} />}
          onPress={handleLogout}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;
