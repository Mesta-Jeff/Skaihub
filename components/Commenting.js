import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Divider, } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

const Commenting = ({ item, index, onPress }) => {
    const { image, comment, id, nickname, created_at } = item;
    const [person, setPerson] = useState(null);

// gETTING THE USERinfo from the async storage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          const user = JSON.parse(userData);
          setPerson(user.nickname);
        }
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };

    fetchUserData();
  }, []);

    // Parse the created_at timestamp
    const parsedDate = new Date(created_at);

    // Format the date to "MMM DD, YYYY | hh:mm AM/PM" format
    const formattedDate = `${parsedDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} | ${parsedDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

    return (
        <View style={{ marginBottom: 10, width: ITEM_WIDTH }}>
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
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: Colors.defaultGrey, marginLeft: 5, }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">
                    Posted by: {person === nickname ? 'You' : nickname}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: -15 }}>
                <View style={styles.borderView}></View>
                <View style={styles.contentContainer}>
                    <Text style={styles.cardComment} allowFontScaling={false} selectable>{comment}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.cardDescriptions} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">On: {formattedDate} | </Text>
                        <Text style={styles.readMore} allowFontScaling={false}>Trash Comment..</Text>
                    </View>
                    <Divider style={{ marginBottom: 5, }} />
                    <View style={styles.eventReport}>
                        <TouchableOpacity onPress={() => onPress(nickname, 'dislike', id)}>
                            <View style={styles.eventItem}>
                                <FontAwesome style={{ marginTop: 2, marginRight: 5 }} size={10} name="thumbs-o-down" color={Colors.defaultSilver} />
                                <Text style={{ fontWeight: '500', fontSize: 12, color: Colors.defaultSilver }} allowFontScaling={false}>0</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(nickname, 'comment', id)}>
                            <View style={styles.eventItem}>
                                <FontAwesome style={{ marginTop: 2, marginRight: 5 }} size={14} name="comment-o" color={Colors.defaultSilver} />
                                <Text style={{ fontWeight: '500', fontSize: 12, color: Colors.defaultSilver }} allowFontScaling={false}>0</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(nickname, 'like', id)}>
                            <View style={styles.eventItem}>
                                <FontAwesome style={{ marginTop: 2, marginRight: 5 }} size={10} name="thumbs-o-up" color={Colors.defaultSilver} />
                                <Text style={{ fontWeight: '500', fontSize: 12, color: Colors.defaultSilver }} allowFontScaling={false}>0</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(nickname, 'smile', id)}>
                            <View style={styles.eventItem}>
                                <FontAwesome style={{ marginTop: 2, marginRight: 5 }} size={10} name="smile-o" color={Colors.defaultSilver} />
                                <Text style={{ fontWeight: '500', fontSize: 12, color: Colors.defaultSilver }} allowFontScaling={false}>0</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPress(nickname, 'retweet', id)}>
                            <View style={styles.eventItem}>
                                <FontAwesome style={{ marginTop: 2, marginRight: 5 }} size={10} name="retweet" color={Colors.defaultSilver} />
                                <Text style={{ fontWeight: '500', fontSize: 12, color: Colors.defaultSilver }} allowFontScaling={false}>0</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginTop: 5, }} />
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
        marginLeft: 27,
        width: 30,
        marginTop: 10
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
    eventReport: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    eventItem: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
});

export default Commenting;
