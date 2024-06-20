import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Divider, } from 'react-native-paper';


import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

const TicketTemplate = ({ item, index, onPress }) => {
    const { description, id, price,total,title,remaining, created_at,seat } = item;
  
    const priceNum = parseFloat(total);
    const remainingNum = parseFloat(remaining);
    const sold = priceNum - remainingNum;

    // Parse the created_at timestamp
    const parsedDate = new Date(created_at);

    // Format the date to "MMM DD, YYYY | hh:mm AM/PM" format
    const formattedDate = `${parsedDate.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`;

    return (
        <View style={styles.mainBackground}>
            <View style={styles.headerBar}>
                <View style={styles.card}></View>
                <FontAwesome style={{ marginTop: 2, marginRight: 5, marginLeft: 10 }} size={20} name="ticket" color={Colors.defaultWhite} />
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.defaultWhite, marginLeft: 10, }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">
                    {title}
                </Text>
            </View>
            <View style={styles.innerCard}>
                <View style={styles.contentContainer}>
                    <Text style={styles.cardComment} allowFontScaling={false} selectable>
                        {description}
                        
                    </Text>
                    <Divider style={{ marginBottom: 5, }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={styles.cardCom} allowFontScaling={false}>Total Tickets</Text>
                            <Text style={styles.cardDescriptions} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{total}</Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={styles.cardCom} allowFontScaling={false}>Tickets Sold</Text>
                            <Text style={styles.cardDescriptions} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{sold}</Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={styles.cardCom} allowFontScaling={false}>Ticket Left</Text>
                            <Text style={styles.cardDescriptions} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{remaining}</Text>
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={styles.cardCom} allowFontScaling={false}>Date</Text>
                            <Text style={styles.cardDescriptions} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{formattedDate}</Text>
                        </View>
                    </View>
                    <Divider style={{ marginBottom: 5, }} />
                    <View style={{ alignItems: 'center', }}>
                        <Text style={styles.cardCom} allowFontScaling={false}>Price per Ticket</Text>
                        <Text style={styles.price} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">GHS{price}</Text>
                    </View>
                    <Divider style={{ marginBottom: 5, }} />
                    <View style={styles.eventReport}>
                        <TouchableOpacity onPress={() => onPress({description,ticket_id: id, price,total,ticket_title: title,remaining,created_at:formattedDate, seat})}>
                            <Text style={styles.readMore} allowFontScaling={false}>Click To Buy This Ticket</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({

    mainBackground: {
        marginBottom: 10,
        width: ITEM_WIDTH,
        backgroundColor: Colors.defaultWhite,
        marginTop: 5,
        marginLeft: -8
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.defaultColor,
        marginLeft: 20
    },
    innerCard: {
        backgroundColor: Colors.defaultWhite,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // marginTop: 5, 
        marginLeft: 20,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.29,
        shadowRadius: 2.65,
        elevation: 3.2,
        borderColor: Colors.defaultColor,

        borderBottomEndRadius: 15
    },

    card: {
        backgroundColor: Colors.defaultWhite,
        borderRadius: 100,
        width: 27,
        height: 40,
        borderColor: Colors.defaultColor,
        borderWidth: 0,
        marginLeft: -20,
        marginTop: -3,
        marginBottom: -2
    },

    cardImage: {
        width: 45,
        height: 45,
        borderRadius: 100,
        resizeMode: 'contain',
    },

    contentContainer: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 8
    },

    cardDescriptions: {
        fontWeight: 'bold',
        color: Colors.defaultGrey,
        fontSize: 14,
        marginBottom: 5,
    },
    cardCom: {
        color: Colors.defaultGrey,
        fontSize: 14,
        marginBottom: -2,
        marginRight: 7,
        fontFamily: 'SourceSans3Regular',
    },

    cardComment: {
        color: Colors.defaultGrey,
        fontSize: 14,
        marginBottom: 10,
        marginRight: 7,
        fontFamily: 'SourceSans3Regular',
    },
    readMore: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 6,
        marginBottom: 10,
        color: Colors.defaultColor,
    },
    price: {
        fontSize: 34,
        marginLeft: 6,
        color: Colors.defaultColorLight,
        fontFamily: 'OpenSansExtraBold',
        marginTop: -4
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

export default TicketTemplate;
