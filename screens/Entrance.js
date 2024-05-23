
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CarouselCards from '../components/EntranceCarouselCards'

import Colors from '../constants/Colors';

export default function Entrance({ navigation }) {
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.flatContainersWrapper}>
        <View style={styles.flatcontainer1}>
          <CarouselCards />
        </View>

        <View style={{ justifyContent: 'flex-start', marginBottom: 10 }}>
          <Text allowFontScaling={false} style={styles.headerText}>Welcome to SkaiMount Event Hub</Text>

          <View style={[styles.flatcontainer, styles.marginVertical, styles.gridContainer]}>
            <Text allowFontScaling={false} style={styles.callText}>Do you want to: </Text>

            <View style={styles.gridRow}>
              {/* First row */}
              <TouchableOpacity style={[styles.gridItem, styles.rightColor]} onPress={() => navigation.navigate('Login')}>
                <FontAwesome style={styles.icos} size={28} name="usb" />
                <Text allowFontScaling={false} style={styles.skipbuttonText}>Connect to Explore</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.gridItem, styles.leftColor]} onPress={() => navigation.navigate('Login')}>
                <FontAwesome style={styles.icos} size={28} name="calendar" />
                <Text allowFontScaling={false} style={styles.skipbuttonText}>LIve Events</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.verticalLine} /> */}

            <View style={styles.gridRow}>
              {/* Second row */}
              <TouchableOpacity style={[styles.gridItem, styles.rightColor]} onPress={() => navigation.navigate('Home')}>
                <FontAwesome style={styles.icos} size={28} name="ticket" />
                <Text allowFontScaling={false} style={styles.skipbuttonText}>Buy A Ticket</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.gridItem, styles.leftColor]} onPress={() => navigation.navigate('Login')}>
                <FontAwesome style={styles.icos} size={28} name="folder-open" />
                <Text allowFontScaling={false} style={styles.skipbuttonText}>Create an Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


      </View>
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
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  flatcontainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flatcontainer: {
    backgroundColor: Colors.defaultColor,
    width: '90%',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 20,
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

  marginVertical: {
    marginVertical: 20,
  },

  headerText: {
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '900',
    color: Colors.defaultColor
  },

  callText: {
    color: Colors.defaultWhite,
    textAlign: 'left',
    marginLeft: -180,
    fontSize: 16
  },

  skipbuttonText: {
    color: Colors.defaultWhite,
    fontSize: 11,
    fontWeight: 'bold',
  },

  icos: {
    color: Colors.defaultWhite
  },

  rightColor: {
    borderRightColor: Colors.defaultWhite,
    borderRightWidth: 2
  },

  leftColor: {
    borderLeftColor: Colors.defaultWhite,
    borderLeftWidth: 2
  }

});





