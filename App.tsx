import './gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Image, Text, View, StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import CarouselScreen from './screens/CarouselScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://example.com/profile-pic.png'}}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>User Name</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// Nested navigator for screens that need back button
function MainStack({navigation}: {navigation: any}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="black"
              style={{marginRight: 20}}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Carousel1" component={CarouselScreen} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={() => ({
          drawerActiveTintColor: '#e91e63',
          drawerInactiveTintColor: '#34495e',
          drawerStyle: {
            borderRadius: 5,
          },
          drawerContentStyle: {
            backgroundColor: '#c6cbef',
          },
        })}>
        <Drawer.Screen
          options={{headerShown: false}}
          name="Home"
          component={MainStack}
        />
        <Drawer.Screen
          name="Details"
          component={DetailsScreen}
          options={({navigation}) => ({
            headerLeft: () => (
              <Icon
                style={{marginHorizontal: 20}}
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="black"
              />
            ),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
