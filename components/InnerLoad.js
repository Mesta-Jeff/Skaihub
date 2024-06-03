

// Import React and Component
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import Colors from '../constants/Colors';

const InnerLoad = (props) => {
  const { loading, ...attributes } = props;

  return (
    <View style={styles.activityIndicatorWrapper}>
      <ActivityIndicator
        animating={true}
        color={Colors.defaultColor}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default InnerLoad;

const styles = StyleSheet.create({

  activityIndicatorWrapper: {
    backgroundColor: Colors.defaultw,
    height: 80,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});

