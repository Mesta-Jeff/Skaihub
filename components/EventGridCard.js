
import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import Colors from '../constants/Colors';


export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.79);

const EventGridCard= ({ item, index, onPress }) => {

  const { image, title, content, creator, logo, id } = item;

  return (
    <View style={{ borderWidth: 2, borderRadius: 15, borderColor: Colors.defaultColorDark,}}>
      <View style={styles.card}>
        <Image source={image} style={styles.cardImage} resizeMode="contain" />
        <Text style={styles.cardTitle} allowFontScaling={false} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
        <View style={styles.stack1}>
            <Text style={styles.cardCreator} allowFontScaling={false}>{creator}</Text>
            <Text onPress={() => onPress(title, id)} style={styles.readMore} allowFontScaling={false}>See More Details..</Text>
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
    marginHorizontal: 10
  },
  cardImage: {
    width: ITEM_WIDTH,
    height: 390,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  },

  stack1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:10
  },

  readMore: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    marginTop: -8,
    marginBottom: 10,
    color: 'blue'
    
  }

});

export default EventGridCard