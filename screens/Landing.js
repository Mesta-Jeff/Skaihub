
import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Colors from '../constants/Colors';
import slides from '../model/OnboargingData';
import OnboardingItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/OnboardingItem';

import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Landing({ navigation }) {
  
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const handleSnapToItem = (currentIndex) => {
    setIndex(currentIndex);
    // if (currentIndex === slides.length - 1) {
    //   navigation.navigate('Entrance');
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Carousel
        layout='stack'
        layoutCardOffset={9}
        ref={isCarousel}
        data={slides}
        renderItem={OnboardingItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={handleSnapToItem}
        useScrollView={true}
      />

      <Pagination
        dotsLength={slides.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 20,
          height: 12,
          borderRadius: 10,
          marginHorizontal: 0,
          backgroundColor: Colors.defaultWhite,
        }}
        inactiveDotOpacity={0.3}
        inactiveDotScale={0.6}
        tappableDots={true}
        containerStyle={{ marginTop: -190, marginBottom: 140 }}
      />

      {(index === slides.length - 1) && (
        <TouchableOpacity
          style={styles.skipStyles}
          onPress={() => navigation.navigate('Entrance')}>
          <FontAwesome style={styles.icos} name="arrow-right" />
        </TouchableOpacity>
      )}

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  skipStyles: {
    backgroundColor: Colors.defaultColor,
    borderColor: Colors.defaultAsh,
    borderWidth: 2,
    borderRadius: 50,
    opacity: 0.9,
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 0,
    right: 180,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 8,
  },

  icos: {
    color: Colors.defaultWhite,
    fontSize: 20,
  }

});
