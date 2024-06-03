

import React from 'react'
import { View, StyleSheet, Image, Text } from "react-native"

import Colors from '../constants/Colors';


const InAttendance = ({ item, index, onPress }) => {

    const { image, title, description, id } = item;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', overflow: 'hidden', width: 100 }}>
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
        borderRadius: 100,
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
        width: 75,
        height: 75,
        borderColor: Colors.defaultColor,
        borderWidth: 2
    },

    cardImage: {
        width: 65,
        height: 65,
        borderRadius: 100,
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

export default InAttendance