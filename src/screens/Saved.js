import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import { useCallback } from 'react';

import AppBackground from '../components/AppBackground';
import { useStore } from '../store/context';

const { height } = Dimensions.get('window');

const Saved = () => {
  const { savedDrawings, fetchDrawings, removeDrawing } = useStore();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      fetchDrawings();
    }, []),
  );

  const showConfirm = selectedDrawing => {
    console.log('selectedDrawing', selectedDrawing);

    Alert.alert(
      'Delete This Drawing?',
      'Are you sure you want to delete this masterpiece? This action cannot be undone!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            removeDrawing(selectedDrawing);
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🖼️ My Drawings</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>

          {savedDrawings.length === 0 && (
            <View style={{ alignItems: 'center', marginTop: height * 0.19 }}>
              <Image source={require('../assets/images/emptyScreen.png')} />
              <Text style={styles.emptyScreenTitle}>🖼️ No Drawings Yet</Text>
              <Text style={styles.emptyScreenSubtitle}>
                Your sketchbook is still waiting for its first story. Start
                drawing — solo or with friends — and your creations will appear
                here.
              </Text>
            </View>
          )}

          <View style={styles.wrapper}>
            {savedDrawings.map((drawingPaths, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={() => showConfirm(drawingPaths.id)}
                key={index}
                style={styles.thumbnail}
              >
                <Svg width="100%" height="100%" viewBox="-150 100 600 350">
                  {drawingPaths.paths?.map((d, i) => (
                    <Path
                      key={i}
                      d={d}
                      stroke="red"
                      strokeWidth={2}
                      fill="none"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  ))}
                </Svg>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('DrawDetails', drawingPaths)
                  }
                >
                  <LinearGradient
                    colors={['#FB6029', '#FEAE06']}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.btnText}>
                      {drawingPaths.selectedWord}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
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
    textAlign: 'center',
    marginBottom: 6,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gradientButton: {
    width: '100%',
    height: 58,
    position: 'absolute',
    top: -50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  thumbnail: {
    width: '48%',
    height: 248,
    borderWidth: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 30,
  },
  emptyScreenSubtitle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    marginVertical: 16,
  },
  emptyScreenTitle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Saved;
