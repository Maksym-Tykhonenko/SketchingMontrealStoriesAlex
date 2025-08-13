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

import AppBackground from '../components/AppBackground';
import { cities } from '../data/cities';

const { height } = Dimensions.get('window');

const Draw = () => {
  const navigation = useNavigation();

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>🎨 Just Me & the City</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            {cities.map((city, idx) => (
              <View style={styles.citiesWrap} key={idx}>
                <Image source={city.image} style={styles.image} />
                <TouchableOpacity
                  style={{}}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Canvas', city)}
                >
                  <LinearGradient
                    colors={['#FB6029', '#FEAE06']}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.btnText}>Draw</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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
  articleTitle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    marginBottom: 2,
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
  },
  citiesWrap: { width: '48%', height: 248, marginBottom: 45 },
});

export default Draw;
