import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';

import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

const Commenting = ({ item, index, onPress }) => {
    const { image, title, description, content, id } = item;

    return (
        <View style={{ marginBottom: -10, width: ITEM_WIDTH }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.card}>
                    {image && image !== 'null' ? (
                        typeof image === 'number' ? (
                            <Image source={image} style={styles.cardImage} />
                        ) : (
                            <Image source={{ uri: image }} style={styles.cardImage} />
                        )
                    ) : null}
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.defaultGrey, marginLeft: 10 }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" >
                    By: The Creator here
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={styles.borderView}></View>
                <View style={styles.contentContainer}>
                    <Text style={styles.cardComment} allowFontScaling={false}>{content}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.cardDescriptions} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" > {description} | </Text>
                        <Text onPress={() => onPress(title, id)} style={styles.readMore} allowFontScaling={false}>Reply..</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.defaultWhite,
        borderRadius: 100,
        shadowColor: '#000',
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
        width: 55,
        height: 55,
        borderColor: Colors.defaultColor,
        borderWidth: 2,
    },
    cardImage: {
        width: 45,
        height: 45,
        borderRadius: 100,
        resizeMode: 'contain',
    },
    borderView: {
        borderLeftWidth: 2,
        borderLeftColor: Colors.defaultColor,
        height: '100%',
        marginLeft: 30,
        width: 35,
        marginTop: -6
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    cardDescriptions: {
        fontWeight: 'bold',
        color: Colors.defaultGrey,
        fontSize: 14,
        marginBottom: 5,
    },
    cardComment: {
        color: Colors.defaultGrey,
        fontSize: 14,
        marginBottom: 10,
        marginRight: 10,
        fontFamily: 'SourceSans3Regular',
    },
    readMore: {
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 6,
        marginBottom: 10,
        color: Colors.defaultColorLight,
    },
});

export default Commenting;
