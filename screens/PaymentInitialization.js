import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, Alert, ActivityIndicator} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import { BASE_URL ,APP_NAME} from '../constants/Var';
import Colors from '../constants/Colors';


const SLIDER_WIDTH = Dimensions.get('window').width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.79);

export default function PaymentInitialization({ navigation, route }) {

  const { title, seat, ticket_id, ticket_title, price, kind } = route.params;
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [network, setNetwork] = useState('');
  const [pageloading, setPageLoading] = useState(false);
  const [userPhone, setuserPhone] = useState(null);
  const [Name, setUserName] = useState(null);

  // Getting user data from session
  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      if (userData !== null) {
        const user = JSON.parse(userData);
        setuserPhone(user.phone);
        setUserName(user.name);
        setNetwork(determineNetwork(user.phone));
      } 
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
    }
  };
  

  // Making API request to verify ticket
  const orderSeatAction = async () => {
    try {
      const url = `${BASE_URL}/events/ticket/buy`;
      const userData = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key, user_id } = JSON.parse(userData);

      const body = {
        ticket_id: ticket_id,
        user_id: user_id,
        seat: 0,
        quantity: 1,
        ticket_type: ticket_title,
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
        setLoading(false);
      } else {
        const errorResponse = await response.json();
        console.log('FeedbackError:', errorResponse.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // Using useEffect to set the events
  useEffect(() => {
    const initialize = async () => {
      await fetchUserData();
      if (kind.toLowerCase() !== "movie" && kind.toLowerCase() !== "movies") {
        await orderSeatAction();
      }
    };

    initialize();
  }, [kind]);


  // ADDING VAT
  const p = parseFloat(price);
  const v = parseFloat(2.00);
  const vat = p + v;

  // Determing NETWORK
  const determineNetwork = (phone) => {
    const prefix = phone.slice(0, 3);
    if (['020', '050'].includes(prefix)) {
      return 'Telecel (Formerly Vodafone)';
    } else if (['027', '026'].includes(prefix)) {
      return 'AirtelTigo';
    } else if (['055', '024', '054', '025', '059', '023'].includes(prefix)) {
      return 'MTN';
    } else {
      return '';
    }
  };


  // Going back
  const goPrevious = () => {
    navigation.goBack();
  };

  // Changing Phone NUmber
  const changePhoneNumber = () => {
    setIsEditable(true);
  };

  // Function to handle phone number input and accept only numbers
  const handlePhoneInput = (text) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setuserPhone(formattedText);
    setNetwork(determineNetwork(formattedText));
  };

  // PREPARING THE REFERENCE NUMBER
  const generateReferenceNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const randomNumbers = String(Math.floor(Math.random() * 100000)).padStart(5, '0'); // 5 random numbers

    return `SM0000${year}${month}${day}${hour}${minute}${second}${randomNumbers}`;
  };

  // Now we are initializing pament
  const initializePaymentNow = async () => {
    try {
      setPageLoading(true);
      const userData = await AsyncStorage.getItem('user');
      const url = `${BASE_URL}/ticket/initialize-payment`;
      const { token, api_key, api_token, user_key} = JSON.parse(userData);

      if (userData !== null) {
        const user = JSON.parse(userData);
        const refID = generateReferenceNumber();

        const body = {
          user_id: user.user_id,
          ticket_id: ticket_id,
          amount: vat,
          acc_number: userPhone,
          ref_number: refID,
          acc_host: network,
          ipaddress: 'mobile'
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
          navigation.navigate('Payment', {
            amount: vat,
            payer_email: user.email,
            payer_name: user.name,
            payer_phone: user.phone,
            refID: refID,
            ticket_id: ticket_id,
            seat: seat
          });
        } else {
          const errorResponse = await response.json();
          Alert.alert('Attention!!!', errorResponse.message || 'An error occurred');
          console.log('FeedbackError:', errorResponse.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setPageLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.defaultColor} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <Loader loading={pageloading} />

      <LinearGradient colors={[Colors.defaultColorDeep, '#1bcac5']} style={styles.middleRow}>
        <View style={{flexDirection: 'column'}}>
            <Text allowFontScaling={false} style={styles.currencyText}>Hello Dear!</Text>
            <Text allowFontScaling={false} style={[styles.headerText, {fontSize: 20, marginLeft: 10, marginTop: -3, color: Colors.defaultSelected}]}>{Name}</Text>
        </View>
        <Text allowFontScaling={false} style={styles.textWelcome}>
          You're expected to make payment of
        </Text>
        <View style={styles.priceContainer}>
          <Text allowFontScaling={false} style={styles.headerText}>{price}</Text>
          <Text allowFontScaling={false} style={[styles.currencyText, {color: Colors.defaultSelected}]}>GHS</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.totalContainer}>
          <Text allowFontScaling={false} style={styles.totalText}>{vat.toFixed(2)}₵</Text>
          <Text allowFontScaling={false} style={[styles.textWelcome, {marginTop: 3,fontSize: 15}]}> Total Price (After VAT Added)</Text>
        </View>
      </LinearGradient>

      <View style={styles.bottomRow}>
        <Text allowFontScaling={false} style={styles.paymentTitle}>Payment Alert</Text>
        <ScrollView contentContainerStyle={styles.loginContainer}>
        <Text allowFontScaling={false} style={styles.infoText}>
            You are about to make a payment for a ticket of type ({ticket_title}) for the event ({title}). {"\n"}{"\n"}
            The mentioned amount will be charged. If you agree, please confirm by initializing the payment and following through to the end of the process. {"\n"}{"\n"}
            Rest assured, any prompt you receive from PayStack regarding the payment beyond this screen is indeed legitimate and {APP_NAME} Approved. {"\n"}{"\n"}
            Thank you.
        </Text>

          <View style={styles.innerSeparator} />
          <Text allowFontScaling={false} style={styles.infoText}>
            Line for transactions you can change it if there's the need for
          </Text>
          <View style={{flexDirection: 'row', width:ITEM_WIDTH}}>
            <TextInput style={[styles.input, {width: '65%',}]} value={userPhone} onChangeText={handlePhoneInput} editable={isEditable} maxLength={10} keyboardType='phone-pad'/>
            <TouchableOpacity style={[styles.backButton,{width: 120,height: 50,}]} onPress={changePhoneNumber}>
                <Text allowFontScaling={false} style={styles.backText}>Change Phone</Text>
            </TouchableOpacity>
          </View>
          <Text allowFontScaling={false} style={[styles.paymentTitle, {opacity: 0.4}]}>{network}</Text>

          <View style={styles.innerSeparator} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => initializePaymentNow()}  style={styles.buttonStyles} disabled={loading}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                {loading ? 'Please wait...' : 'Initialize Payment'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={goPrevious}>
              <FontAwesome size={20} name="angle-left" color={Colors.defaultColorLight} />
              <Text allowFontScaling={false} style={styles.backText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    // justifyContent: 'center',
  },
  middleRow: {
    width: ITEM_WIDTH,
    backgroundColor: Colors.defaultColor,
    height: 220,
    marginTop: 90,
    marginLeft: 10,
    marginVertical: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1.8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    padding: 10,
    marginBottom: 30,
  },
  textWelcome: {
    color: Colors.defaultWhite,
    fontSize: 16,
    letterSpacing: 1,
    marginBottom: -10,
    marginLeft: 10,
    opacity: 0.8
  },
  priceContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: -20,
  },
  headerText: {
    color: Colors.defaultSelected,
    fontSize: 44,
    // textAlign: 'center',
    fontFamily: 'PoppinsBlack',
  },
  currencyText: {
    color: Colors.defaultWhite,
    fontSize: 16,
    marginTop: 20,
    marginLeft: 10,
  },
  separator: {
    backgroundColor: Colors.defaultWhite,
    height: 2,
    width: '100%',
    marginTop: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  totalText: {
    color: Colors.defaultSelected,
    fontSize: 20,
    fontFamily: 'RobotoBold',
  },
  bottomRow: {
    justifyContent: 'flex-start',
    height: '100%',
    marginTop: -25,
    width: ITEM_WIDTH,
    marginLeft: 10,
    alignItems: 'stretch',
  },
  paymentTitle: {
    fontSize: 20,
    fontFamily: 'RobotoBold',
    color: Colors.defaultColor,
    marginBottom: 5,
  },
  loginContainer: {
    backgroundColor: Colors.defaultWhite,
    alignItems: 'center',
    // justifyContent: 'center',
    flexGrow: 1,
  },
  infoText: {
    fontSize: 14,
    color: Colors.defaultSilver,
    marginBottom: 5,
  },
  innerSeparator: {
    backgroundColor: Colors.defaultSilver,
    height: 1,
    width: '100%',
    marginTop: 1,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonStyles: {
    backgroundColor: Colors.defaultColor,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    height: 55,
  },
  buttonText: {
    color: Colors.defaultWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 100,
    borderColor: Colors.defaultColorLight,
    borderWidth: 2,
    marginLeft: 10,
  },
  backText: {
    color: Colors.defaultColorLight,
    fontSize: 13,
    fontFamily: 'OpenSansBold',
    marginLeft: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: Colors.defaultColorLight,
    borderWidth: 1.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: 'OpenSansBold',
  },
});
