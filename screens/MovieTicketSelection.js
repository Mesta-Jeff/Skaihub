import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constants/Var';
import Loader from '../components/Loader';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

export default function MovieTicketSelection({ navigation, route }) {
  const { ticket_title, title, id, ticket_id, description, price, total, remaining, created_at, seat } = route.params;
  const [availableSeats, setAvailableSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageloading, setPageLoading] = useState(false);
  const [reservedSeatsData, setReservedSeatsData] = useState([]);

  // Getting all the reserved seats
  useEffect(() => {
    const getReservedSeats = async () => {
      const url = `${BASE_URL}/events/seats/reserved?ticket_id=${ticket_id}`;
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
          setReservedSeatsData(edata.map(seat => seat.seat)); 
          // console.log('Data Receiveds', JSON.stringify(edata, null, 2));
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

    getReservedSeats();
  }, []);

  // Declaring and making the variables
  const generateSeats = (start, end) => {
    const seats = [];
    for (let i = start; i <= end; i++) {
      seats.push(i);
    }
    return seats;
  };

  // Resetting the available seats
  const fetchData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const [start, end] = seat.split('-');
      const seats = generateSeats(parseInt(start, 10), parseInt(end, 10));
      setAvailableSeats(seats);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Making API request to verify ticket
  const oderSeatAction = async (seatSelected) => {
    try {
      setPageLoading(true);

      const url = `${BASE_URL}/events/ticket/buy`;
      const userData = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key, user_id } = JSON.parse(userData);

      if (seatSelected != null) {
        const body = {
          ticket_id: ticket_id,
          user_id: user_id,
          seat: seatSelected,
          quantity: 1,
          ticket_type: ticket_title,
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
          Alert.alert('Reservation Confirmation', responseJson.message + ' And Ticket Number: ' + responseJson.ticket_number);
          // console.log('Response Data:', responseJson.message + ' Ticket Number: ' + responseJson.ticket_number);
        } else {
          const errorResponse = await response.json();
          Alert.alert('Attention!!!', errorResponse.message || 'An error occurred');
          console.log('FeedbackError:', errorResponse.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setPageLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.defaultColor} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <Loader loading={pageloading} />

      <View>
        <Image source={require('../assets/img6.png')} style={styles.headerImage} />
      </View>

      <ScrollView contentContainerStyle={styles.floatingHolder}>
        {availableSeats.map((seatNumber) => {
          const isReserved = reservedSeatsData.includes(seatNumber.toString());

          return (
            <View key={seatNumber} style={styles.floatitem}>
              <TouchableOpacity onPress={() => oderSeatAction(seatNumber)} disabled={isReserved}>
                <View style={[styles.chairSeat, isReserved ? styles.sold : styles.available]}>
                  <Text style={[isReserved ? styles.whileText : styles.defaultText]}>{seatNumber}</Text>
                </View>
                <View style={[styles.chairBack, isReserved ? styles.soldBack : styles.availableBack]}></View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      <View style={{ backgroundColor: Colors.defaultWhite, height: 2, width: '100%', marginTop: 10 }}></View>

      <View style={styles.floatingHolder}>
        <View style={styles.floatitem}>
          <View>
            <View style={[styles.chairSeat, styles.available, { width: 15, height: 15 }]}></View>
            <View style={[styles.chairBack, styles.availableBack]}></View>
          </View>
          <Text style={styles.flowText}>Seat Available</Text>
        </View>

        <View style={styles.floatitem}>
          <View>
            <View style={[styles.chairSeat, styles.sold, { width: 15, height: 15 }]}></View>
            <View style={[styles.chairBack, styles.soldBack]}></View>
          </View>
          <Text style={styles.flowText}>Seat Taken</Text>
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
  floatingHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    alignItems: 'center',
    marginLeft: 10
  },
  floatitem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  chairSeat: {
    width: 28,
    height: 25,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -8.3,
    marginRight: 4,
    marginLeft: 4,
  },
  chairBack: {
    borderBottomWidth: 5,
    borderRightWidth: 3,
    borderLeftWidth: 3,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    height: 15,
  },
  available: {
    backgroundColor: Colors.defaultSelected,
  },
  availableBack: {
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

  defaultText: {
    color: Colors.defaultColor,
    fontSize: 9,
    fontWeight: '700',
  },

  whileText: {
    color: Colors.defaultWhite,
    fontSize: 9,
    fontWeight: '700',
  },

  flowText: {
    color: Colors.defaultWhite,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '700',
  }


});
