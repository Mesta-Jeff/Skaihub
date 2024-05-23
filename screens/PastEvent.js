import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, SafeAreaView, TouchableOpacity,} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import Colors from '../constants/Colors';

// Calling components and data models
import EventGridTemplate from '../components/EventGridCard';
import EventListTemplate from '../components/EventListCard';
import dataModel from '../model/EventData.js'

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.defaultColor }}
    style={{ backgroundColor: Colors.defaultWhite, shadowColor: 'silver' }}
    labelStyle={{ color: Colors.defaultColor, fontSize: 12, fontWeight: 'bold' }}
  />
);

export default function PastEvents({ navigation }) {
  
  const layout = useWindowDimensions();
  const width = Dimensions.get('window').width;

  const handlePress = (title, id) => {
    navigation.navigate('EventDetails', { title, id });
  };


  const renderScene = SceneMap({
    
    first: () => (
      <View style={{ flex: 1, backgroundColor: Colors.defaultWhite, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center',}}>
          <Carousel
            loop
            width={width}
            // height={width * 1}
            height={480}
            // vertical={true}
            autoPlay={true}
            mode='parallax'
            data={dataModel}
            scrollAnimationDuration={2000}
            renderItem={({ item }) => (
              <EventGridTemplate item={item} onPress={handlePress} />
            )}
          />
          <Text style={{fontWeight: 'bold', color: 'grey'}}>Currently Viewing</Text>
          <Text id='txtTitle' style={styles.titleText}>...</Text>
        </View>
      </View>
    ),
    
    second: () => (
      <View style={{ flex: 1, backgroundColor: Colors.defaultWhite, alignItems: 'center', }}>
        <Carousel
            loop
            width={width}
            height={200}
            vertical={true}
            autoPlay={true}
            mode='parallax'
            data={dataModel}
            scrollAnimationDuration={2000}
            renderItem={({ item }) => (
              <EventListTemplate item={item} onPress={handlePress} />
            )}
            style={{height: 550, marginVertical: 10}}
          />
      </View>
    ),
  });

  const [index, setIndex] = React.useState(0);
  const [routes, setRoutes] = React.useState([
    { key: 'first', title: 'Grid Events' },
    { key: 'second', title: 'List Events' },
  ]);

  const handleIndexChange = newIndex => {
    if (newIndex === 0) {
      setRoutes([
        { key: 'first', title: 'Showing Events in Grid' },
        { key: 'second', title: 'List Events' },
      ]);
    } else if (newIndex === 1) {
      setRoutes([
        { key: 'first', title: 'Grid Events' },
        { key: 'second', title: 'Showing Events in List' },
      ]);
    }
    setIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <LinearGradient
          colors={[Colors.defaultColor, Colors.defaultColorDark]}
          start={[0, 0]}
          end={[0, 1]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerText}>Outdated Events</Text>
          <Text style={{ fontSize: 11, alignItems: 'center', color: 'azure', textAlign: 'center', marginHorizontal: 35 }}>
            These events can be due to cancellation, suspension or date past time
          </Text>
        </LinearGradient>
      </View>

      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
      />

      <TouchableOpacity
        style={styles.skipStyles}
        onPress={() => navigation.goBack()}>
        <FontAwesome style={styles.icos} name="angle-left"  />
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.defaultWhite,
  },
  headerView: {
    backgroundColor: Colors.defaultColor,
    alignItems: 'stretch',
    height: 180,
    justifyContent: 'center',
  },
  headerGradient: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.defaultColor,
  },

  skipStyles: {
    backgroundColor: 'transparent',
    borderColor: 'azure',
    position: 'absolute',
    top: 0,
    left: 30,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icos: {
    color: Colors.defaultWhite,
    fontSize: 30,
  }

});

