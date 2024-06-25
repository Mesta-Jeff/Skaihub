
import React, { useState, useEffect, useRef } from 'react';
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { View, TouchableOpacity, Text, StyleSheet, Alert, StatusBar } from "react-native";
import { BASE_URL, PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY } from '../constants/Var';
import Colors from '../constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Payment({ navigation, route }) {

    const { amount, payer_email, payer_phone,refID, payer_name, ticket_id, seat } = route.params;
    const paystackWebViewRef = useRef(paystackProps.PayStackRef);

    // Now we are initializing pament
    const updatePaymentStatus = async (iref) => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const url = `${BASE_URL}/ticket/payment/verify-status`;
        const { token, api_key, api_token, user_key } = JSON.parse(userData);
  
        if (userData !== null) {
          const user = JSON.parse(userData);
  
          const body = {
            user_id: user.user_id,
            ticket_id: ticket_id,
            ref_number: iref,
            seat: seat
          };
  
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'ApiKey': api_key,
              'ApiToken': api_token,
              'UserKey': user_key,
            },
            body: JSON.stringify(body),
          });
  
          if (response.ok) {
            navigation.navigate('Home');
          } else {
            const errorResponse = await response.json();
            Alert.alert('Attention!!!', errorResponse.message || 'An error occurred');
            console.log('FeedbackError:', errorResponse.message);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };


  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      
      <Paystack
        paystackKey={PAYSTACK_PUBLIC_KEY}
        paystackSecretKey={PAYSTACK_SECRET_KEY}
        billingEmail={payer_email}
        amount={amount}
        billingName={payer_name}
        billingMobile={payer_phone}
        currency='GHS'
        channels={["mobile_money"]}
        label={'Messta Jeff'}
        refNumber={refID}
        activityIndicatorColor={Colors.defaultColor}
        onCancel={(e) => {
            console.log(e);
        }}
        onSuccess={(res) => {
          const { data } = res;
          const { transactionRef } = data;
          if(transactionRef.reference != null || transactionRef.reference !='')
          {
            updatePaymentStatus(transactionRef.reference);
          }
          console.log('Payment alert displayed with message:', transactionRef.message);
        }}
        ref={paystackWebViewRef}
      />
      <TouchableOpacity  onPress={() => paystackWebViewRef.current.startTransaction()} style={styles.payButton} >
        <FontAwesome size={18} name="hourglass" color={Colors.defaultWhite} />
        <Text style={styles.text}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  payButton: {
    minWidth: "60%",
    backgroundColor: Colors.defaultColor,
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    borderColor: Colors.defaultWhite,
    borderWidth: 2,
  },
  text: {
    color: Colors.defaultWhite,
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'PoppinsBlack',
  },


});