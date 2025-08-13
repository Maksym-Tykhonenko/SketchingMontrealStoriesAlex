import { createStackNavigator } from '@react-navigation/stack';
import Onboard from '../screens/Onboard';
import Home from '../screens/Home';
import Articles from '../screens/Articles';
import ArticleDetails from '../screens/ArticleDetails';
import Draw from '../screens/Draw';
import Canvas from '../screens/Canvas';
import Saved from '../screens/Saved';
import DrawDetails from '../screens/DrawDetails';
import PlayTogether from '../screens/PlayTogether';
import Game from '../screens/Game';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Articles" component={Articles} />
      <Stack.Screen name="ArticleDetails" component={ArticleDetails} />
      <Stack.Screen name="Draw" component={Draw} />
      <Stack.Screen name="Canvas" component={Canvas} />
      <Stack.Screen name="Saved" component={Saved} />
      <Stack.Screen name="DrawDetails" component={DrawDetails} />
      <Stack.Screen name="PlayTogether" component={PlayTogether} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
