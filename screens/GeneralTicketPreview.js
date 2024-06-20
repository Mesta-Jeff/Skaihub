

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Dimensions, KeyboardAvoidingView, Platform, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BASE_URL } from '../constants/Var';
import Colors from '../constants/Colors';
import TicketTemplate from '../components/TicketTemplate';
import Loader from '../components/Loader';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

export default function GeneralTicketPreview({ navigation, route }) {

  const { title, id, kind } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [innerloading, setInnerLoading] = useState(false);
  const [tickets, settickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [pageloading, setPageLoading] = useState(false);


  // Getting the list tickets from the api
  const fetchticket = async () => {
    const userData = await AsyncStorage.getItem('user');
    const { token, api_key, api_token, user_key, } = JSON.parse(userData);

    const url = `${BASE_URL}/events/event-tickets?event_id=${id}`;
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

      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (!Array.isArray(responseData.data)) {
        throw new Error('API response data is not an array');
      }

      settickets(responseData.data);
      // console.log("return data", responseData.data)
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Request Failed', 'Check your internet connection, request for data failed');
    } finally {
      setInnerLoading(false);

    }
  };

  useEffect(() => {
    fetchticket();
  }, []);

  // When the ticket is empty
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text allowFontScaling={false} style={styles.emptyText}>Sorry no ticket created yet...</Text>
    </View>
  );


  const handleStatusClick = async ({ description, ticket_id, price, total, ticket_title, remaining, created_at, seat }) => {
    setPageLoading(true);
    try {
        const user = await AsyncStorage.getItem('user');
        if (kind.toLowerCase() === "movie" || kind.toLowerCase() === "movies") {
            navigation.navigate('MovieTicketSelection', {
                title: title,
                id: id,
                ticket_title: ticket_title,
                ticket_id: ticket_id,
                description: description,
                price: price,
                total: total,
                seat: seat,
                remaining: remaining,
                created_at: created_at
            });
        } else {
            Alert.alert('Attention Please!!!', `Do you want to buy the ${ticket_title} ticket...?`);
        }
    } finally {
        setPageLoading(false);
    }
};


  useEffect(() => {
    const filteredData = tickets.filter((ticket) => {
      const ticketTitle = ticket.title.toLowerCase();
      const searchQueryLower = searchQuery.toLowerCase();
      return ticketTitle.includes(searchQueryLower);
    });
    setFilteredTickets(filteredData);
  }, [searchQuery, tickets]);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <Loader loading={pageloading} />

      <TextInput style={styles.searchBar} placeholder="Make your search here..." value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />

      <FlatList
        data={filteredTickets}
        renderItem={({ item, index }) => (
          <TicketTemplate item={item} index={index} onPress={handleStatusClick} />
        )}
        keyExtractor={(item, index) => item.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.ticketsList}
        refreshing={innerloading}
        onRefresh={fetchticket}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  ticketsList: {
    flexGrow: 1,
    // marginLeft: -2,

  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.defaultSilver,
    fontStyle: 'italic',
    marginTop: 80,
  },


})
