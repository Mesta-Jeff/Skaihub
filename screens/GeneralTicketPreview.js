

import React from 'react';
import { StyleSheet, Text, View,Image, Dimensions} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);


export default function GeneralTicketPreview({ navigation, route }) {

    const { title, id, kind } = route.params;



  return (
    <SafeAreaProvider style={styles.container}>
      <Text>This is the Notification Page {kind}</Text>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});