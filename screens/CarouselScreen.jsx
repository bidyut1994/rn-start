import React from 'react';
import {View, Text, StatusBar, Platform} from 'react-native';

const CarouselScreen = ({navigation}) => {
  // Hide system UI when screen is focused

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>CarouselScreen</Text>
    </View>
  );
};

export default CarouselScreen;
