import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native';
import MediumButton from '../components/MediumButton';
import { useNavigation } from '@react-navigation/native';
import AppBackground from '../components/AppBackground';
import React, { useEffect, useRef, useState } from 'react';

const { height } = Dimensions.get('window');

const Loader = () => {
  const [showImage, setShowImage] = useState(false);
  const navigation = useNavigation();

  // анімаційні значення
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current; // трохи нижче старт
  const scale = useRef(new Animated.Value(0.96)).current; // легкий зум-ін

  useEffect(() => {
    const t = setTimeout(() => setShowImage(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showImage) return;

    // Плавна поява
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Після появи запускаємо нескінченний стрибок кожні 2 сек
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -80,
            duration: 160,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            bounciness: 12,
            speed: 10,
            useNativeDriver: true,
          }),
          Animated.delay(800), // пауза між стрибками
        ]),
      ).start();
    });
  }, [showImage, opacity, translateY, scale]);

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {showImage && (
            <Animated.Image
              source={require('../assets/images/home.png')}
              style={{
                opacity,
                transform: [{ translateY }, { scale }],
              }}
              resizeMode="contain"
            />
          )}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.15, padding: 24, alignItems: 'center' },
});

export default Loader;
