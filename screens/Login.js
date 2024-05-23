
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert,} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { StatusBar } from 'expo-status-bar';


export default function Login({ navigation })  {
    
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handlePress = () => {
    // if (!username || !age || !phone || !password || !gender) {
    //   Alert.alert('Skai Alert', 'Sorry error has been found, please all fields are requirede');
    //   return;
    // }
  
    setLoading(true);
  
    setTimeout(() => {
      setLoading(false);
      navigation.push('Home');
    }, 2000);
  
    console.log('Submitted:', { username, age, phone, password, gender });
  };
  

  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />

      <ScrollView style={styles.scrollStyle}>
        <View style={styles.innerContainer}>

          <Text allowFontScaling={false} style={styles.headerText}> This is SkaiMount Event Hub </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType='phone-pad'
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />


        <RNPickerSelect
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
          style={styles.pickers}
          placeholder={{ label: 'Select Gender', value: null }}
        />
            
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={handlePress}
            disabled={loading} >
            <Text allowFontScaling={false} style={styles.buttonText}>{loading ? 'Loading...' : 'Submit'}</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
  innerContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },

  pickers: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 0,
  },

  scrollStyle: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },

  input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  headerText: {
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 20,
    marginTop: 60,
    fontSize: 24,
    paddingHorizontal: 10,
    textAlign: 'center',
  },

  buttonStyles: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#008080',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    opacity: 0.5,
  },
  buttonText: {
    color: '#008080',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

