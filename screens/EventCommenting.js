import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Dimensions, KeyboardAvoidingView, Platform, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '../constants/Colors';
import Commenting from '../components/Commenting';
import persons from '../model/DashboardData';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.80);

export default function EventCommenting({ navigation, route }) {
  const { title, id } = route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [inputHeight, setInputHeight] = useState(50);
  const [image, setUserImage] = useState(null);
  const [data, setData] = useState(persons.slice(0, 2));
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
      setInputHeight(50);
    }
  };

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
      <Text allowFontScaling={false} style={styles.emptyText}>Be the first person to comment...</Text>
    </View>
  );

  // Refreshing the list when it about ending
  const onEndReached = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(persons);
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={84}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Commenting item={item} />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => { }} />
          }
          onEndReachedThreshold={0.1}
          onEndReached={onEndReached}
          contentContainerStyle={styles.commentsList}
        />
        <View style={styles.inputContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TextInput
            allowFontScaling={false}
            style={[styles.input, { height: inputHeight }]}
            numberOfLines={10}
            underlineColorAndroid="transparent"
            multiline={true}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={handleTextChange}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddComment}>
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
    justifyContent: 'center',
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
});
