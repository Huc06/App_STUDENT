// ScoreboardScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ScoreboardScreen = () => {
  // Dữ liệu bảng điểm mẫu
  const [scores, setScores] = useState([
    { id: '1', name: 'Nguyen Van A', subject: 'Toán', score: 9 },
    { id: '2', name: 'Tran Thi B', subject: 'Văn', score: 8 },
    { id: '3', name: 'Le Van C', subject: 'Anh', score: 7 },
    // Thêm các dữ liệu mẫu khác
  ]);

  // Hàm render từng dòng trong bảng điểm
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bảng điểm</Text>
      <FlatList
        data={scores}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
  },
  subject: {
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScoreboardScreen;
