
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Alert, FlatList, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Divider, ActivityIndicator, } from 'react-native-paper';
import { RefreshControl } from 'react-native';
import { BASE_URL } from '../constants/Var';
import Carousel from 'react-native-reanimated-carousel';
import moment from 'moment-timezone';


import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import InAttendance from '../components/InAttendance';
import PeopleViewed from '../components/PeopleViewed';
import persons from '../model/DashboardData';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);
export const HEADER_HEIGHT = 350;
let STATUS_COLOR = Colors.defaultColor ?? Colors.defaultSilver;

export default function EventDetails({ route, navigation }) {

  // Getting the event detailes from the route
  const [eventsData, setEventsData] = useState([]);
  const { title, id } = route.params;
  const [pageloading, setPageLoading] = useState(false);
  const isCarousel = React.useRef(null);
  const [data, setData] = useState(persons.slice(0, 2));
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

 
  // Formating the date posted
  const formatRelativeTime = (dateString) => {
    const date = moment.tz(dateString, 'YYYY-MM-DD HH:mm:ss', 'GMT');
    const now = moment().tz('GMT');
    const diff = now.diff(date, 'seconds');


    if (diff < 60) {
      return `${diff} secs ago`;
    } else if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return `${mins} mins ago`;
    } else if (diff < 7200) {
      return 'an hour ago';
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hours ago`;
    } else if (diff < 172800) {
      return 'yesterday';
    } else if (diff < 2592000) {
      const days = Math.floor(diff / 86400);
      return `${days} days ago`;
    } else if (diff < 5184000) {
      return 'a month ago';
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 1692000);
      return `${months} months ago`;
    } else {
      const years = Math.floor(diff / 31536000);
      return `${years} years ago`;
    }
  };

  // Getting the Event detailes
  useEffect(() => {
    const fetchUserData = async () => {
      const url = `${BASE_URL}/events/mobile?query_type=No&request_value=${id}`;
      try {
        const userData = await AsyncStorage.getItem('user');
        const { token, api_key, api_token, user_key } = JSON.parse(userData);

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
        const edata = responseData.data;

        if (Array.isArray(edata)) {
          setEventsData(edata);
          // console.log('Data Received', JSON.stringify(eventsData, null, 2));
        } else {
          console.error('API response data is not an array:', edata);
          Alert.alert('Request Failed', 'Check your internet connection, request for data failed');
        }

      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Making API request that someone has viwed the event
  useEffect(() => {
    const timer = setTimeout(async () => {
      const url = `${BASE_URL}/events/someone-viewing`;
      const userData2 = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key, user_id } = JSON.parse(userData2);

      const body = {
        event_id: id,
        user_id: user_id,
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ApiKey': api_key,
            'ApiToken': api_token,
            'UserKey': user_key,
          },
          body: JSON.stringify(body),
        });

        const responseData = await response.json();
        console.log('Response:', responseData.message);
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  // Making API Request that some is lking event
  const handleLikes = async () => {
    try {
      const url = `${BASE_URL}/events/someone-liking`;
      const userData3 = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key, user_id } = JSON.parse(userData3);

      const body = {
        event_id: id,
        user_id: user_id,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ApiKey': api_key,
          'ApiToken': api_token,
          'UserKey': user_key,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const responseJson = await response.json();
        console.log('Response Data:', responseJson.message);
      } else {
        const errorResponse = await response.json();
        Alert.alert('Attention!!!', errorResponse.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Making API Request that some is staring event
  const handleStars = async () => {
    try {
      const url = `${BASE_URL}/events/someone-staring`;
      const userData3 = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key, user_id } = JSON.parse(userData3);

      const body = {
        event_id: id,
        user_id: user_id,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ApiKey': api_key,
          'ApiToken': api_token,
          'UserKey': user_key,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const responseJson = await response.json();
        console.log('Response Data:', responseJson.message);
      } else {
        const errorResponse = await response.json();
        Alert.alert('Attention!!!', errorResponse.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

   // Making API Request that some is staring event
  const handleComments = async () => {
    setPageLoading(true)
    try {
      await AsyncStorage.getItem('user');
      navigation.navigate('EventCommenting', { title: title, id: id });
    } finally {
      setPageLoading(false);
    }
  };

  // Creating a view when the list ie empty
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: 'center', }}>
        <Text style={{ fontStyle: 'italic' }}>No record found to display</Text>
        <Divider style={styles.divider} />
      </View>
    );
  };

  //Refreshing the list when it about ending
  const onEndReached = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(persons);
      setRefreshing(false);
    }, 1000);
  };

  // Navigating to next page
  const handInAttendancePress = (title, id) => {

  };

  // Navigating to next page
  const buyTickPress = async () => {
    setPageLoading(true);
    try {
      await AsyncStorage.getItem('user');
      navigation.navigate('MovieTicketSelection', { title: title, id: id, kind: e.event_type });
    } finally {
      setPageLoading(false);
    }
  };

  // Going back to the previous page
  const goPrevious= () =>
  {
    navigation.goBack();
  }


  // Extracting the first event data (you can modify this as needed)
  const e = eventsData.length > 0 ? eventsData[0] : {};


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.defaultColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Loader loading={pageloading} />

      <ImageBackground source={{ uri: e.small_image }} style={styles.backgroundImage} >
        <LinearGradient colors={[Colors.defaultTransparent, Colors.defaultPinkTransparent, Colors.defaultColor]} style={styles.gradient} >
          <View style={styles.profileTopTextHolder}>
            <Text style={styles.headerTtitle} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{title || '...'}</Text>
            <Text style={{ color: Colors.defaultWhite, fontWeight: '700', opacity: 0.7 }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{e.sub_title != null ? e.sub_title : '--'}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.bottomScroll}>

        <Text style={styles.subHeader}>Statistics on Events </Text>
        <Divider style={styles.divider} />
        <View style={styles.eventReport}>
          <View style={styles.eventItem}>
            <FontAwesome style={{ marginTop: 5 }} size={25} name="eye" color={Colors.defaultColor} />
            <Text style={{ fontFamily: 'OpenSansBold', fontSize: 16 }} allowFontScaling={false}>{e.views != null ? e.views : '--'}</Text>
          </View>
          <TouchableOpacity onPress={handleStars}>
            <View style={styles.eventItem}>
              <FontAwesome style={{ marginTop: 5 }} size={25} name="star-half-full" color={Colors.defaultSilver} />
              <Text style={{ fontFamily: 'OpenSansBold', fontSize: 16 }} allowFontScaling={false}>{e.stars != null ? e.stars : '--'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLikes}>
            <View style={styles.eventItem}>
              <FontAwesome style={{ marginTop: 5 }} size={25} name="thumbs-o-up" color={Colors.defaultSilver} />
              <Text style={{ fontFamily: 'OpenSansBold', fontSize: 16 }} allowFontScaling={false}>
                {e.likes != null ? e.likes : '--'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComments}>
            <View style={styles.eventItem}>
              <FontAwesome style={{ marginTop: 5 }} size={25} name="commenting-o" color={Colors.defaultSilver} />
              <Text style={{ fontFamily: 'OpenSansBold', fontSize: 16 }} allowFontScaling={false}>{e.comments != null ? e.comments : '--'}</Text>
            </View>
          </TouchableOpacity>

        </View>
        <Divider style={styles.divider} />



        <Text style={[styles.subHeader, { marginTop: 15 }]}>Detailed Information </Text>
        <View style={styles.rtContainer}>
          <View style={styles.detailedContainer}>

            <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 6, color: Colors.defaultSilver }} allowFontScaling={false}>Venue:
            </Text>
            <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>{e.venue != null ? e.venue : '--'}</Text>
            <Divider style={{ marginHorizontal: 10, }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <View>
                <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Happening On:</Text>
                <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>
                  {e.start_date != null ? e.start_date : '--'}
                </Text>
              </View>
              <View style={{ alignItems: 'center', }}>
                <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Event Type</Text>
                <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>
                  {e.event_type != null ? e.event_type : '--'}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Secction Off:</Text>
                <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>
                  {e.end_date != null ? e.end_date : '--'}
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Created By:</Text>
            <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', fontSize: 14 }} allowFontScaling={false}>
              {e.title != null
                ? `${e.title} ${e.first_name} ${e.last_name} | ${formatRelativeTime(e.created_at)}`
                : '--'}
            </Text>
            <Divider style={{ marginHorizontal: 10, }} />

            <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 6, color: Colors.defaultSilver }} allowFontScaling={false}>
              For more information:
            </Text>
            <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false} selectable>
              {e.phone != null ? e.phone + " (" + e.email + ")" : '--'}
            </Text>
            <Divider style={{ marginHorizontal: 10, }} />

            <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>
              Discription:
            </Text>
            <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'SourceSans3Regular', }} allowFontScaling={false} selectable>
              {e.content != null ? e.content : 'No data to display'}
            </Text>
            <Divider style={{ marginHorizontal: 10, }} />

          </View>
        </View>

        <Text style={[styles.subHeader, { marginTop: 2 }]}>In Attendance</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <FlatList
            style={{ marginVertical: 10 }}
            data={data}
            renderItem={({ item }) => (
              <InAttendance item={item} onPress={handInAttendancePress} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={myListEmpty}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => { }} />
            }
            onEndReachedThreshold={0.1}
            onEndReached={onEndReached}
            stickyHeaderIndices={[0]}
            horizontal={true}
          />
        </View>
        <Divider style={styles.divider} />
        <Text style={[styles.subHeader, { marginLeft: 100, marginTop: 2, }]}>People Who Viewed</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Carousel
            loop width={ITEM_WIDTH - 140}
            ref={isCarousel} height={220}
            horizontal={true} autoPlay={true}
            mode='parallax' layout='tender'
            data={data} scrollAnimationDuration={4000}
            renderItem={({ item }) => (
              <PeopleViewed item={item} onPress={handInAttendancePress} />
            )}
          />
        </View>

        <Text style={styles.subHeader}>Do you want attend this event...? </Text>
        <Divider style={styles.divider} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity style={styles.buttonStyles} onPress={buyTickPress}>
          <FontAwesome size={20} name="ticket" color={Colors.defaultWhite} />
          <Text allowFontScaling={false} style={styles.buttonText}>{'Buy Ticket On Click'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonButton} onPress={goPrevious}>
          <FontAwesome size={25} name="angle-left" color={Colors.defaultWhite} />
          <Text allowFontScaling={false} style={styles.buttonText}>{'Go Back'}</Text>
        </TouchableOpacity>
        </View>

      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    width: '100%',
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center'
  },

  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    // alignItems: 'center',
    flexDirection: 'row'
  },

  profileTopTextHolder: {
    marginBottom: -250,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 15
  },
  headerTtitle: {
    fontSize: 24,
    color: Colors.defaultWhite,
    fontFamily: 'MontserratBlack',
    textTransform: 'uppercase'
  },
  bottomScroll: {
    flexGrow: 1,
    justifyContent: 'start',
    padding: 10,
    paddingTop: 20,

  },

  subHeader: {
    fontFamily: 'OpenSansBold',
    marginBottom: -6,
    fontSize: 16,
  },

  divider: {
    marginVertical: 8
  },
  eventReport: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  eventItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rtContainer: {
    marginBottom: 20,
    marginTop: 10
  },

  detailedContainer: {
    backgroundColor: Colors.defaultWhite,
    marginHorizontal: 2.5,
    justifyContent: 'space-around',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    marginTop: 2.8,
    borderColor: Colors.defaultColor,
    borderWidth: 1.5
  },

  buttonStyles: {
    backgroundColor: Colors.defaultColor,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonButton: {
    backgroundColor: Colors.defaultTomato,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },

  buttonText: {
    color: Colors.defaultWhite,
    fontSize: 18,
    fontFamily: 'OpenSansExtraBold',
    marginLeft: 10,
  },


});
