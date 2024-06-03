
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Divider, } from 'react-native-paper';
import { RefreshControl, RefreshControls } from 'react-native';
import { APP_NAME, BASE_URL } from '../constants/Var';
import Carousel from 'react-native-reanimated-carousel';

import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import InAttendance from '../components/InAttendance';
import PeopleViewed from '../components/PeopleViewed';
import persons from '../model/DashboardData';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

export default function EventDetails({ route, navigation }) {

  // Getting the event detailes from the route
  const { title, id } = route.params;
  const [pageloading, setPageLoading] = useState(false);
  const isCarousel = React.useRef(null)


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const { token, api_key, api_token, user_key } = JSON.parse(userData);


      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };

    fetchUserData();
  }, []);


  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: 'center', }}>
        <Text style={{ fontStyle: 'italic' }}>No record found to display</Text>
        <Divider style={styles.divider} />
      </View>
    );
  };

  const [data, setData] = useState(persons.slice(0, 2));
  const [refreshing, setRefreshing] = useState(false);

  const onEndReached = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(persons);
      setRefreshing(false);
    }, 1000);
  };


  const handInAttendancePress = (title, id) => {

  };

  // Loging user out
  const buyTickPress = async () => {
    setPageLoading(true);
    try {
      await AsyncStorage.getItem('user');
     navigation.push('Landing');
    } finally {
      setPageLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      <Loader loading={pageloading} />

      <ImageBackground source={require('../assets/bg1.jpeg')} style={styles.backgroundImage} >
        <LinearGradient colors={[Colors.defaultTransparent, Colors.defaultPinkTransparent, Colors.defaultColor]} style={styles.gradient} >

          <View style={styles.profileTopTextHolder}>
            <Text style={styles.headerTtitle} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{title || '...'}</Text>
            <Text style={{ color: Colors.defaultWhite, fontWeight: '700', opacity: 0.7 }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{title || '...'}</Text>

          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.bottomScroll}>

          <Text style={styles.subHeader}>Statistics on Events </Text>
          <Divider style={styles.divider} />
          <View style={styles.eventReport}>
            <View style={styles.eventItem}>
              <FontAwesome style={{ marginTop: 5 }} size={20} name="eye" color={Colors.defaultSilver} />
              <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 24 }} allowFontScaling={false}>--</Text>
            </View>
            <View style={styles.eventItem}>
              <FontAwesome style={{ marginTop: 5 }} size={20} name="star-half-full" color={Colors.defaultSilver} />
              <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 24 }} allowFontScaling={false}>--</Text>
            </View>
            <View style={styles.eventItem}>
              <FontAwesome style={{ marginTop: 5 }} size={20} name="thumbs-o-up" color={Colors.defaultSilver} />
              <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 24 }} allowFontScaling={false}>--</Text>
            </View>
            <View style={styles.eventItem}>
              <FontAwesome style={{ marginTop: 5 }} size={20} name="commenting-o" color={Colors.defaultSilver} />
              <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 24 }} allowFontScaling={false}>--</Text>
            </View>
          </View>
          <Divider style={styles.divider} />



          <Text style={[styles.subHeader, { marginTop: 15 }]}>Detailed Information </Text>
          <View style={styles.rtContainer}>
            <View style={styles.detailedContainer}>

              <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 6, color: Colors.defaultSilver }} allowFontScaling={false}>Venue:
              </Text>
              <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>Content Here</Text>
              <Divider style={{ marginHorizontal: 10, }} />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View>
                  <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Happening On:</Text>
                  <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>Month 00, 0000 </Text>
                </View>
                <View style={{ alignItems: 'center', }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Event Type</Text>
                  <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>Award </Text>
                </View>
                <View>
                  <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Secction Off:</Text>
                  <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>Month 00, 0000 </Text>
                </View>
              </View>

              <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Created By:</Text>
              <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>Content Here </Text>
              <Divider style={{ marginHorizontal: 10, }} />

              <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 6, color: Colors.defaultSilver }} allowFontScaling={false}>For more information:
              </Text>
              <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'OpenSansBold', }} allowFontScaling={false}>Content Here</Text>
              <Divider style={{ marginHorizontal: 10, }} />

              <Text style={{ fontSize: 12, fontWeight: '700', marginHorizontal: 10, marginTop: 2, color: Colors.defaultSilver }} allowFontScaling={false}>Discription:</Text>
              <Text style={{ marginHorizontal: 10, marginBottom: 6, fontFamily: 'SourceSans3Regular', }} allowFontScaling={false}>Main container Praesent convallis, urna non mollis facilisis, mi orci facilisis lacus, et fermentum enim sem non massa. Duis sed semper neque. Ut placerat quam non neque
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
              loop
              width={ITEM_WIDTH - 140}
              ref={isCarousel}
              height={220}
              horizontal={true}
              autoPlay={true}
              mode='parallax'
              layout='tender'
              data={data}
              scrollAnimationDuration={4000}
              renderItem={({ item }) => (
                <PeopleViewed item={item} onPress={handInAttendancePress} />
              )}
            />
          </View>

          <Text style={styles.subHeader}>Do you want attend this event...? </Text>
          <Divider style={styles.divider} />
          <TouchableOpacity style={styles.buttonStyles} onPress={buyTickPress}>
            <FontAwesome size={20} name="ticket" color={Colors.defaultWhite} />
            <Text allowFontScaling={false} style={styles.buttonText}>{'Buy Ticket On Click'}</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

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
    height: 350,
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
  bottomContainer: {
    flex: 1
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
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: Colors.defaultWhite,
    fontSize: 18,
    fontFamily: 'OpenSansExtraBold',
    marginLeft: 10,
  },


});
