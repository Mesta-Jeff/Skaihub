import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Avatar} from 'react-native-paper';


export default function Tickets({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', top: -5, position: 'absolute'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'silver', marginLeft: 20}} />
            <View>
                <Text style={{textAlign: 'center', color: 'silver', marginRight: 5, marginLeft: 5}}>Grab Your Ticket</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'silver', marginRight: 20}} />
        </View>

        <Avatar.Text size={44} label="XD" />
        <Avatar.Icon size={84} icon="folder" />
      <Text>This is the Ticket Page</Text>
      <FontAwesome style={styles.icos} size={28} name="star" color='red' />
      <Button title="Go Next >>" onPress={() => navigation.navigate('Landing')} allowFontScaling={false} />
      
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

  icos: {

    marginVertical: 20
  }
  

});