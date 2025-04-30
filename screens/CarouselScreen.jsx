import React from 'react';
import {View, Text, StatusBar, Image} from 'react-native';
import {Marquee} from '@animatereactnative/marquee';
import Header from '../component/Header';

const images = [
  require('../assets/img/Frame2.png'),
  require('../assets/img/Frame3.png'),
  require('../assets/img/Frame4.png'),
  require('../assets/img/Frame5.png'),
  require('../assets/img/Frame6.png'),
  require('../assets/img/Frame7.png'),
];

function Item({image, index}) {
  return (
    <View style={{marginHorizontal: 10}}>
      <Image
        source={image}
        style={{width: 220, height: 350, borderRadius: 5}}
      />
      <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        {index}
      </Text>
    </View>
  );
}

const CarouselScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header title="Carousel Screen using Marquee" />
      <View style={{flex: 1, marginTop: 100}}>
        <Text style={{fontSize: 18, marginBottom: 20, textAlign: 'center'}}>
          Carousel Screen using Marquee
        </Text>
        <Marquee style={{height: 200}} autoPlay={true} speed={1}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {images.map((image, index) => (
              <Item key={`image-${index}`} image={image} index={index} />
            ))}
          </View>
        </Marquee>
      </View>
    </View>
  );
};

export default CarouselScreen;
