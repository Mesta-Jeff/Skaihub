import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { RefreshControl } from 'react-native';

import Colors from '../constants/Colors';

import NotificationCard from '../components/DashboardCardView';
import persons from '../model/DashboardData';
import DashboardAds from '../components/DashboardAds';

export default function Dashboard({ navigation }) {

  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "#E8E8E8", marginHorizontal: 10 }} />;
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  const [data, setData] = useState(persons.slice(0, 2));
  const [refreshing, setRefreshing] = useState(false);

  const onEndReached = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(persons);
      setRefreshing(false);
    }, 1000);
  };


  const handlePress = (title, id) => {
    navigation.navigate('DashboardNoticeDetails', { title, id });
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
      style={styles.flat}
        data={data}
        renderItem={({ item }) => (
           <NotificationCard item={item} onPress={handlePress} />
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListFooterComponent={() => (
          <Text 
            style={{ 
              fontSize: 22, 
              textAlign: "center", 
              marginBottom: 20, 
              fontWeight: 'bold', 
              color: Colors.defaultSilver }}>Loading More...</Text>
        )}
        ListHeaderComponent={() => (
          <DashboardAds />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
        onEndReachedThreshold={0.1}
        onEndReached={onEndReached}
        stickyHeaderIndices={[0]}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.defaultWhite,
    alignItems: 'stretch',
    padding: 10,
  },

  flat: {
    marginTop: -2,
    marginLeft: -9,
  },

});
