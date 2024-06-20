
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Divider, } from 'react-native-paper';
import { APP_NAME, BASE_URL } from '../constants/Var';


import Colors from '../constants/Colors';
import Loader from '../components/Loader';

export default function Profile({ navigation }) {


  const [pageloading, setPageLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [nickname, setUserNick] = useState(null);
  const [Name, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData !== null) {
          const user = JSON.parse(userData);
          setUserImage(user.image);
          setUserNick(user.nickname);
          setUserName(user.name);

        } 
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };

    fetchUserData();
  }, []);


  // Loging user out
  const logoutUser = async () => {
    Alert.alert(
      'Logout Confirmation', 'Are you sure you want to log out?',
      [
        { text: 'No', onPress: () => console.log('Logout cancelled'), style: 'cancel', },
        {
          text: 'Yes',
          onPress: async () => {
            setPageLoading(true);
            try {
              await AsyncStorage.removeItem('user');
              navigation.push('Login');
            } finally {
              setPageLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Loader loading={pageloading} />

      <ImageBackground source={require('../assets/usercover.jpg')} style={styles.backgroundImage} >
        <LinearGradient colors={[Colors.defaultTransparent, Colors.defaultPinkTransparent, Colors.defaultColor]} style={styles.gradient} >

          <View style={styles.profileTopTextHolder}>
            <Text style={styles.userName} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">@{nickname || 'Messta-Jeff Nana'}</Text>
            <Text style={{ color: Colors.defaultWhite, fontWeight: '700', opacity: 0.7 }} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">{Name || 'Nana Ayisi Solomon Jeff'}</Text>
          </View>

          <View style={styles.profileImgHolder}>
            {
              userImage && userImage !== 'null' ? (
                <Image style={styles.profileImage} source={{ uri: userImage }} />
              ) : (
                <Image style={styles.profileImage} source={require('../assets/Commedy.jpg')} />
              )
            }
          </View>

        </LinearGradient>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <ScrollView contentContainerStyle={styles.bottomScroll}>

          <Text style={styles.subHeader}>Statistics on Events </Text>
          <Divider style={styles.divider} />
          <View style={styles.eventReport}>
            <View style={styles.eventItem}>
              <Text style={{ color: Colors.defaultSilver, fontSize: 14, fontWeight: '500' }} allowFontScaling={false}>Event Viewed</Text>
              <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 24 }} allowFontScaling={false}>28</Text>
            </View>
            <View style={styles.eventItem}>
              <Text style={{ color: Colors.defaultSilver, fontSize: 14, fontWeight: '500' }} allowFontScaling={false}>Event Comments</Text>
              <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 24 }} allowFontScaling={false}>28</Text>
            </View>
            <View style={styles.eventItem}>
              <Text style={{ color: Colors.defaultSilver, fontSize: 14, fontWeight: '500' }} allowFontScaling={false}>Ticket Bought</Text>
              <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 24 }} allowFontScaling={false}>28</Text>
            </View>
          </View>
          <Divider style={styles.divider} />

          <Text style={[styles.subHeader, { marginTop: 15 }]}>Forward Complain </Text>
          <Divider style={styles.divider} />
          <View style={styles.rtContainer}>

            <View style={styles.complainContainerItem}>
              <View style={styles.complainContainerInner1}>
                <FontAwesome style={{ marginTop: 5 }} size={20} name="share" color={Colors.defaultWhite} />
                <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 20, marginLeft: 10, color: Colors.defaultWhite }} allowFontScaling={false}>Header Item</Text>
              </View>
              <View style={styles.complainContainerInner2}>
                <Text style={{ marginHorizontal: 10, marginVertical: 6, fontFamily: 'OpenSansExtraBold', }} allowFontScaling={false}>Content Here</Text>
                <Divider />
                <Text style={{ fontSize: 11, fontWeight: '700', margin: 10, marginTop: 2 }} allowFontScaling={false}>CLICK HERE</Text>
              </View>
            </View>
            <View style={styles.complainContainerItem}>
              <View style={styles.complainContainerInner1}>
                <FontAwesome style={{ marginTop: 5 }} size={20} name="share" color={Colors.defaultWhite} />
                <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 20, marginLeft: 10, color: Colors.defaultWhite }} allowFontScaling={false}>Header Item</Text>
              </View>
              <View style={styles.complainContainerInner2}>
                <Text style={{ marginHorizontal: 10, marginVertical: 6, fontFamily: 'OpenSansExtraBold', }} allowFontScaling={false}>Content Here</Text>
                <Divider />
                <Text style={{ fontSize: 11, fontWeight: '700', margin: 10, marginTop: 2 }} allowFontScaling={false}>CLICK HERE</Text>
              </View>
            </View>
            <View style={styles.complainContainerItem}>
              <View style={styles.complainContainerInner1}>
                <FontAwesome style={{ marginTop: 5 }} size={20} name="share" color={Colors.defaultWhite} />
                <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 20, marginLeft: 10, color: Colors.defaultWhite }} allowFontScaling={false}>Header Item</Text>
              </View>
              <View style={styles.complainContainerInner2}>
                <Text style={{ marginHorizontal: 10, marginVertical: 6, fontFamily: 'OpenSansExtraBold', }} allowFontScaling={false}>Content Here</Text>
                <Divider />
                <Text style={{ fontSize: 11, fontWeight: '700', margin: 10, marginTop: 2 }} allowFontScaling={false}>CLICK HERE</Text>
              </View>
            </View>

          </View>

          <Text style={styles.subHeader}>Control View </Text>
          <Divider style={styles.divider} />
          <View style={styles.rtContainer}>

            <View style={styles.cvContainerItem}>
              <View style={styles.cvContainerInner1}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="lock" color={Colors.defaultWhite} />
                <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 20, marginLeft: 10, color: Colors.defaultWhite }} allowFontScaling={false}>Change Password</Text>
              </View>
              <View style={styles.cvContainerInner2}>
                <Text style={{ marginHorizontal: 10, marginVertical: 6, fontFamily: 'OpenSansExtraBold', }} allowFontScaling={false}>Click here to perform action</Text>
                <Divider />
              </View>
            </View>
            <View style={styles.cvContainerItem}>
              <View style={styles.cvContainerInner1}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="phone" color={Colors.defaultWhite} />
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'OpenSansExtraBold', fontSize: 20, marginLeft: 10, color: Colors.defaultWhite }} allowFontScaling={false}>Request for Number Change</Text>
              </View>
              <View style={styles.cvContainerInner2}>
                <Text style={{ marginHorizontal: 10, marginVertical: 6, fontFamily: 'OpenSansExtraBold', }} allowFontScaling={false}>Click here to perform action</Text>
                <Divider />
              </View>
            </View>
            <View style={styles.cvContainerItem}>
              <View style={styles.cvContainerInner1}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="sitemap" color={Colors.defaultWhite} />
                <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 20, marginLeft: 10, color: Colors.defaultWhite }} allowFontScaling={false}>Device Permissions</Text>
              </View>
              <View style={styles.cvContainerInner2}>
                <Text style={{ marginHorizontal: 10, marginVertical: 6, fontFamily: 'OpenSansExtraBold', }} allowFontScaling={false}>Click here to perform action</Text>
                <Divider />
              </View>
            </View>
            <View style={styles.cvContainerItem}>
              <View style={styles.cvContainerInner1}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="code" color={Colors.defaultWhite} />
                <Text style={{ fontFamily: 'OpenSansExtraBold', fontSize: 20, marginLeft: 10, color: Colors.defaultWhite }} allowFontScaling={false}>Check for Update</Text>
              </View>
              <View style={styles.cvContainerInner2}>
                <Text style={{ marginHorizontal: 10, marginVertical: 6, fontFamily: 'OpenSansExtraBold', }} allowFontScaling={false}>Click here to perform action</Text>
                <Divider />
              </View>
            </View>

          </View>

          <Text style={styles.subHeader}>Useful Information </Text>
          <Divider style={styles.divider} />
          <View style={styles.rtContainer}>

            <View style={styles.infoContainer}>
              <View style={styles.infoContainerItem}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="info" color={Colors.defaultGrey} />
                <Text style={{ fontFamily: 'OpenSansBold', fontSize: 20, color: Colors.defaultGrey, }} allowFontScaling={false}>Know About {APP_NAME}</Text>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="angle-right" color={Colors.defaultColor} />
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoContainerItem}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="exchange" color={Colors.defaultGrey} />
                <Text style={{ fontFamily: 'OpenSansBold', fontSize: 20, color: Colors.defaultGrey, }} allowFontScaling={false}>App Terms of Use</Text>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="angle-right" color={Colors.defaultColor} />
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoContainerItem}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="eye" color={Colors.defaultGrey} />
                <Text style={{ fontFamily: 'OpenSansBold', fontSize: 20, color: Colors.defaultGrey, }} allowFontScaling={false}>Privacy Policies</Text>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="angle-right" color={Colors.defaultColor} />
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoContainerItem}>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="trash" color={Colors.defaultGrey} />
                <Text style={{ fontFamily: 'OpenSansBold', fontSize: 20, color: Colors.defaultGrey, }} allowFontScaling={false}>Clear Application Data</Text>
                <FontAwesome style={{ marginTop: 2 }} size={20} name="angle-right" color={Colors.defaultColor} />
              </View>
            </View>

          </View>

          <Text style={styles.subHeader}>Report on Events </Text>
          <Divider style={styles.divider} />
          <Text>Main container
            Praesent convallis, urna non mollis facilisis, mi orci facilisis lacus, et fermentum enim sem non massa. Duis sed semper neque. Ut placerat quam non neque
          </Text>
          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.buttonStyles} onPress={logoutUser}>
            <Text allowFontScaling={false} style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },

  profileImgHolder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.defaultWhite,
    borderWidth: 5,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: -170,
    marginRight: 10
  },

  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },

  profileTopTextHolder: {
    marginBottom: -160,
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 240,
    marginLeft: 6
  },
  userName: {
    fontSize: 22,
    color: Colors.defaultWhite,
    fontFamily: 'MontserratBlack',
  },
  bottomScroll: {
    flexGrow: 1,
    justifyContent: 'start',
    padding: 10,
    paddingTop: 20,

  },
  bottomContainer: {
    flex: 1
  },

  subHeader: {
    fontFamily: 'OpenSansBold',
    marginBottom: -6,
    fontSize: 16,
    letterSpacing: 3
  },

  divider: {
    marginVertical: 8
  },
  eventReport: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  eventItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rtContainer: {
    marginBottom: 40
  },
  complainContainerInner1: {
    flexDirection: 'row',
    margin: 10,
  },
  complainContainerInner2: {
    backgroundColor: Colors.defaultWhite,
    marginHorizontal: 2.5,
    justifyContent: 'space-around',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  },
  complainContainerItem: {
    backgroundColor: Colors.defaultColor,
    height: 112,
    flexDirection: 'column',
    borderRadius: 5,
    marginBottom: 10
  },


  cvContainerInner1: {
    flexDirection: 'row',
    margin: 10,
  },
  cvContainerInner2: {
    backgroundColor: Colors.defaultWhite,
    marginHorizontal: 2.5,
    justifyContent: 'space-around',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  cvContainerItem: {
    backgroundColor: Colors.defaultColorLight,
    height: 82,
    flexDirection: 'column',
    borderRadius: 5,
    marginBottom: 10
  },

  infoContainer: {
    backgroundColor: Colors.defaultWhite,
    height: 72,
    flexDirection: 'column',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.65,
    elevation: 1.8,
    borderWidth: 1.1,
    borderColor: Colors.defaultGrey,
  },
  infoContainerItem: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',

  },

  buttonStyles: {
    backgroundColor: Colors.defaultWhite,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderStyle: 'dotted',
    borderWidth: 1.7,
    borderColor: Colors.defaultTomato,
  },

  buttonText: {
    color: Colors.defaultTomato,
    fontSize: 16,
    fontWeight: 'bold',
  },


});
