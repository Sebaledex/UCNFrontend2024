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
import { UserVehicleSelectionScreen } from '../screens/product/UserVehicleSelectionScreen';
import { UserProfileScreen } from '../screens/product/UserProfileScreen';
import { MachinaPreviewScreen } from '../screens/product/MachinaPreviewScreen';
import { MachinaAddScreen } from '../screens/product/MachinaAddScreen';
import { QuestionOptionsScreen } from '../screens/Option/QuestionOptionsScreen';
import { MachinaOptionsScreen } from '../screens/Option/MachinaOptionsScreen';




export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  CheckingScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  ProductScreen: undefined;
  QuestionScreen: undefined;
  QuestionDetailScreen: { id: string; machinePatente: string; userId: string }; // Agregado userId
  TokensScreen: undefined;
  AnswerAllScreen: undefined;
  QuestionRecordScreen: undefined;
  QuestionRecordDetailScreen: { id: string};
  MachinaPreviewScreen: undefined;
  MachinaAddScreen: undefined;
  UserVehicleSelectionScreen: { id: string };
  UserProfileScreen: undefined;
  QuestionOptionsScreen: undefined;
  MachinaOptionsScreen: undefined;
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
        name="UserProfileScreen"
        component={UserProfileScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="QuestionOptionsScreen"
        component={QuestionOptionsScreen}
      />  
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="MachinaOptionsScreen"
        component={MachinaOptionsScreen}
      />              
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="MachinaPreviewScreen" component={MachinaPreviewScreen} />
      <Stack.Screen name="MachinaAddScreen" component={MachinaAddScreen} />
      <Stack.Screen name="UserVehicleSelectionScreen" component={UserVehicleSelectionScreen} />
    </Stack.Navigator>
  );
};
