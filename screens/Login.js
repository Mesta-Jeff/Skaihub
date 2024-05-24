import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';


import { BASE_URL,APP_NAME } from '../constants/Var';
import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.78);

export default function Login({ navigation }) {

  const [isChecked, setChecked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');


  const loginUser = () => {
    const url = `${BASE_URL}/authentication/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        if (responseJson.success) {
          setImageSrc(responseJson.data.image);
          const user = responseJson.data;
          // Alert.alert(
          //   'Success Alert',
          //   `User found successfully. 
          //   Name: ${user.name}
          //   Email: ${user.email}
          //   Phone: ${user.phone}
          //   Image: ${user.image}
          //   Role: ${user.role}
          //   Token: ${user.token}
          //   User Key: ${user.userKey}
          //   API Key: ${user.apiKey}`,
          //   [{ text: 'OK', onPress: () => navigation.push('Home') }]
          // );
        } else {
          Alert.alert('Error Alert', responseJson.message || 'Failed to authenticate user');
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', `An error occurred. Please try again. ${error}`);
        console.error('Error:', error);
      });
  };

  const handlePress = () => {
    if (!email || !password) {
      Alert.alert('Skai Alert', 'Sorry, an error has been found. All fields are required.');
      return;
    }

    setLoading(true);
    loginUser();
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
              { fontSize: 24, fontFamily: 'RobotoBold', color: Colors.defaultColor, letterSpacing: 4, marginBottom: 5}}>Sign In
              </Text>
              
              <TextInput
                style={styles.input}
                placeholder="Enter username here..."
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Provide your password here..."
                secureTextEntry
                se
                value={password}
                onChangeText={(text) => setPassword(text)}
              />

              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? Colors.defaultColor : undefined}
                />
                <Text allowFontScaling={false} style={styles.paragraph}>Remember my crendentials always</Text>
              </View>

              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={handlePress}
                disabled={loading}>
                <Text allowFontScaling={false} style={styles.buttonText}>{loading ? 'Please wait...' : 'Continue'}</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30,opacity: 0.5}}>
                <View style={{ flexDirection: 'column'}}>
                  <FontAwesome onPress={() => navigation.navigate('ResetPassword')} style={
                    { color: Colors.defaultColor, fontSize: 20, alignItems: 'center', textAlign: 'center',
                    }} name="repeat"
                  />
                  <Text onPress={() => navigation.navigate('ResePassword')} allowFontScaling={false} style={{ fontSize: 16, fontFamily: 'RobotoBold', color: Colors.defaultColor, textDecorationLine: 'underline'}}>Reset Password</Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 10, borderLeftWidth:2, borderLeftColor: Colors.defaultColor }}>
                  <FontAwesome onPress={() => navigation.navigate('CreateAccount')} style={
                    { color: Colors.defaultColor, fontSize: 20, alignItems: 'center',textAlign: 'center',
                    }} name="user"
                  />
                  <Text onPress={() => navigation.navigate('CreateAccount')}  allowFontScaling={false} style={{ fontSize: 16, fontFamily: 'RobotoBold', color: Colors.defaultColor, marginLeft: 10, textDecorationLine: 'underline' }}>Create Account</Text>
                </View>
              </View>

              {
                imageSrc && imageSrc !== 'null' ? (
                  <View style={styles.card}>
                    <Image source={{ uri: imageSrc }} style={styles.cardImage} />
                  </View>
                ) : null
              }

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

  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -110,
    marginTop: -10
  },
  paragraph: {
    fontSize: 15,
    color: Colors.defaultSilver
  },
  checkbox: {
    margin: 8,
    borderRadius: 10,
    borderColor: Colors.defaultSilver
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
    marginRight: 20,
    marginLeft: 15,
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
    marginTop: -7,
    width: ITEM_WIDTH,
    marginRight: 20,
    marginLeft: 15,
    alignItems: 'stretch',
  },

  loginContainer: {
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },


  input: {
    height: 50,
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
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10
  },

  buttonText: {
    color: Colors.defaultWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },

  card: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 220,
    height: 220,
    borderColor: Colors.defaultColor,
    borderWidth: 3,
    borderRadius: 200
  },

  cardImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100
  },
});
