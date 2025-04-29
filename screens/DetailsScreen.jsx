import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function DetailsScreen() {
  return (
    <View style={Styles.container}>
      <Text> Details Screen </Text>
      {/* <Text>DetailsScreen</Text>
    
      <Text>{title}</Text> */}
      {/* <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="setParams"
        onPress={() =>
          navigation.setParams({name: 'John Doe 111', title: 'abc 111'})
        }
      />{' '}
      <Button
        title="setParams back home"
        onPress={() =>
          navigation.navigate('Home', {
            name: 'John Doe 111',
            title: 'abc 111',
          })
        }
      /> */}
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
