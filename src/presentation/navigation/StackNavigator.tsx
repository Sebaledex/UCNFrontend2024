import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductScreen } from '../screens/product/ProductScreen';
import { CheckingScreen } from '../screens/auth/CheckingScreen';
import { QuestionScreen } from '../screens/product/QuestionScreen';
import { QuestionDetailScreen } from '../screens/product/QuestionDetailScreen';
import { TokensScreen } from '../store/TokensScreen';


export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  CheckingScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: undefined;
  QuestionScreen: undefined;
  QuestionDetailScreen: { id: string };
  TokensScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>(); // Especifica RootStackParams aquí

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CheckingScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="CheckingScreen"
        component={CheckingScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="QuestionScreen"
        component={QuestionScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="QuestionDetailScreen"
        component={QuestionDetailScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="TokensScreen"
        component={TokensScreen}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
