import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, Button, StatusBar, TouchableOpacity } from 'react-native';
import { CameraView, Camera } from "expo-camera/next";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.79);

export default function Scan({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScanData(data);
    // alert(`Final Result: ${data}`);

  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting for Camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Camera to Access</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerBar}>
        <Text style={styles.cardTitle} allowFontScaling={false} numberOfLines={2} ellipsizeMode="tail">
        {scanned && scanData ? scanData : "..."}
        </Text>
      </View>

      <View style={styles.cameraHolder}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            // barcodeTypes: ["qr", "pdf417"],
          }}
          style={styles.camera}
        />
      </View>

      {scanned && (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sync User</Text>
              <FontAwesome style={styles.ico} name="database" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Verify</Text>
              <FontAwesome style={styles.ico} name="user" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.scanButton} onPress={() => setScanned(false)}>
            <Text style={styles.scanText}>Rescan</Text>
            <FontAwesome style={{ marginHorizontal: 10, color: '#008080' }} size={20} name="refresh" />
          </TouchableOpacity>

        </View>

      )}
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
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    margin: 10,
    textAlign: 'center',
    color: '#008080',
  },
  headerBar: {
    flexDirection: 'row',
    width: ITEM_WIDTH,
    height: 100,
    marginVertical: 15,
    borderRadius: 10,
    borderColor: 'silver',
    borderWidth: 2,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderStyle: 'dotted',
  },
  bottomBar: {
    flexDirection: 'row',
    width: ITEM_WIDTH,
    height: 100,
    marginVertical: 15,
    borderRadius: 10,
    borderColor: '#008080',
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderStyle: 'dotted',
  },
  button: {
    backgroundColor: '#008080',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    flexDirection: 'row'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: '#008080',
    borderWidth: 2,
  },
  scanText: {
    color: '#008080',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    // borderRadius: 20,
    width: ITEM_WIDTH,
  },
  cameraHolder: {
    width: ITEM_WIDTH,
    height: 350,
    borderRadius: 10,
    borderColor: '#008080',
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    borderStyle: 'dotted',
  },
  ico: {
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 10
  },
});
