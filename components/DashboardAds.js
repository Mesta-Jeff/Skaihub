import React from 'react'
import { View, StyleSheet, Dimensions, Image} from "react-native"
import Carousel from 'react-native-snap-carousel'

import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

const adsData = [
    {
      title: 'Aenean leo',
      imgUrl: require('../assets/bg9.jpg'),
    },
    {
      title: 'In turpis',
      imgUrl: require('../assets/bg5.jpg'),
    },
    {
      title: 'Lorem Ipsum',
      imgUrl: require('../assets/bg8.jpg'),
    },
    {
      title: 'Lorem Ipsum',
      imgUrl: require('../assets/bg1.jpeg'),
    },
  ];

const AdsItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={item.imgUrl} style={styles.image} resizeMode='stretch' />
      </View>
    )
  }

const DashboardAds = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout='stack'
        layoutCardOffset={0}
        ref={isCarousel}
        data={adsData}
        renderItem={({ item, index }) => <AdsItem item={item} index={index} />}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        autoplay={true}
        autoplayInterval={5000}
      />
    </View>
  )
};


const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultWhite,
      borderRadius: 10,
      width: ITEM_WIDTH,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 2,
    //   marginTop: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: -40,
      marginBottom: 20
    },
    image: {
      width: ITEM_WIDTH,
      height: 150,
      borderRadius: 6,
    },
    
  })


export default DashboardAds
