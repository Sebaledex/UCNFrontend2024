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
import { AnswerAllScreen } from '../screens/product/AnswerAllScreen';
import { QuestionRecordScreen } from '../screens/product/QuestionRecordScreen';
import { QuestionRecordDetailScreen } from '../screens/product/QuestionRecordDetailScreen';
import CheckBiometry from '../screens/product/CheckBiometry';

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
  AnswerAllScreen: undefined;
  QuestionRecordScreen: undefined;
  QuestionRecordDetailScreen: { id: string };
  CheckBiometry: undefined;
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
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="AnswerAllScreen"
        component={AnswerAllScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="QuestionRecordScreen"
        component={QuestionRecordScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="QuestionRecordDetailScreen"
        component={QuestionRecordDetailScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="CheckBiometry"
        component={CheckBiometry}
      />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
