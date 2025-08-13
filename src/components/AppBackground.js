import { ImageBackground } from 'react-native';

const AppBackground = ({ children }) => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/images/bg.png')}
    >
      {children}
    </ImageBackground>
  );
};

export default AppBackground;
