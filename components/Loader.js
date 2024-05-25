
// Import React and Component
import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

const Loader = (props) => {
  const {loading, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
      <StatusBar style="auto" />
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color={Colors.defaultColor}
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000090',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    // backgroundColor: '#00000010',
    height: 80,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    // opacity: 0.9
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

