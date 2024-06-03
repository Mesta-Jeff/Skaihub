import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, useWindowDimensions, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
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

export default function Events({ navigation }) {
  const [eventsData, setEventsData] = useState([]);
  const [innerloading, setInnerLoading] = useState(false);
  const [pageloading, setPageLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key } = JSON.parse(userData);

      const url = `${BASE_URL}/events/mobile?query_type=No`;
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
          Alert.alert('Request Failed', 'Check your internet connection, request for data failed');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Request Failed', 'Check your internet connection, request for data failed');
      }finally {
        setInnerLoading(false);
      }
    };

    fetchData();
  }, []);

  const layout = useWindowDimensions();
  const width = Dimensions.get('window').width;


  const handlePress = async (title, id) => {
    setPageLoading(true)
    try {
      await AsyncStorage.getItem('user');
      navigation.navigate('EventDetails', { title, id });
    } finally {
      setPageLoading(false);
    }

  };


  const getPastevents = async () => 
  {
    setPageLoading(true);
    try {
      await AsyncStorage.getItem('user');
      navigation.navigate('PastEvents');
    } finally {
      setPageLoading(false);
    }
  }


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
                  height={510}
                  vertical={true}
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
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
    // console.log("Ready data:" , eventsData);
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
          start={[0, 0]}
          end={[0, 1]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerText}>Current Events</Text>
          <Text style={{ fontSize: 11, alignItems: 'center', color: Colors.defaultAsh, textAlign: 'center', marginHorizontal: 35 }}>
            These contains list of events that will happen in the next days, weeks and even months to come
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

      <TouchableOpacity style={styles.skipStyles} onPress={getPastevents}>
        <FontAwesome style={styles.icos} name="briefcase" />
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
    height: 200,
    justifyContent: 'center',
  },
  headerGradient: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },

  skipStyles: {
    backgroundColor: Colors.defaultColor,
    borderColor: 'azure',
    borderWidth: 2,
    borderRadius: 50,
    opacity: 0.9,
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 0,
    right: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 0.8,
  },

  icos: {
    color: Colors.defaultWhite,
    fontSize: 20,
  }

});


