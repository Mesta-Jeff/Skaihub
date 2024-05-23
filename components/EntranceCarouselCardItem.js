
import React from 'react'
import { View, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.79);

const EntranceCarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      {/* <Image  source={{ uri: item.imgUrl }} style={styles.image} /> */}
      <Image source={item.imgUrl} style={styles.image}  resizeMode='stretch' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    marginTop: 5,
    alignItems: 'center',
  },
  image: {
    width: ITEM_WIDTH,
    height: 320,
    borderRadius: 10,
  },
  
})

export default EntranceCarouselCardItem