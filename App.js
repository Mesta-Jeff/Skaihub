import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import Colors from './constants/Colors';
import useCustomFonts from './src/fontFamily';

// Importing screens
import HomeScreen from './HomeScreen';
import LandingScreen from './screens/Landing';
import LoginScreen from './screens/Login';
import EntranceScreen from './screens/Entrance';
import NotificationScreen from './screens/Notification';
import ScanScreen from './screens/Scan';
import AboutScreen from './screens/AboutUs';
import DashboardNoticeDetailsScreen from './screens/DashboardNoticeDetails';
import PastEventScreen from './screens/PastEvent';
import EventDetailsScreen from './screens/EventDetails';
import ResetPasswordScreen from './screens/ResetPassword';
import CreateAccountScreen from './screens/CreateAccount';


const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useCustomFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'auto'} />

      <NavigationContainer>

        <Stack.Navigator initialRouteName="Landing"
          screenOptions={({ navigation }) => ({
            headerStyle: {
              backgroundColor: Colors.defaultWhite,
            },
            headerTintColor: Colors.defaultColor,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18
            },
            headerMode: 'screen',
            headerTitleAlign: 'start',
            headerRight: () => (
              <View style={styles.iconBar}>
                <FontAwesome style={styles.icos} name="bell-o" onPress={() => navigation.navigate('Notifications')} />
                {/* <FontAwesome style={styles.icos} name="qrcode" onPress={() => navigation.navigate('Scans')} /> */}
                <FontAwesome style={styles.icos} name="question-circle" onPress={() => navigation.navigate('AboutUs')} />
              </View>
            ),

            headerBackAllowFontScaling: false,
            headerTitleAllowFontScaling: false,
            headerBackTitleVisible: false,
          })}
        >
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{
              title: 'Skai Hub',
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Entrance"
            component={EntranceScreen}
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => { }}>
                  <Image
                    source={require('./assets/Main Logo.png')}
                    style={{ width: 40, height: 40, marginLeft: 20, borderRadius: 50, borderWidth: 2, borderColor: Colors.defaultGhost }}
                  />
                </TouchableOpacity>
              ),
              title: 'Entrance Host',
              headerShown: true,
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{
              title: 'Notification Area',
              headerShown: true,
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name="DashboardNoticeDetails"
            component={DashboardNoticeDetailsScreen}
            options={({ route }) => ({
              title: route.params.title,
              headerShown: false,
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15
              },
              headerRight: false
            })}
          />

          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={({ route }) => ({
              title: route.params.title,
              headerShown: false,
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 15
              },
              headerRight: false
            })}
          />

          <Stack.Screen
            name="PastEvents"
            component={PastEventScreen}
            options={{
              title: 'Past Events',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Scans"
            component={ScanScreen}
            options={{
              title: 'Ticket Verification',
              headerShown: true,
              headerShadowVisible: false,

            }}

          />

          <Stack.Screen
            name="AboutUs"
            component={AboutScreen}
            options={{
              title: 'What You Must Know',
              headerShown: true,
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => { }}>
                  <Image
                    source={require('./assets/Main Logo.png')}
                    style={{ width: 40, height: 40, marginLeft: 20, borderRadius: 50, borderWidth: 2, borderColor: Colors.defaultGhost }}
                  />
                </TouchableOpacity>
              ),
              title: 'Authentication',
              cardShadowEnabled: false,
              headerShadowVisible: false,
              headerShown: false,
              // headerLeft: null,
            }}
          />

          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => { }}>
                  <Image
                    source={require('./assets/Main Logo.png')}
                    style={{ width: 40, height: 40, marginLeft: 20, borderRadius: 50, borderWidth: 2, borderColor: Colors.defaultGhost }}
                  />
                </TouchableOpacity>
              ),
              title: 'Reset Password',
              cardShadowEnabled: false,
              headerShadowVisible: false,
              headerShown: false,
              // headerLeft: null,
            }}
          />

          <Stack.Screen
            name="CreateAccount"
            component={CreateAccountScreen}
            options={{
              headerLeft: () => (
                <TouchableOpacity onPress={() => { }}>
                  <Image
                    source={require('./assets/Main Logo.png')}
                    style={{ width: 40, height: 40, marginLeft: 20, borderRadius: 50, borderWidth: 2, borderColor: Colors.defaultGhost }}
                  />
                </TouchableOpacity>
              ),
              title: 'Create Account',
              cardShadowEnabled: false,
              headerShadowVisible: false,
              headerShown: false,
              // headerLeft: null,
            }}
          />


          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>

    </SafeAreaProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icos: {
    marginRight: 20,
    color: Colors.defaultColor,
    fontSize: 20,
  }


});


// npm install @react-navigation/native @react-navigation/bottom-tabs d3-shape react-native-reanimated react-native-redash react-native-safe-area-context react-native-screens react-native-svg react-native-vector-icons @types/d3-shape

// npx expo install react-native-pager-view

// npm install --save react-native-snap-carousel@4.0.0-beta.6
// $ npm install --save react-native-snap-carousel
// npm install react-native-tab-view

// npm install react-native-picker-select

// # React Native users
// npm install @react-native-picker/picker
// npx pod-install

// # Expo
// expo install @react-native-picker/picker

// npx expo install expo-screen-orientation

// npm install --save react-native-snap-carousel@4.0.0-beta.6
// $ npm install --save react-native-snap-carousel,


//npm install react-native-reanimated-carousel
//    npm list react-native-reanimated-carousel

// npm install react-native-gesture-handler@^2.0.0 react-native-reanimated@^2.0.0

// npx expo install expo-barcode-scanner
// npx expo install expo-camera

// npm install @react-native-async-storage/async-storage

// expo install @expo-google-fonts/spartan @expo-google-fonts/montserrat @expo-google-fonts/roboto @expo-google-fonts/open-sans @expo-google-fonts/poppins @expo-google-fonts/source-sans-3 @expo-google-fonts/barlow @expo-google-fonts/quicksand @expo-google-fonts/anton @expo-google-fonts/pacifico @expo-google-fonts/alata

// npx expo install react-native-modal-datetime-picker @react-native-community/datetimepicker