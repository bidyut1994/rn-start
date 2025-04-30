import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function Header({title}) {
  const navigation = useNavigation();
  return (
    <View style={Styles.headerContainer}>
      <Icon
        name="arrow-back"
        size={24}
        color="#000000"
        onPress={() => navigation.goBack()}
      />
      <Text style={Styles.headerText}>{title}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 35,
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
});
