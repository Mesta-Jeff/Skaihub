
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { BASE_URL,APP_NAME } from '../constants/Var';
import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.78);

export default function ResetPassword({ navigation }) {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const [userData, setUserData] = useState({ api_token: null, user_key: null, api_key: null, token: null });
  const [events, setEvents] = useState([]);

  // const handlePress = async () => {
  //   try {
  //     setLoading(true);
  
  //     const userData = await AsyncStorage.getItem('user');
  //     if (userData !== null) {
  //       const user = JSON.parse(userData);
  
  //       const url = `${BASE_URL}/events/mobile`;
  
  //       const response = await fetch(url, {
  //         method: 'GET',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${user.token}`,
  //           'ApiKey': user.api_key,
  //           'ApiToken': user.api_token,
  //           'UserKey': user.user_key,
  //         },
  //       });
  
  //       const data = await response.json();
  //       console.log('Fetched data:', data);
  //       setEvents(data);
  //       setLoading(false);
  //     }
  //     console.log('Events:', events); 
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setLoading(false);
  //     Alert.alert('Error', 'Failed to fetch data. Please try again.');
  //   }
  // };
  

  const handlePress = () => {
    if (!email) {
      Alert.alert('Please Note', 'Sorry, an error has been found. email is required.');
      return;
    }

    setLoading(true);
  };


  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <View style={[styles.row, styles.topRow]}></View>
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={64} > 

      <View style={[styles.row, styles.middleRow]}>
        <Text allowFontScaling={false} style={styles.textWelcome}>You're Welcome</Text>
        <Text allowFontScaling={false} style={styles.headerText}>{APP_NAME}</Text>
        <View style={styles.row1}>
          <FontAwesome style={styles.ico} name="folder-open" />
          <Text allowFontScaling={false} style={{ color: Colors.defaultWhite }}>View our policies</Text>
        </View>
      </View>
      
      <View style={[styles.row, styles.bottomRow]}>

        <View style={{ flex: 0.5, }}>
          <View>
            <View style={styles.loginContainer}>
            <Text allowFontScaling={false} style={
              { fontSize: 24, fontFamily: 'RobotoBold', color: Colors.defaultColor, marginBottom: 5}}>Reset My Password
              </Text>
              
              <Text allowFontScaling={false} style={ { fontSize: 14, color: Colors.defaultSilver, marginBottom: 5}}>
                To reset your password you need to provide the email that was attached to your account when you created the account
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your verified email here"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={handlePress}
                disabled={loading}>
                <Text allowFontScaling={false} style={styles.buttonText}>{loading ? 'Please wait...' : 'Request Password'}</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30,opacity: 0.5}}>
                <View style={{ flexDirection: 'column'}}>
                  <FontAwesome onPress={() => navigation.navigate('Entrance')} style={
                    { color: Colors.defaultColor, fontSize: 20, alignItems: 'center', textAlign: 'center',
                    }} name="arrow-left"
                  />
                  <Text onPress={() => navigation.navigate('Entrance')} allowFontScaling={false} style={{ fontSize: 16, fontFamily: 'RobotoBold', color: Colors.defaultColor, textDecorationLine: 'underline'}}>Go Home</Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 10, borderLeftWidth:2, borderLeftColor: Colors.defaultColor }}>
                  <FontAwesome onPress={() => navigation.navigate('Login')} style={
                    { color: Colors.defaultColor, fontSize: 20, alignItems: 'center',textAlign: 'center',
                    }} name="user-circle"
                  />
                  <Text onPress={() => navigation.navigate('Login')} allowFontScaling={false} style={{ fontSize: 16, fontFamily: 'RobotoBold', color: Colors.defaultColor, marginLeft: 10, textDecorationLine: 'underline' }} >Login Now</Text>
                </View>
              </View>

            </View>
          </View>
        </View>

      </View>

      </KeyboardAvoidingView>

    </SafeAreaProvider>
  );
}

// Add your styles here...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    justifyContent: 'start',
  },

  row: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  topRow: {
    backgroundColor: Colors.defaultColor,
    height: 90
  },
  middleRow: {
    width: ITEM_WIDTH,
    backgroundColor: Colors.defaultColor,
    height: 220,
    // marginRight: 20,
    marginLeft: 10,
    marginVertical: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1.8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  row1: {
    backgroundColor: Colors.defaultColorDeep,
    height: 80,
    width: '100%',
    marginBottom: -20,
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  ico: {
    color: Colors.defaultWhite,
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
  },

  bottomRow: {
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: -25,
    width: ITEM_WIDTH,
    marginRight: 20,
    marginLeft: 10,
    alignItems: 'stretch',
  },

  loginContainer: {
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },


  input: {
    height: 60,
    width: '100%',
    borderColor: Colors.defaultColorLight,
    borderWidth: 1.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  headerText: {
    color: Colors.defaultWhite,
    marginBottom: 10,
    fontSize: 34,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontFamily: 'PoppinsBlack',
  },

  textWelcome: {
    color: 'white',
    fontSize: 18,
    letterSpacing: 5
  },

  buttonStyles: {
    backgroundColor: Colors.defaultColor,
    borderColor: Colors.defaultColorLight,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10
  },

  buttonText: {
    color: Colors.defaultWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },

});
