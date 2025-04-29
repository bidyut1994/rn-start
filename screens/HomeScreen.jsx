import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({navigation, route}) {
  return (
    <View style={Styles.container}>
      <Icon name="accessibility" size={32} color="#000000" />
      <Text>HomeScreen</Text>
      <Text>{route.params?.title}</Text>
      <Button
        title="Go to Carousel1"
        onPress={() => navigation.navigate('Carousel1')}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
