import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Dimensions, KeyboardAvoidingView, Platform, Image, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BASE_URL } from '../constants/Var';
import Colors from '../constants/Colors';
import Commenting from '../components/Commenting';
import InnerLoad from '../components/InnerLoad.js'



export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

export default function EventCommenting({ navigation, route }) {
  const { title, id } = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [inputHeight, setInputHeight] = useState(50);
  const [image, setUserImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [innerloading, setInnerLoading] = useState(false);


  // gETTING THE USERinfo from the async storage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          const user = JSON.parse(userData);
          setUserImage(user.image);
        }
      } catch (error) {
        console.error('Failed to retrieve user data:', error);
      }
    };

    fetchUserData();
  }, []);


  // Getting the list comments from the api
  const fetchComment = async () => {
    const userData = await AsyncStorage.getItem('user');
    const { token, api_key, api_token, user_key, } = JSON.parse(userData);

    const url = `${BASE_URL}/events/comments?event_id=${id}`;
    setInnerLoading(true);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ApiKey': api_key,
          'ApiToken': api_token,
          'UserKey': user_key,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (!Array.isArray(responseData.data)) {
        throw new Error('API response data is not an array');
      }

      setComments([]);
      setComments(responseData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Request Failed', 'Check your internet connection, request for data failed');
    } finally {
      setInnerLoading(false);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);


  // Making API Request that some is staring event
  const sendComment = async () => {
    try {
      const url = `${BASE_URL}/events/someone-commenting`;
      const userData = await AsyncStorage.getItem('user');
      const { token, api_key, api_token, user_key, user_id } = JSON.parse(userData);

      const body = {
        event_id: id,
        user_id: user_id,
        comment: comment
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
        const responseJson = await response.json();
        console.log('Response Data:', responseJson.message);
        setComment('');
        fetchComment();
      } else {
        const errorResponse = await response.json();
        Alert.alert('Attention!!!', errorResponse.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // Text Change event for the text box
  const handleTextChange = (text) => {
    setComment(text);
    if (text.length < 2) {
      setInputHeight(50);
    } else {
      setInputHeight(100);
    }
  };

  // When the comment is empty
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text allowFontScaling={false} style={styles.emptyText}>Be the first person to comment... </Text>
    </View>
  );


  // Handle refresh of comments list
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchComment();
    setRefreshing(false);
  };


  const handleStatusClick = (person, action, commentId) => {
    Alert.alert('Attention Please!!!', `${person} said, you cannot perform ${action} to this comment`);
    
  };
  


  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.headerCount} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">
        {comments.length} Comment(S) counted so far
      </Text>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={84}>

        {innerloading ? (
          <InnerLoad loading={innerloading} />
        ) : (
          <>
            <FlatList
              data={comments}
              renderItem={({ item, index }) => (
                <Commenting key={item.id.toString() + index.toString()} item={item}  onPress={handleStatusClick}/>
              )}
              keyExtractor={(item, index) => item.id.toString() + index.toString()}
              ListEmptyComponent={renderEmptyComponent}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
              contentContainerStyle={styles.commentsList}
            />


          </>
        )}

        <View style={styles.inputContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TextInput allowFontScaling={false}
            style={[styles.input, { height: inputHeight }]} numberOfLines={10} underlineColorAndroid="transparent" multiline={true}
            placeholder="Add a comment..." value={comment} onChangeText={handleTextChange}
          />
          <TouchableOpacity style={styles.button} onPress={sendComment}>
            <FontAwesome size={20} name="send" color={Colors.defaultWhite} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    alignItems: 'stretch',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderColor: Colors.defaultSilver,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  commentsList: {
    flexGrow: 1,
    // justifyContent: 'center',
    
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: Colors.defaultColor,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: Colors.defaultSilver,
    fontStyle: 'italic',
  },
  headerCount: {
    fontSize: 16, 
    fontFamily: 'BarlowBold', 
    color: Colors.defaultColorLight,
    marginTop: -6, 
    marginLeft: 30, 
    letterSpacing: 2
  }
});
