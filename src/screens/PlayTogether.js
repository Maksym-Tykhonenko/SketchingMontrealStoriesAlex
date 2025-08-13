import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';

import MediumButton from '../components/MediumButton';
import AppBackground from '../components/AppBackground';
import { wordsPack } from '../data/words';
import { useStore } from '../store/context';

const { height } = Dimensions.get('window');

const PlayTogether = () => {
  const navigation = useNavigation();
  const [selectedTimeIdx, setSelectedTimeIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showSelectedWord, setShowSelectedWord] = useState(false);
  const [randomItem, setRandomItem] = useState('');
  const { setSelectedTime } = useStore();

  const filtered = wordsPack.find(words => {
    if (selectedCategory === 3) return words.id === 2;
    else return words.id === selectedCategory + 1;
  });

  const drawingTime = [60, 90, 120];

  const categories = [
    '🏙️ City & Places Inspired',
    '🎨 Pure Absurd Montreal Vibes',
    '🌃 Atmospheric / Dreamy',
    'Random',
  ];

  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * filtered.words.length);
    setRandomItem(filtered.words[randomIndex]);
  };

  const handleGoBack = () => {
    showSelectedWord ? setShowSelectedWord(false) : navigation.goBack();
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🖍️ Play Together</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleGoBack()}
            >
              <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>

          <View>
            {showSelectedWord ? (
              <View
                style={{
                  marginTop: height * 0.2,
                  marginBottom: height * 0.187,
                }}
              >
                <LinearGradient
                  style={styles.wordContainer}
                  colors={['#FB6029', '#FEAE06']}
                >
                  <Text style={styles.wordText}>{randomItem}</Text>
                </LinearGradient>
              </View>
            ) : (
              <View>
                <Text style={styles.subtitle}>
                  One player draws while the others try to guess the word. Don’t
                  use letters or numbers in your drawing. You’ll have limited
                  time, so draw fast! Players take turns — and the fun keeps
                  going.
                </Text>
                <Text style={styles.sectionTitle}>Drawing time</Text>
                <View style={styles.buttonsWrap}>
                  {drawingTime.map((time, idx) => (
                    <TouchableOpacity
                      style={{ width: '32%' }}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelectedTimeIdx(idx), setSelectedTime(time);
                      }}
                      key={idx}
                    >
                      <LinearGradient
                        colors={
                          selectedTimeIdx === idx
                            ? ['#FB6029', '#FEAE06']
                            : ['#073B53', '#073B53']
                        }
                        style={styles.gradientButton}
                      >
                        <Text style={styles.timeText}>{time} sec</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.sectionTitle}>Choose a word pack:</Text>
                <View style={{ gap: 4, marginBottom: height * 0.135 }}>
                  {categories.map((category, idx) => (
                    <TouchableOpacity
                      style={{ width: '100%' }}
                      activeOpacity={0.7}
                      onPress={() => setSelectedCategory(idx)}
                      key={idx}
                    >
                      <LinearGradient
                        colors={
                          selectedCategory === idx
                            ? ['#FB6029', '#FEAE06']
                            : ['#073B53', '#073B53']
                        }
                        style={styles.gradientButton}
                      >
                        <Text style={styles.timeText}>{category}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {showSelectedWord && (
              <View style={{ alignItems: 'center', marginBottom: 24 }}>
                <TouchableOpacity
                  style={styles.transparentBtn}
                  activeOpacity={0.7}
                  onPress={() => getRandomItem()}
                >
                  <Text style={styles.buttonText}>Сhange the Word</Text>
                </TouchableOpacity>
              </View>
            )}

            <MediumButton
              title={'Next'}
              onPress={() => {
                if (showSelectedWord) navigation.navigate('Game', randomItem);
                setShowSelectedWord(true);
                getRandomItem();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.09, padding: 24 },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    marginBottom: 24,
  },

  articleDescription: {
    fontWeight: '300',
    fontSize: 12,
    color: '#C6C6C6',
    marginBottom: 24,
    width: '95%',
  },
  image: {
    width: '100%',
    height: 248,
    borderRadius: 20,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gradientButton: {
    height: 43,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
  buttonsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timeText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
  },
  wordContainer: {
    width: '100%',
    borderRadius: 40,
    height: 174,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordText: {
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
  },
});

export default PlayTogether;
