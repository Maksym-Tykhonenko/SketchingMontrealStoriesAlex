import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppBackground from '../components/AppBackground';

const { height } = Dimensions.get('window');

const ArticleDetails = ({ route }) => {
  const navigation = useNavigation();
  const { image, description, name } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${name}
${description}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleShare}>
              <Image source={require('../assets/icons/share.png')} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.articleContainer}>
            <Image source={image} style={styles.image} />

            <Text style={styles.articleTitle}>{name}</Text>
            <Text style={styles.articleDescription}>{description}</Text>
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
  articleTitle: {
    fontWeight: '500',
    fontSize: 24,
    color: '#fff',
    marginBottom: 12,
  },
  articleDescription: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 345,
    borderRadius: 20,
    marginBottom: 8,
  },
});

export default ArticleDetails;
