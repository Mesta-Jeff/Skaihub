import React from 'react';
import { View, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.90);

const EventGridCard = ({ item }) => {
  const { image, title, description, id } = item;

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.cardImage}>
        <LinearGradient
          colors={[Colors.defaultTransparent, Colors.middleTranspaerent , Colors.defaultColor]}
          style={styles.gradient}
        >
          <Text style={styles.cardTitle} allowFontScaling={false} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.cardDescription} allowFontScaling={false}>
            {description}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: Colors.defaultColor,
    alignItems: 'center',
  },
  cardImage: {
    width: ITEM_WIDTH,
    height: 700,
    resizeMode: 'stretch',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 42,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 5,
    color: Colors.defaultWhite,
    textAlign: 'center',
  },
  cardDescription: {
    fontWeight: '300',
    color: Colors.defaultAsh,
    textAlign: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginBottom: 150
  },
});

export default EventGridCard;
