import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import api from '../services/api';

export default function Book({ navigation }) {
  const spotId = navigation.getParam('id');
  const [date, setDate] = useState('');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(
      `/spots/${spotId}/bookings`,
      { date },
      { headers: { user_id } },
    );

    Alert.alert(
      'Booking request sent',
      'You will receive a notification when the status of your booking is updated',
    );

    navigation.navigate('List');
  }

  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATE *</Text>
      <TextInput
        style={styles.input}
        placeholder="Date to book this spot for"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book Spot</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginLeft: 20,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 22,
  },
  button: {
    backgroundColor: '#0c4688',
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
});
