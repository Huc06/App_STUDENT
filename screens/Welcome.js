// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Animated } from 'react-native';

// const WelcomeScreen = ({ navigation }) => {
//   const opacity = new Animated.Value(0);

//   useEffect(() => {
//     // Tạo hiệu ứng mờ dần
//     Animated.timing(opacity, {
//       toValue: 1,
//       duration: 2000,
//       useNativeDriver: true,
//     }).start();

//     // Chuyển đến màn hình Login sau 3 giây
//     const timer = setTimeout(() => {
//       navigation.navigate('Login');
//     }, 3000);

//     return () => clearTimeout(timer); // Dọn dẹp bộ đếm thời gian
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Animated.Text style={[styles.text, { opacity }]}>
//         Chào mừng đến với ứng dụng của chúng tôi!
//       </Animated.Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4A90E2',
//   },
//   text: {
//     fontSize: 24,
//     color: '#fff',
//     textAlign: 'center',
//   },
// });

// export default WelcomeScreen;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Login screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image source={require('../assets/img/th.png')} style={styles.logo} />
        <Text style={styles.title}>Student Management</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;