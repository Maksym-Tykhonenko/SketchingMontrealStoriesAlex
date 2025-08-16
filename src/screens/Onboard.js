import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const onboardingImages = [
  require('../assets/images/onboardBg.png'),
  require('../assets/images/onboardBg.png'),
  require('../assets/images/onboardBg.png'),
  require('../assets/images/onboardBg.png'),
];

const onBoardTexts = [
  {
    title: 'Welcome to Sketching Montreal Stories',
    description:
      `Where lines become laughter, and the city becomes your canvas.\n` +
      `Draw with friends.\n` +
      `Wander solo with a sketch.\n` +
      `Discover the heartbeat of Montreal.`,
  },
  {
    title: 'Playful Sketch & Guess',
    description:
      `Take turns with friends on one device.\n` +
      `Sketch Montreal’s quirks.\n` +
      `Guess fast, laugh louder.`,
  },
  {
    title: 'Draw Your Own Montreal',
    description:
      `Slow down and sketch in peace.\n` +
      `Capture rooftops, rivers, and raccoons.\n` +
      `A calm canvas just for you.`,
  },
  {
    title: 'Stories in Every Line',
    description:
      `Discover Montreal beyond the sketch.\n` +
      `Read short tales of winters, lights, and rooftops.\n` +
      `Feel the city’s heartbeat in words.`,
  },
];

export default function Onboard({ navigation }) {
  const [screenIndex, setScreenIndex] = useState(0);

  const handleNext = () => {
    if (screenIndex < onboardingImages.length - 1) {
      setScreenIndex(s => s + 1);
    } else {
      navigation.navigate('Home');
    }
  };

  const t = onBoardTexts[screenIndex];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={onboardingImages[screenIndex]} style={styles.bg}>
        {/* затемнений шар для контрасту */}
        <View style={styles.overlay} />

        {/* текстова колонка */}
        <View style={styles.textWrap}>
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.desc}>{t.description}</Text>
        </View>

        {/* індикатори сторінок */}
        <View style={styles.dots}>
          {onBoardTexts.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === screenIndex && styles.dotActive]}
            />
          ))}
        </View>

        {/* кнопка */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cta}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>
              {screenIndex === onBoardTexts.length - 1 ? 'Start' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const TITLE_SIZE = Math.min(34, Math.max(28, width * 0.08));
const DESC_SIZE = Math.min(18, Math.max(16, width * 0.045));

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  textWrap: {
    paddingTop: 64,
    paddingHorizontal: 24,
    maxWidth: Math.min(620, width - 32),
  },
  title: {
    color: '#fff',
    fontSize: TITLE_SIZE,
    fontWeight: Platform.select({ ios: '700', android: '700' }),
    lineHeight: TITLE_SIZE * 1.15,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginBottom: 14,
  },
  desc: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: DESC_SIZE,
    lineHeight: DESC_SIZE * 1.4,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  dots: {
    position: 'absolute',
    bottom: 130,
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: { width: 22, backgroundColor: '#FFD054' },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cta: {
    width: Math.min(360, width - 48),
    paddingVertical: 16,
    backgroundColor: '#FFB500',
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  ctaText: {
    color: '#0D0F14',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
