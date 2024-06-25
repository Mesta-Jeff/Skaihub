import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CarouselCards from '../components/EntranceCarouselCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

import Colors from '../constants/Colors';
import { APP_NAME } from '../constants/Var';
import { ITEM_WIDTH } from './Login';

export default function Entrance({ navigation }) {

  const [pageloading, setPageLoading] = useState(false);

  // Now we are initializing pament
  const handleNavigation = async (screen) => {
    try {
      setPageLoading(true);
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) {
        navigation.navigate(screen);
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={pageloading} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 ,width:ITEM_WIDTH}}>
      <View style={styles.flatContainersWrapper}>
        <View style={styles.flatcontainer1}>
          <CarouselCards />
        </View>

        <View style={styles.textContainer}>
          <Text allowFontScaling={false} style={styles.headerText}>Welcome to {APP_NAME}</Text>
        </View>

        <View style={[styles.flatcontainer, styles.marginVertical, styles.gridContainer]}>
          <Text allowFontScaling={false} style={styles.callText}>Do you want to:</Text>

          <View style={styles.gridRow}>
            {/* First row */}
            <TouchableOpacity style={[styles.gridItem, styles.rightColor]} onPress={() => navigation.navigate('Login')}>
              <FontAwesome style={styles.icos} size={28} name="usb" />
              <Text allowFontScaling={false} style={styles.skipbuttonText}>Connect to Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.gridItem, styles.leftColor]} onPress={() => navigation.navigate('Entrance')}>
              <FontAwesome style={styles.icos} size={28} name="calendar" />
              <Text allowFontScaling={false} style={styles.skipbuttonText}>Live Events</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            {/* Second row */}
            <TouchableOpacity style={[styles.gridItem, styles.rightColor]} onPress={() => handleNavigation('Home')}>
              <FontAwesome style={styles.icos} size={28} name="ticket" />
              <Text allowFontScaling={false} style={styles.skipbuttonText}>Buy A Ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.gridItem, styles.leftColor]} onPress={() => handleNavigation('Home')}>
              <FontAwesome style={styles.icos} size={28} name="folder-open" />
              <Text allowFontScaling={false} style={styles.skipbuttonText}>Create an Event</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flatContainersWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'red'
  },

  flatcontainer1: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },

  textContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },

  flatcontainer: {
    backgroundColor: Colors.defaultColor,
    width: '90%',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 90,
  },

  marginVertical: {
    marginVertical: 10,
  },

  gridContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },

  gridItem: {
    backgroundColor: Colors.defaultColor,
    paddingHorizontal: 20,
    opacity: 0.9,
    height: 80,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 24,
    color: Colors.defaultColor,
    fontFamily: 'PoppinsBlack'
  },

  callText: {
    color: Colors.defaultWhite,
    textAlign: 'left',
    fontSize: 16,
  },

  skipbuttonText: {
    color: Colors.defaultWhite,
    fontSize: 11,
    fontWeight: 'bold',
  },

  icos: {
    color: Colors.defaultWhite,
  },

  rightColor: {
    borderRightColor: Colors.defaultWhite,
    borderRightWidth: 2,
  },

  leftColor: {
    borderLeftColor: Colors.defaultWhite,
    borderLeftWidth: 2,
  },
});
