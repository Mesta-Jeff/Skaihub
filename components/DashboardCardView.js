

import React from 'react'
import { View, StyleSheet, Dimensions, Image, Text } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.79);

const DashboardCardView = ({ item, index, onPress }) => {

  const { image, title, content, description, logo, id } = item;

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.header}>
          {image && image !== 'null' ? (
            <Image source={logo} style={styles.cardLogo} />
          ) : (
            <FontAwesome style={styles.ico} name="bell" />
          )}
          <Text allowFontScaling={false} style={styles.cardTitle}  numberOfLines={2} ellipsizeMode="tail">{title}</Text>
        </View>
        {image && image !== 'null' ? (
          <Image source={image} style={styles.cardImage} resizeMode="contain" />
        ) : null}
        <Text style={styles.cardContent} allowFontScaling={false}>{content}</Text>
        <Text style={styles.cardDescriptions} allowFontScaling={false}>{description}</Text>
        <Text onPress={() => onPress(title, id)} style={styles.readMore} allowFontScaling={false}>Read More..</Text>
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
    elevation: 0.4,
    marginVertical: 15,
    alignItems: 'flex-start',
    marginHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  cardImage: {
    width: ITEM_WIDTH,
    height: 390,
    marginTop: 10,
  },
  cardLogo: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'azure',
    marginRight: 5,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1, 
  },
  cardContent: {
    color: 'grey',
    verticalAlign: 'middle',
    margin: 10,
    marginLeft: 50,
  },
  cardDescriptions: {
    marginLeft: 50,
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'grey',
  },

  ico: {
    color: Colors.defaultWhite,
    fontSize: 20,
    borderColor: 'orangered',
    borderWidth: 2,
    borderRadius: 50,
    alignItems: 'center',
    padding: 8,
    textAlign: 'center',
    backgroundColor: 'tomato',
    marginRight: 5,
  },

  readMore: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 50,
    marginTop: -8,
    marginBottom: 10,
    color: 'blue'
    
  }

});

export default DashboardCardView