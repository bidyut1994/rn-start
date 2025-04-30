import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {screenList} from '../App';

export default function HomeScreen({navigation, route}) {
  return (
    <View style={Styles.container}>
      <View style={{alignItems: 'center', marginBottom: 20}}>
        <Icon name="accessibility" size={32} color="#000000" />
        <Text>Home Screen</Text>
      </View>
      <View style={{marginTop: 20, width: '100%', gap: 10, padding: 20}}>
        {screenList.map((screen, index) => (
          <Pressable
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 16,
              backgroundColor: '#F1EFEC',
              borderRadius: 5,
              width: '100%',
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate(screen.name)}>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'left',
              }}>
              {screen.title}
            </Text>
            <Icon name="chevron-forward" size={24} color="#000000" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
});
