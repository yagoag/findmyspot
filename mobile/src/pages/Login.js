import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  AsyncStorage,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(
      user => user && navigation.navigate('List'),
    );
  }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email,
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      style={styles.container}
    >
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>YOUR E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder="Your e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>TECHNOLOGIES *</Text>
        <TextInput
          style={styles.input}
          placeholder="Node.js, React.js"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>FindMySpot!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Vertical align
    alignItems: 'center', // Horizontal align
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginLeft: 20,
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
});
