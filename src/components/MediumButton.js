import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const MediumButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image source={require('../assets/images/components/mediumBtn.png')} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    position: 'absolute',
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MediumButton;
