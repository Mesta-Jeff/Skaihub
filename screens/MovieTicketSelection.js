import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

export default function MovieTicketSelection({ navigation, route }) {
  const { title, id, kind } = route.params;

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Image source={require('../assets/img6.png')} style={styles.headerImage} />
      </View>
      <ScrollView></ScrollView>
      <View style={styles.FloatingHoder1}>
        <View style={styles.floatitem}>
          <View>
            <View style={[styles.chairSeat, styles.available]}></View>
            <View style={[styles.chairBack, styles.availableBack]}></View>
          </View>
          <Text style={styles.text}>Available</Text>
        </View>

        <View style={styles.floatitem}>
          <View>
            <View style={[styles.chairSeat, styles.selected]}></View>
            <View style={[styles.chairBack, styles.selectedBack]}></View>
          </View>
          <Text style={styles.text}>Selected</Text>
        </View>

        <View style={styles.floatitem}>
          <View>
            <View style={[styles.chairSeat, styles.sold]}></View>
            <View style={[styles.chairBack, styles.soldBack]}></View>
          </View>
          <Text style={styles.text}>Sold</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultColor,
    alignItems: 'center',
  },
  headerImage: {
    resizeMode: 'center',
    height: '30%',
    width: ITEM_WIDTH,
  },
  FloatingHoder1: {
    flexDirection: 'row',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatitem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  chairSeat: {
    width: 15,
    height: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -9.3,
    marginRight: 5,
    marginLeft: 5,
  },
  chairBack: {
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    height: 14,
  },
  available: {
    backgroundColor: Colors.defaultSilver,
  },
  availableBack: {
    borderBottomColor: Colors.defaultSilver,
    borderRightColor: Colors.defaultSilver,
    borderLeftColor: Colors.defaultSilver,
  },
  selected: {
    backgroundColor: Colors.defaultSelected,
  },
  selectedBack: {
    borderBottomColor: Colors.defaultSelected,
    borderRightColor: Colors.defaultSelected,
    borderLeftColor: Colors.defaultSelected,
  },
  sold: {
    backgroundColor: Colors.defaultTomato,
  },
  soldBack: {
    borderBottomColor: Colors.defaultTomato,
    borderRightColor: Colors.defaultTomato,
    borderLeftColor: Colors.defaultTomato,
  },
  text: {
    color: Colors.defaultWhite,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 10,
  },
});
