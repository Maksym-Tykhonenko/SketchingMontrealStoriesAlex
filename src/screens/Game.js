import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PanResponder } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import Orientation from 'react-native-orientation-locker';

import { useStore } from '../store/context';
import MediumButton from '../components/MediumButton';
import AppBackground from '../components/AppBackground';

const { height } = Dimensions.get('window');

export default function Game({ route }) {
  const [paths, setPaths] = useState([]);
  const { selectedTime, saveDrawing } = useStore();
  const currentPath = useRef('');
  const viewShotRef = useRef(null);
  const [isRunning, setIsRunning] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const intervalRef = useRef(null);
  const navigation = useNavigation();
  const selectedWord = route.params;
  const [seconds, setSeconds] = useState(selectedTime);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
    }, []),
  );

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    showConfirm();
  };

  const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { moveX, moveY } = gestureState;
      currentPath.current += `L${moveX},${moveY} `;
      setPaths(prev => [...prev.slice(0, -1), currentPath.current]);
    },
    onPanResponderGrant: evt => {
      const { locationX, locationY } = evt.nativeEvent;
      currentPath.current = `M${locationX},${locationY} `;
      setPaths(prev => [...prev, currentPath.current]);
    },
    onPanResponderRelease: () => {},
  });

  const undoLast = () => {
    setPaths(prev => prev.slice(0, -1));
  };

  const handleSaveDrawing = () => {
    if (paths.length === 0) return;

    const newDrawing = { paths, selectedWord, id: Date.now() };
    saveDrawing(newDrawing);
    setPaths([]);
  };

  const showConfirm = () => {
    Alert.alert(
      'Game Paused',
      `Take a breather, grab a snack, or plan your next masterpiece. We’ll be right here when you're ready to jump back in.`,
      [
        {
          text: 'Resume',
          onPress: () => {
            setIsRunning(true);
          },
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
  };

  const captureAndShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();

      const shareOptions = {
        title: 'Share Drawing',
        url: uri,
        type: 'image/png',
      };
      await Share.open(shareOptions);
    } catch (error) {
      if (error.message === 'User did not share') {
        console.log('Share canceled by user');
      } else {
        console.error('error', error);
      }
    }
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={[styles.header, !showAnswer && { marginBottom: 27 }]}>
          {showAnswer ? (
            <>
              <View style={styles.headWrap}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleSaveDrawing}
                >
                  <Image
                    source={require('../assets/images/components/save.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={captureAndShare}>
                  <Image source={require('../assets/icons/share.png')} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity activeOpacity={0.7} onPress={toggleTimer}>
                <Image source={require('../assets/icons/pause.png')} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.timer}>{formatTime(seconds)}</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={toggleTimer}>
                <Image source={require('../assets/icons/pause.png')} />
              </TouchableOpacity>
            </>
          )}
        </View>

        {showAnswer && (
          <TouchableOpacity
            style={{ width: '100%', top: 30, zIndex: 20 }}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#FB6029', '#FEAE06']}
              style={styles.gradientButton}
            >
              <Text style={styles.gradButtonText}>{selectedWord}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        <View style={styles.drawContainer}>
          <View style={styles.drawingArea} {...panResponder.panHandlers}>
            <ViewShot
              ref={viewShotRef}
              options={{ format: 'png', quality: 1.0, result: 'tmpfile' }}
              style={{ flex: 1 }}
            >
              <Svg style={StyleSheet.absoluteFill}>
                {paths.map((d, index) => (
                  <Path
                    key={index}
                    d={d}
                    stroke="#FF5F29"
                    strokeWidth={3}
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                ))}
              </Svg>
            </ViewShot>
          </View>
          <View style={styles.buttons}>
            {showAnswer && (
              <MediumButton
                title={'Next Word'}
                style={{ position: 'absolute', top: -83 }}
                onPress={() => navigation.goBack()}
              />
            )}

            {seconds === 0 ? (
              <View style={{ alignSelf: 'center' }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    showAnswer ? navigation.goBack() : setShowAnswer(true);
                  }}
                >
                  <Text style={styles.answerButton}>
                    {showAnswer ? 'Menu' : 'Show Answer'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ alignSelf: 'flex-start' }}>
                <TouchableOpacity activeOpacity={0.7} onPress={undoLast}>
                  <Image source={require('../assets/icons/back.png')} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.08,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headWrap: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  drawContainer: {
    height: '80%',
  },
  drawingArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderRadius: 12,
  },
  buttons: {
    marginTop: 44,
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
  },
  timer: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  answerButton: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  gradientButton: {
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
  gradButtonText: {
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
    width: '90%',
    textAlign: 'center',
  },
});
