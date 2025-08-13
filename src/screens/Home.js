import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MediumButton from '../components/MediumButton';
import AppBackground from '../components/AppBackground';

const { height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ left: '11%' }}>
            <Image source={require('../assets/images/home.png')} />
          </View>

          <MediumButton
            title={'🖍️ Play Together'}
            onPress={() => navigation.navigate('PlayTogether')}
          />
          <MediumButton
            title={'🎨 Just Me & the City'}
            onPress={() => navigation.navigate('Draw')}
          />
          <MediumButton
            title={'📘 City Reads'}
            onPress={() => navigation.navigate('Articles')}
          />
          <MediumButton
            title={'🖼️ My Drawings'}
            onPress={() => navigation.navigate('Saved')}
          />
        </View>
      </ScrollView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.115, padding: 24, alignItems: 'center' },
});

export default Home;
