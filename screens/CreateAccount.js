import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Image, Dimensions, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import { BASE_URL, APP_NAME } from '../constants/Var';
import Colors from '../constants/Colors';
import Loader from '../components/Loader';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.78);

export default function CreateAccount({ navigation }) {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDOB] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');



    // Getting the Lat and Lot
    useEffect(() => {
        async function getLocationAsync() {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          reverseGeocode(location.coords.latitude, location.coords.longitude);
          console.log('Location:', location);
        }
    
        getLocationAsync();
    }, []);
    
    // Using the long and lat to get the actual location name
    const reverseGeocode = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const town = data.address.town || data.address.city;
            const district = data.address.district || data.address.county;
            const region = data.address.state || data.address.region;
            const country = data.address.country;

            setAddress(`${country}, ${region} (${town})`);
            
        } catch (error) {
            console.error('Error in reverse geocoding:', error);
        }
    };


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDOB(date.toISOString().split('T')[0]);
        hideDatePicker();
    };

    // Calculate the max date (10 years ago from the current year)
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 16, 11, 31);


    // Validating input before the saving
    const handleCreateAccountPress = () => {
        if (!email || !password || !gender || !dob || !name || !nickname || !phone) {
            Alert.alert('Skai Alert', 'Sorry, an error has been found. All fields are required.');
            return;
        }
        // console.log(address);
        setLoading(true);
        makeApiRequest();
    };

    // Making Api Call
    const makeApiRequest = async () => {
        const url = `${BASE_URL}/users/mobile/createaccount`;
        try {
            setLoading(true);
    
            // Ensure the image object is properly initialized
            if (!image || !image.base64) {
                throw new Error('Image data is missing or incomplete.');
            }
    
            const formData = new FormData();
            formData.append('image', image.base64);
            formData.append('name', name);
            formData.append('nickname', nickname);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('gender', gender);
            formData.append('dob', dob);
            formData.append('phone', phone);
            formData.append('address', address);
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: image.base64,
                    name,
                    nickname,
                    email,
                    password,
                    gender,
                    dob,
                    phone,
                    address
                })
            });
    
            const responseJson = await response.json();
            setLoading(false);
    
            console.log('Response:', responseJson);
    
            if (responseJson.success) {
                Alert.alert('Success Alert', responseJson.message || 'Account created, details have been sent to your email');
                navigation.push('Login');
            } else {
                Alert.alert('Error Alert', responseJson.message || 'Failed to authenticate user');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', `An error occurred. Please try again. ${error.message}`);
            console.error('Error:', error);
        }
    };
    
    // Pick image and validate it
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            selectionLimit: 1,
        });
    
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileInfo = await FileSystem.getInfoAsync(uri);
            const maxSize = 2 * 1024 * 1024;
            if (fileInfo.size <= maxSize) {
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                setImage({ uri, base64 });
                setImageURL(uri);
            } else {
                Alert.alert('Please Note', 'The selected image is too large. Please select an image smaller than 2 MB.');
            }
        }

    };


    // Validating password
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (password && confirmPassword) {
          setShowError(password !== confirmPassword);
        } else {
          setShowError(false);
        }
    }, [password, confirmPassword]);


    return (
        <SafeAreaProvider style={styles.container}>
            <Loader loading={loading} />
            <StatusBar style="auto" />

            <View style={[styles.row, styles.topRow]}></View>
            <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={64}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={[styles.row, styles.middleRow]}>
                        <Text allowFontScaling={false} style={styles.textWelcome}>You're Welcome</Text>
                        <Text allowFontScaling={false} style={styles.headerText}>{APP_NAME}</Text>
                        <View style={styles.row1}>
                            <FontAwesome style={styles.ico} name="folder-open" />
                            <Text allowFontScaling={false} style={{ color: Colors.defaultWhite }}>View our policies</Text>
                        </View>
                    </View>

                    <View style={[styles.row, styles.bottomRow]}>
                        <View style={{ flex: 0.5 }}>
                            <View>
                                <View style={styles.loginContainer}>
                                    <Text allowFontScaling={false} style={{ fontSize: 24, fontFamily: 'RobotoBold', color: Colors.defaultColor, letterSpacing: 4, marginBottom: 5 }}>
                                        Create Account
                                    </Text>

                                    {/* <Text style={{color:Colors.defaultSilver, fontStyle: 'italic'}}>
                                        Provide us with your fullname in S-O-F
                                    </Text> */}
                                    <TextInput
                                        style={styles.input}  placeholder="Fullname (eg. Nana Ayisi Solomon Jeff)" value={name} onChangeText={(text) => setName(text)}
                                    />
                                    {/* <Text style={{color:Colors.defaultSilver, fontStyle: 'italic'}}>
                                        15 characters long how do you want be addressed...?
                                    </Text> */}
                                    <TextInput
                                        style={styles.input} placeholder="Identify me by (eg. Messta-Jeff)" value={nickname} maxLength={15} onChangeText={(text) => setNickname(text)}
                                    />
                                    {/* <Text style={{color:Colors.defaultSilver, fontStyle: 'italic'}}>
                                        This email address should be valid and active
                                    </Text> */}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email (eg. jeff@gmail.com)" keyboardType='email-address' value={email} onChangeText={(text) => setEmail(text)}
                                    />
                                    
                                    <TouchableOpacity style={[styles.buttonStyles, { marginBottom: 10, backgroundColor: Colors.defaultWhite, width: ITEM_WIDTH }]} onPress={showDatePicker} disabled={loading}>
                                        <Text allowFontScaling={false} style={{ color: Colors.defaultColor, fontSize: 16, fontWeight: 'bold', }}>{loading ? 'Please wait...' : 'Click to select your Date of Birth'}</Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        value={dob}
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        maximumDate={maxDate}
                                    />

                                    {/* <Text style={{color:Colors.defaultSilver, fontStyle: 'italic'}}>
                                        You will use this phone to get most of your verifications, it should be ready to receive calls and messages
                                    </Text> */}
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Phone (eg. 0245482029)"
                                        keyboardType='number-pad'
                                        maxLength={10}
                                        value={phone}
                                        onChangeText={(text) => setPhone(text)}
                                    />
                                    <View style={styles.pickerContainer}>
                                        <RNPickerSelect
                                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                                            items={[
                                                { label: 'Male', value: 'Male' },
                                                { label: 'Female', value: 'Female' },
                                                { label: 'Other', value: 'Other' },
                                            ]}
                                            placeholder={{ label: 'Select Gender', value: null }}
                                        />
                                    </View>
                                    <Text style={{color:'tomato', opacity: 0.5, fontStyle: 'italic'}}>
                                        NB: We don't provide a rule for password generating, but make sure your password is far away from your phone number, date of birth and anything sensitive to you
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Provide your password here..."
                                        secureTextEntry
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm password"
                                        secureTextEntry
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                    />
                                    {showError && (
                                        <Text style={{color:'tomato', opacity: 0.5, fontStyle: 'italic'}}>
                                        Passwords do not match...
                                        </Text>
                                    )}

                                    <View style={styles.imageContainer}>
                                        {imageURL ? (
                                            <TouchableOpacity onPress={pickImage}>
                                                <Image source={{ uri: imageURL }} style={styles.image} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={pickImage}>
                                                <Image source={require('../assets/up5.png')} style={styles.image} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <Text style={{ color: Colors.defaultSilver }}>Click to upload profile picture</Text>

                                    <TouchableOpacity style={styles.buttonStyles} onPress={handleCreateAccountPress} disabled={loading}>
                                        <Text allowFontScaling={false} style={styles.buttonText}>{loading ? 'Please wait...' : 'Sign Up'}</Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity style={styles.buttonStyles} onPress={handleLoader}>
                                        <Text allowFontScaling={false} style={styles.buttonText}>{loading ? 'Please wait...' : 'Check Loader'}</Text>
                                    </TouchableOpacity> */}

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30, opacity: 0.5 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <FontAwesome onPress={() => navigation.navigate('Entrance')} style={{ color: Colors.defaultColor, fontSize: 20, alignItems: 'center', textAlign: 'center' }} name="arrow-left" />
                                            <Text onPress={() => navigation.navigate('Entrance')} allowFontScaling={false} style={{ fontSize: 16, fontFamily: 'RobotoBold', color: Colors.defaultColor, textDecorationLine: 'underline' }}>Go Home</Text>
                                        </View>

                                        <View style={{ flexDirection: 'column', marginLeft: 10, borderLeftWidth: 2, borderLeftColor: Colors.defaultColor }}>
                                            <FontAwesome onPress={() => navigation.navigate('Login')} style={{ color: Colors.defaultColor, fontSize: 20, alignItems: 'center', textAlign: 'center' }} name="user-circle" />
                                            <Text onPress={() => navigation.navigate('Login')} allowFontScaling={false} style={{ fontSize: 16, fontFamily: 'RobotoBold', color: Colors.defaultColor, marginLeft: 10, textDecorationLine: 'underline' }}>Login Now</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
}

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
        marginTop: -20,
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
        height: 50,
        width: '100%',
        borderColor: Colors.defaultColorLight,
        borderWidth: 1.5,
        marginBottom: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    pickerContainer: {
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        width: ITEM_WIDTH,
        height: 53,
        marginBottom: 10,
        borderColor: Colors.defaultColorLight,
    },

    headerText: {
        color: Colors.defaultWhite,
        marginBottom: 10,
        fontSize: 35,
        paddingHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'PoppinsBlack',
        textTransform: 'uppercase'
    },

    textWelcome: {
        color: 'white',
        fontSize: 18,
        letterSpacing: 5
    },

    buttonStyles: {
        backgroundColor: Colors.defaultColor,
        borderColor: Colors.defaultColorLight,
        borderWidth: 1.5,
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
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    imageContainer: {
        borderRadius: 10,
        borderColor: Colors.defaultColor,
        borderWidth: 1.5,
        overflow: 'hidden',
        justifyContent: 'center',
        borderStyle: 'dotted',
        marginTop: 10
    },
    keyboard: {
        flex: 1,
    },
});
