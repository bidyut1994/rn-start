import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {FlatList} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Header from '../component/Header';
import LinearGradient from 'react-native-linear-gradient';
const {width} = Dimensions.get('window');
const ITEM_WIDTH = 200;

const images = [
  require('../assets/img/Frame2.png'),
  require('../assets/img/Frame3.png'),
  require('../assets/img/Frame4.png'),
  require('../assets/img/Frame5.png'),
  require('../assets/img/Frame6.png'),
  require('../assets/img/Frame7.png'),
];

export default function CarouselScreen1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / ITEM_WIDTH);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
    setActiveIndex(index);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <LinearGradient
        colors={['#8E7DBE', '#6495ED', '#4682B4']}
        style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.headerWrapper}>
          <Header title="Carousel Using FlatList" transparent={true} />
        </View>
        <View style={{flex: 1, marginTop: 20}}>
          <Text style={styles.titleText}>Image Gallery</Text>
          <View style={{marginTop: 20, marginLeft: 15}}>
            <FlatList
              ref={flatListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={images}
              renderItem={({item}) => (
                <View style={styles.imageContainer}>
                  <Image source={item} style={styles.carouselImage} />
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              snapToInterval={ITEM_WIDTH + 20}
              decelerationRate="fast"
              snapToAlignment="start"
            />
          </View>

          <View style={styles.paginationContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeIndex ? styles.paginationDotActive : {},
                ]}
                onPress={() => scrollToIndex(index)}
              />
            ))}
          </View>
        </View>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 70,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  imageContainer: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carouselImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    margin: 5,
  },
  paginationDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
});
