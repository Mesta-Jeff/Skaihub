import React from 'react';
import { StyleSheet, Text, View,} from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function DashboardNoticeDetails({ route,navigation }) {

    const { title, id } = route.params;

  return (
    <View style={styles.container}>
      <Text>This is the Dashboard Notifcation Detailed Page: {id}</Text>

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


});