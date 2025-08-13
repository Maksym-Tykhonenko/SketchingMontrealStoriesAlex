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

import AppBackground from '../components/AppBackground';
import { articles } from '../data/articles';

const { height } = Dimensions.get('window');

const Articles = () => {
  const navigation = useNavigation();

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>📘 City Reads</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../assets/icons/close.png')} />
            </TouchableOpacity>
          </View>

          {articles.map((article, idx) => (
            <TouchableOpacity
              style={styles.articleContainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ArticleDetails', article)}
              key={idx}
            >
              <Image source={article.image} style={styles.image} />

              <Text style={styles.articleTitle}>{article.name}</Text>
              <Text style={styles.articleDescription} numberOfLines={2}>
                {article.description}
              </Text>
            </TouchableOpacity>
          ))}
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
    height: 206,
    borderRadius: 20,
    marginBottom: 8,
  },
});

export default Articles;
