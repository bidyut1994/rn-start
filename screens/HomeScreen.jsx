import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {screenList} from '../App';

export default function HomeScreen({navigation, route}) {
  return (
    <View style={Styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={['#8E7DBE', '#7886C7', '#6495ED']}
        style={Styles.gradientBackground}>
        <View style={Styles.header}>
          <Icon name="layers" size={36} color="#FFFFFF" />
          <Text style={Styles.headerTitle}>React Native Demo</Text>
          <Text style={Styles.headerSubtitle}>Explore Component Examples</Text>
        </View>

        <ScrollView
          style={Styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={Styles.cardsContainer}>
            {screenList.map(
              (screen, index) =>
                screen.list && (
                  <TouchableOpacity
                    key={index}
                    style={Styles.card}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate(screen.name)}>
                    <View style={Styles.cardContent}>
                      <View style={Styles.cardIcon}>
                        <Icon
                          name={getIconName(screen.title)}
                          size={28}
                          color="#6495ED"
                        />
                      </View>
                      <View style={Styles.cardTextContainer}>
                        <Text style={Styles.cardTitle}>{screen.title}</Text>
                        <Text style={Styles.cardDescription}>
                          {getScreenDescription(screen.title)}
                        </Text>
                      </View>
                    </View>
                    <Icon name="chevron-forward" size={24} color="#8E7DBE" />
                  </TouchableOpacity>
                ),
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function getIconName(screenTitle) {
  const iconMap = {
    'Bottom Sheet': 'layers',
    'Infinity Scroll': 'infinite',
    'Form Handling': 'document-text',
    Maps: 'map',
    Camera: 'camera',
    'Local Authentication': 'finger-print',
    Share: 'share',
    Notifications: 'notifications',
    'Local Storage': 'save',
  };

  return iconMap[screenTitle] || 'apps';
}

function getScreenDescription(screenTitle) {
  const descriptionMap = {
    'Bottom Sheet': 'Modal interfaces from the bottom',
    'Infinity Scroll': 'Endless scrolling content',
    'Form Handling': 'Input validation and management',
    Maps: 'Location and mapping features',
    Camera: 'Camera integration',
    'Local Authentication': 'Secure device authentication',
    Share: 'Content sharing options',
    Notifications: 'Push and local alerts',
    'Local Storage': 'Persistent data storage',
  };

  return descriptionMap[screenTitle] || 'React Native component example';
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(100, 149, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});
