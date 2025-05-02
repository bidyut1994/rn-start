import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function Header({title}) {
  const navigation = useNavigation();
  return (
    <View style={Styles.headerContainer}>
      <View style={Styles.leftContainer}>
        <Icon
          name="arrow-back"
          size={24}
          color="#000000"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={Styles.titleContainer}>
        <Text style={Styles.headerText}>{title}</Text>
      </View>
      <View style={Styles.rightContainer} />
    </View>
  );
}

const Styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 35,
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 5,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});
