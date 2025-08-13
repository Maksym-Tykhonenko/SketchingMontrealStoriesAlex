import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { PanResponder } from 'react-native';
import Slider from '@react-native-community/slider';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

import { useStore } from '../store/context';
import AppBackground from '../components/AppBackground';

const { height } = Dimensions.get('window');

export default function Canvas({ route }) {
  const [paths, setPaths] = useState([]);
  const { saveDrawing } = useStore();
  const currentPath = useRef('');
  const [opacity, setOpacity] = useState(1);
  const selectedImage = route.params;
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
    }, []),
  );

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

    const newDrawing = { paths, selectedWord: 'Draw', id: Date.now() };

    saveDrawing(newDrawing);
    setPaths([]);
  };

  const showConfirm = () => {
    Alert.alert(
      'Leave Drawing?',
      `Your sketch will be lost if you exit now.`,
      [
        {
          text: 'Stay',
          style: 'cancel',
        },
        {
          text: 'Leave',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
  };

  const handleGoBack = () => {
    paths.length !== 0 ? showConfirm() : navigation.goBack();
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleSaveDrawing}>
            <Image source={require('../assets/images/components/save.png')} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
            <Image source={require('../assets/icons/close.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.drawContainer}>
          <View style={styles.drawingArea} {...panResponder.panHandlers}>
            <Image
              source={selectedImage.image}
              style={[styles.backgroundImage, { opacity }]}
              resizeMode="cover"
            />

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
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity activeOpacity={0.7} onPress={undoLast}>
              <Image source={require('../assets/icons/back.png')} />
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={opacity}
              onValueChange={value => setOpacity(value)}
              minimumTrackTintColor="#FB6029"
              maximumTrackTintColor="#fff"
              thumbTintColor="#fff"
              thumbImage={require('../assets/icons/thumb.png')}
            />
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
    marginBottom: 27,
  },
  drawContainer: {
    height: '80%',
  },
  drawingArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderRadius: 12,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    opacity: 0.5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 44,
    alignItems: 'center',
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'flex-start',
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  slider: {
    width: '80%',
    height: 40,
  },
});
