import React, { useEffect, useState, useRef, } from 'react';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, SafeAreaView, TouchableOpacity,} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import { BASE_URL } from '../constants/Var';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import InnerLoad from '../components/InnerLoad.js'
import Loader from '../components/Loader';
import { StatusBar } from 'expo-status-bar';

// Calling components and data models
import EventGridTemplate from '../components/EventGridCard';
import EventListTemplate from '../components/EventListCard';


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

  const [eventsData, setEventsData] = useState([]);
  const [innerloading, setInnerLoading] = useState(false);
  const [pageloading, setPageLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key } = JSON.parse(userData);

      const url = `${BASE_URL}/events/mobile?query_type=Yes`;
      setInnerLoading(true);
  
      try {

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ApiKey': api_key,
            'ApiToken': api_token,
            'UserKey': user_key,
          },
        });

        const responseData = await response.json();
        const data = responseData.data;

        if (Array.isArray(data)) {
          setEventsData(data);
        } else {
          console.error('API response data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally {
        setInnerLoading(false);
      }
    };

    fetchData();
  }, []);


  const handlePress = (title, id) => {
    setPageLoading(true)
    navigation.navigate('EventDetails', { title, id });
    setPageLoading(false);
  };


  const renderScene = SceneMap({
    
    first: () => (
      <View style={{ flex: 1, backgroundColor: Colors.defaultWhite, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {innerloading ? (
            <InnerLoad loading={innerloading} />
          ) : (
            <>
              {eventsData && eventsData.length > 0 ? (
                <Carousel
                  loop
                  width={width}
                  height={480}
                  // vertical={true}
                  autoPlay={true}
                  mode='parallax'
                  data={eventsData}
                  scrollAnimationDuration={4000}
                  renderItem={({ item }) => (
                    <EventGridTemplate item={item} onPress={handlePress} />
                  )}
                />
              ) : (
                <Text style={{ fontStyle: 'italic', fontSize: 18 }} allowFontScaling={false}>No record to display</Text>
              )}
            </>
          )}
        </View>
      </View>
    ),
    
    second: () => (
      <View style={{ flex: 1, backgroundColor: Colors.defaultWhite, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          {innerloading ? (
            <InnerLoad loading={innerloading} />
          ) : (
            <>
              {eventsData && eventsData.length > 0 ? (
                <Carousel
                  loop
                  width={width}
                  height={200}
                  vertical={true}
                  autoPlay={true}
                  mode="parallax"
                  data={eventsData}
                  scrollAnimationDuration={4000}
                  renderItem={({ item }) => (
                    <EventListTemplate item={item} onPress={handlePress} />
                  )}
                  style={{ height: 550, marginVertical: 10 }}
                />
              ) : (
                <Text style={{ fontStyle: 'italic', fontSize: 18 }} allowFontScaling={false}>No Record to display</Text>
              )}
            </>
          )}
        </View>
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

      <Loader loading={pageloading} />
      <StatusBar style="auto" />

      <View style={styles.headerView}>
        <LinearGradient
          colors={[Colors.defaultColor, Colors.defaultColorDark]}
          start={[0, 0]} end={[0, 1]} style={styles.headerGradient}
        >
          <Text style={styles.headerText}>Past Events</Text>
          <Text style={{ fontSize: 12, alignItems: 'center', color: 'azure', textAlign: 'center', marginHorizontal: 35 }}>
          You're currently viewing events that have either been canceled, suspended, or are past their scheduled date.
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
    top: -5,
    left: 30,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icos: {
    color: Colors.defaultWhite,
    fontSize: 40,
    marginLeft: 20,
    // marginBottom: 25
  }

});

