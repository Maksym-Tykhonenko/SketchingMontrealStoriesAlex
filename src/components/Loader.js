import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import MediumButton from '../components/MediumButton';
import { useNavigation } from '@react-navigation/native';
import AppBackground from '../components/AppBackground';
import { useEffect, useState } from 'react';

const { height } = Dimensions.get('window');

const Loader = () => {
  const [showImage, setShowImage] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setShowImage(true);
    }, 1500);
  }, []);

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {showImage && <Image source={require('../assets/images/home.png')} />}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.15, padding: 24, alignItems: 'center' },
});

export default Loader;
