
import React from 'react'
import { View, StyleSheet, Image, Text } from "react-native"

import Colors from '../constants/Colors';


const PeopleViewed = ({ item, index, onPress }) => {

    const { image, title, description, id } = item;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: 190,}}>
            <View style={styles.card}>
                {image && image !== 'null' ? (
                    <Image source={image} style={styles.cardImage} />
                ) : null}

            </View>
            <Text style={styles.cardDescriptions} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{description}</Text>
            <Text onPress={() => onPress(title, id)} style={styles.readMore} allowFontScaling={false}>Know More..</Text>
        </View>
    );
};



const styles = StyleSheet.create({

    card: {
        backgroundColor: Colors.defaultWhite,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 1.2,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 185,
        height: 185,
        borderColor: Colors.defaultColor,
        borderWidth: 2
    },

    cardImage: {
        width: 165,
        height: 165,
        borderRadius: 20,
        resizeMode: 'contain'
    },
    cardDescriptions: {
        fontWeight: 'bold',
        color: Colors.defaultGrey,
        fontSize: 12,
    },
    readMore: {
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: -2,
        marginBottom: 10,
        color: Colors.defaultColorLight

    }

});

export default PeopleViewed