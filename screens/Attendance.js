// screens/AttendanceScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const students = [
  { id: '1', name: 'Nguyễn Văn A', isPresent: false },
  { id: '2', name: 'Trần Thị B', isPresent: false },
  { id: '3', name: 'Lê Văn C', isPresent: false },
  // Thêm danh sách sinh viên tại đây
];

const AttendanceScreen = () => {
  const [attendanceList, setAttendanceList] = useState(students);

  const toggleAttendance = (id) => {
    const updatedList = attendanceList.map(student =>
      student.id === id ? { ...student, isPresent: !student.isPresent } : student
    );
    setAttendanceList(updatedList);
  };

  const handleSubmitAttendance = () => {
    Alert.alert('Điểm danh hoàn tất!', JSON.stringify(attendanceList, null, 2));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.studentItem, item.isPresent && styles.present]}
      onPress={() => toggleAttendance(item.id)}
    >
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentStatus}>{item.isPresent ? 'Có mặt' : 'Vắng mặt'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Điểm Danh</Text>
      <FlatList
        data={attendanceList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmitAttendance}>
        <Text style={styles.buttonText}>Hoàn Tất Điểm Danh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  studentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  present: {
    backgroundColor: '#d4edda',
  },
  studentName: {
    fontSize: 18,
  },
  studentStatus: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AttendanceScreen;
