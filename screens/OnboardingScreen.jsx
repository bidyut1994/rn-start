import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';

import Header from '../component/Header';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to the app 1',
    description: 'This is the description of the first slide',
    image: require('../assets/img/onboading1.png'),
  },
  {
    id: '2',
    title: 'Welcome to the app 2',
    description: 'This is the description of the second slide',
    image: require('../assets/img/onboading2.png'),
  },
  {
    id: '3',
    title: 'Welcome to the app 3',
    description: 'This is the description of the third slide',
    image: require('../assets/img/onboading3.png'),
  },
];

function Slice({item}) {
  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
        }}>
        <Image
          source={item.image}
          style={{
            marginTop: 50,
            width: width * 0.8,
            height: 350,
            paddingHorizontal: 0,
            resizeMode: 'contain',
          }}
        />
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>{item.title}</Text>
        <Text style={{fontSize: 16, textAlign: 'center', marginTop: 20}}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  return (
    <View style={{flex: 1, backgroundColor: '#9EC6F3'}}>
      <Header title="Onboarding Screen" />
      <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <FlatList
            ref={slidesRef}
            pagingEnabled
            data={slides}
            renderItem={({item}) => <Slice item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={{height: 600}}
            showsHorizontalScrollIndicator={false}
            horizontal
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {slides.map((_, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor:
                      currentIndex === index ? '#179fe3' : '#ccc',
                    marginHorizontal: 8,
                  }}
                />
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginBottom: 70,
          }}>
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#fff',
                  borderRadius: 2,
                  width: '48%',
                  padding: 10,
                  alignItems: 'center',
                }}
                onPress={() => {
                  slidesRef.current.scrollToIndex({
                    index: slides.length - 1,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: '600',
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#179fe3',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 2,
                  width: '48%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  slidesRef.current.scrollToIndex({
                    index: currentIndex + 1,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: '600',
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: '#179fe3',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 2,
                alignSelf: 'center',
                width: '100%',
                alignItems: 'center',
              }}
              onPress={() => {
                console.log('Get Started');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: '600',
                }}>
                Get Started
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
