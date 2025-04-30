import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useRef} from 'react';
import Header from '../component/Header';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
  useAnimatedStyle,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
const {width: width100} = Dimensions.get('window');

export default function ScrollArticle() {
  return (
    <View style={{flex: 1}}>
      <View style={{zIndex: 100}}>
        <Header title="Scroll Article" />
      </View>
      <ArticleComponent
        imgSource={require('../assets/img/Frame4.png')}
        content={
          <View style={{backgroundColor: 'white', flex: 1, paddingBottom: 150}}>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: 'justify',
                fontSize: 28,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Article Scroll Component
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: 'justify',
                fontSize: 16,
                marginTop: 10,
              }}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: 'justify',
                fontSize: 16,
                marginTop: 10,
              }}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: 'justify',
                fontSize: 16,
                marginTop: 10,
              }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: 'justify',
                fontSize: 16,
                marginTop: 10,
              }}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </Text>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: 'justify',
                fontSize: 16,
                marginTop: 10,
              }}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'red',
    width: width100,
    height: 200,
    zIndex: 100,
  },
});

function ArticleComponent({imgSource, content}) {
  const scrollA = useAnimatedRef(Animated.ScrollView);
  const scrollOfset = useScrollViewOffset(scrollA);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      width: width100,
      top: 0,
      left: 0,
      right: 0,
      height: Math.max(300, 400 - scrollOfset.value),
      transform: [
        {
          translateY: interpolate(scrollOfset.value, [0, 300], [0, -100], {
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: Math.max(250, 400 - scrollOfset.value),
    };
  });

  return (
    <View style={{flex: 1, zIndex: -1}}>
      <View style={{flex: 1, position: 'relative'}}>
        <Animated.Image
          style={[styles.imageContainer, imageAnimatedStyle]}
          source={imgSource}
          resizeMode="cover"
        />
        <Animated.ScrollView
          scrollEventThrottle={16}
          ref={scrollA}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <Animated.View style={contentAnimatedStyle}>{content}</Animated.View>
        </Animated.ScrollView>
      </View>
    </View>
  );
}
