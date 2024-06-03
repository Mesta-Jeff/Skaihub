import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import Colors from '../constants/Colors';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.79);

const EventGridCard = ({ item, onPress }) => {
  const { medium_image, event_title, venue, id, start_date } = item;

  // Parse the date and extract the short month name
  const date = new Date(start_date);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <View style={{ borderWidth: 2, borderRadius: 15, borderColor: Colors.defaultColorDark }}>
      <View style={styles.card}>
        <Image source={{ uri: medium_image }} style={styles.cardImage} />
        <Text style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail">{event_title}</Text>
        <View style={styles.stack1}>
          <Text style={styles.cardCreator} numberOfLines={1} ellipsizeMode="tail">Date: {`${month} ${day}, ${year} | ${venue}`}</Text>
          <Text onPress={() => onPress(event_title, id)} style={styles.readMore}>See More...</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.defaultWhite,
    borderRadius: 10,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
    marginVertical: 15,
    alignItems: 'flex-start',
    marginHorizontal: 10,
    justifyContent: 'flex-start',
  },
  cardImage: {
    width: ITEM_WIDTH,
    height: 370,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  cardCreator: {
    marginLeft: 10,
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'grey',
    width: 250
  },

  stack1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical:10,
    overflow: 'hidden',
    marginBottom: 10

  },

  readMore: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    marginTop: -8,
    marginBottom: 10,
    color: 'blue',
    overflow: 'hidden'
    
  }

});

export default EventGridCard