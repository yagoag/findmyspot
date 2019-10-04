import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import api from '../services/api';

function SpotList({ techName, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const res = await api.get('/spots', {
        params: { tech: techName },
      });

      setSpots(res.data);
    }

    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Companies using <Text style={styles.techName}>{techName}</Text>
      </Text>
      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image
              style={styles.thumbnail}
              source={{ uri: item.thumbnail_url }}
            />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>
              {item.price ? `$${item.price.toFixed(2)}/day` : 'FREE'}
            </Text>
            <TouchableOpacity
              onPress={() => handleNavigate(item._id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  techName: {
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#0c4688',
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default withNavigation(SpotList);
