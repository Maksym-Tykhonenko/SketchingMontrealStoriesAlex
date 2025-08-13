import { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MediumButton from '../components/MediumButton';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Onboard = () => {
  const [showButton, setShowButton] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 1400);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/images/onboardBg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Welcome to Sketching Montreal Stories
          </Text>
          <Text style={styles.subtitle}>
            Where lines become laughter, and the city becomes your canvas.
          </Text>
          <Text style={styles.additionalText}>
            {
              ' Draw with friends.\n Wander solo with a sketch.\nDiscover the heartbeat of Montreal'
            }
          </Text>

          {showButton && (
            <MediumButton
              title={'🎉 Let’s Begin'}
              onPress={() => navigation.replace('Home')}
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.09, padding: 24, alignItems: 'center' },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  additionalText: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default Onboard;
