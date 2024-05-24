import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Image, Dimensions, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { BASE_URL, APP_NAME } from '../constants/Var';
import Colors from '../constants/Colors';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.78);

export default function CreateAccount({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDOB] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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


    const handlePress = () => {
        if (!email || !password) {
            Alert.alert('Skai Alert', 'Sorry, an error has been found. All fields are required.');
            return;
        }
        setLoading(true);
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaProvider style={styles.container}>
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

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter full name"
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter nickname"
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter email"
                                        keyboardType='email-address'
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter DOB"
                                        value={email}
                                        onChangeText={(text) => setEmail(text)}
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

                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter Phone number"
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
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                    />

                                    <View style={styles.imageContainer}>
                                        {image ? (
                                            <TouchableOpacity onPress={pickImage}>
                                                <Image source={{ uri: image }} style={styles.image} />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={pickImage}>
                                                <Image source={require('../assets/up5.png')} style={styles.image} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <Text style={{ color: Colors.defaultSilver }}>Click to upload profile picture</Text>

                                    <TouchableOpacity style={styles.buttonStyles} onPress={handlePress} disabled={loading}>
                                        <Text allowFontScaling={false} style={styles.buttonText}>{loading ? 'Please wait...' : 'Sign Up'}</Text>
                                    </TouchableOpacity>

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
    },
    keyboard: {
        flex: 1,
    },
});
