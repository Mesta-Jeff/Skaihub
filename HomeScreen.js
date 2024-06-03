import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Image, SafeAreaView, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import Colors from './constants/Colors';
import { APP_NAME } from './constants/Var';
import ProfileScreen from './screens/Profile';
import DashboardScreen from './screens/Dashboard';
import TicketsScreen from './screens/Tickets';
import EventScreen from './screens/Events';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Loader from './components/Loader';


const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {


  const [userImage, setUserImage] = useState(null);
  const [role, setUserRole] = useState(null);
  const [pageloading, setPageLoading] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData !== null) {
          const user = JSON.parse(userData);
          setUserImage(user.image);
          setUserRole(user.role);

        } 
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Loader loading={pageloading} />
      <StatusBar style="auto" />

      <Tab.Navigator

        initialRouteName="Events"
        screenOptions={{
          tabBarActiveTintColor: Colors.defaultColor,
          tabBarInactiveTintColor: 'silver',
          tabBarAllowFontScaling: false,
          headerTitleAllowFontScaling: false,
          tabBarStyle: {
            backgroundColor: Colors.defaultWhite,
            height: 60,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            elevation: 0,
            fontSize: 12,
            marginBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      >

        <Tab.Screen name="Dashboard" component={DashboardScreen}
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerRight: () => (
              <View style={styles.iconBar}>
                <FontAwesome style={styles.icos} name="bell-o" onPress={() => navigation.navigate('Notifications')} />
                <FontAwesome style={styles.icos} name="question-circle" onPress={() => navigation.navigate('AboutUs')} />
              </View>
            ),
            headerLeft: () => (
              <Image
                source={require('./assets/Main Logo.png')}
                style={{ width: 40, height: 40, marginLeft: 20, borderRadius: 50, borderWidth: 2, borderColor: Colors.defaultGhost }}
              />
            ),
            headerTitle: 'Welcome to ' + APP_NAME,
            headerTitleAlign: 'start',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: Colors.defaultColor,
            },
            tabBarIcon: ({ color }) => <FontAwesome size={20} name="dashboard" color={color} />,
          })}
        />



        {
          role && role !== 'Private' ? (
            <Tab.Screen name="Tickets" component={TicketsScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <View style={styles.iconBar}>
                    <FontAwesome style={styles.icos} name="bell-o" onPress={() => navigation.navigate('Notifications')} />
                    <FontAwesome style={styles.icos} name="qrcode" onPress={() => navigation.navigate('Scans')} />
                    <FontAwesome style={styles.icos} name="question-circle" onPress={() => navigation.navigate('AboutUs')} />
                  </View>
                ),
                headerShadowVisible: false,
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: Colors.defaultColor,
                },
                headerTitleAlign: 'center',
                headerStatusBarHeight: 30,
                tabBarIcon: ({ color }) => <FontAwesome size={20} name="ticket" color={color} />,
              })}
            />
          ) : null
        }

        <Tab.Screen name="Profile" component={ProfileScreen}
          options={{
            // headerTitle: nickname ? 'Welcome ' + nickname : 'Profile Page',
            headerShadowVisible: false,
            headerShown: false,
            tabBarIcon: ({ color }) =>
              userImage && userImage !== 'null' ? (
                <Image
                  source={{ uri: userImage }}
                  style={styles.profileImage} resizeMode="center"
                />
              ) : (
                <FontAwesome size={20} name="user-o" color={color} />
              ),
          }}
        />

        <Tab.Screen name="Events" component={EventScreen}
          options={{
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              color: Colors.defaultColor,
            },
            headerTitleAlign: 'center',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={20} name="briefcase" color={color} />,
          }} />

      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelStyle: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  iconBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icos: {
    marginRight: 20,
    color: Colors.defaultColor,
    fontSize: 20,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.defaultWhite,
    marginBottom: 50,

  }


});

export default HomeScreen;
