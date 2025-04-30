import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {FlatList} from 'react-native';

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
    // Calculate active index based on scroll position
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
    <View style={{flex: 1, marginTop: 50}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        Carousel Using FlatList
      </Text>
      <View style={{marginTop: 20, marginLeft: 15}}>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({item}) => (
            <View style={{padding: 10}}>
              <Image
                source={item}
                style={{
                  width: 200,
                  height: 300,
                  borderRadius: 10,
                  padding: 10,
                  boxShadow: '0px 5px 5px 0px rgba(244, 221, 221, 0.5)',
                }}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToInterval={ITEM_WIDTH + 20} // Item width + padding
          decelerationRate="fast"
          snapToAlignment="start"
        />
      </View>

      {/* Pagination Dots */}
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
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 5,
  },
  paginationDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e91e63',
  },
});
