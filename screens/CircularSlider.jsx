import {
  View,
  Image,
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../component/Header';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  runOnJS,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
const images = [
  require('../assets/img/Frame4.png'),
  require('../assets/img/Frame2.png'),
  require('../assets/img/Frame3.png'),

  require('../assets/img/Frame5.png'),
  require('../assets/img/Frame6.png'),
  require('../assets/img/Frame7.png'),
];

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const _itemSize = screenWidth * 0.2;
const _spacing = 5;
const _itemTotalSize = _itemSize + _spacing;

function CauouselItem({item, index, scrollX}) {
  const stylez = useAnimatedStyle(() => {
    return {
      borderWidth: 4,
      borderRadius: _itemSize,
      overflow: 'hidden',
      borderColor: interpolateColor(
        scrollX.value,
        [index - 0.5, index, index + 0.5],
        ['transparent', 'white', 'transparent'],
      ),
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3],
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[stylez, {width: _itemSize, height: _itemSize}]}>
      <Image
        source={item}
        style={{
          flex: 1,
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2 - 3,
        }}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

export default function CircularSlider() {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x / _itemTotalSize;
      const newActiveIndex = Math.round(scrollX.value);
      if (newActiveIndex !== activeIndex) {
        runOnJS(setActiveIndex)(newActiveIndex);
      }
    },
  });

  return (
    <View style={{flex: 1}}>
      <Header title="Circular Slider" />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <Animated.Image
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            key={`image-${activeIndex}`}
            source={images[activeIndex]}
            style={{flex: 1, width: screenWidth, height: screenWidth}}
            resizeMode="cover"
          />
        </View>
        <Animated.FlatList
          style={{flexGrow: 0, height: _itemSize * 2, paddingBottom: _itemSize}}
          data={images}
          contentContainerStyle={{
            paddingHorizontal: (screenWidth - _itemSize) / 2,
            gap: _spacing,
          }}
          renderItem={({item, index}) => {
            return <CauouselItem item={item} index={index} scrollX={scrollX} />;
          }}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          snapToInterval={_itemTotalSize}
          decelerationRate="fast"
        />
      </View>
    </View>
  );
}
