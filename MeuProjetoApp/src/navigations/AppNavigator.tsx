import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import RegisterScreen from './screens/RegisterScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Inicio'}}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{title: 'Detalhes'}} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Cadastro'}} />
    </Stack.Navigator>
  );
}
