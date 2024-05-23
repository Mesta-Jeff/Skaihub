import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import DashboardData from '../model/DashboardData';
import { ScrollView } from 'react-native-gesture-handler';

export const SLIDER_WIDTH = Dimensions.get('window').width + 50;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.90);

export default function DashboardNoticeDetails({ route, navigation }) {
  const { id } = route.params;

  // Find the item in the DashboardData based on the id
  const item = DashboardData.find((data) => data.id === id);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No data found for the given ID.</Text>
      </SafeAreaView>
    );
  }

  const { title, image, description, content, message } = item;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
  },
  cardImage: {
    width: ITEM_WIDTH,
    height: 450,
    resizeMode: 'contain',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 10,
    color: Colors.defaultColorDeep,
    textAlign: 'center',
    textAlign: 'left'
  },
  cardDescription: {
    fontWeight: '400',
    color: Colors.defaultGrey,
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginVertical: 15,
    fontSize: 14
  },

  cardSubheading: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.defaultLightDark,
    marginBottom: -15
  }


});