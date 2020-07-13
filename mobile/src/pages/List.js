import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  AsyncStorage,
  StyleSheet,
  Alert,
} from 'react-native';
import socketio from 'socket.io-client';
import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.0.10:3333', {
        query: { user_id },
      });

      socket.on('booking_response', booking => {
        Alert.alert(
          booking.approved ? 'Yay!' : 'Aww :(',
          `Your booking request for ${booking.spot.company} on ${
            booking.date
          } was ${
            booking.approved
              ? 'approved!'
              : 'rejected. Maybe we should try another one?'
          }`,
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(techs =>
      setTechs(techs.split(',').map(t => t.trim())),
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} techName={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10,
  },
});
