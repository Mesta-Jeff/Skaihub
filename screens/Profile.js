

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>This is the Home screen!</Text>

      <FontAwesome style={styles.icos} size={28} name="star" color='red' />

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icos: {
    marginTop: 20,
  }
  

});