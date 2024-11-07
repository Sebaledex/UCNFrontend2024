import React, { useState } from 'react';
import { Button, Icon, Layout, Text, Spinner } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TokensScreen } from '../../store/TokensScreen';

export const HomeScreen = () => {
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    Alert.alert('Sesión cerrada.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'CheckingScreen' }],
    });
  };

  const navigateToQuestionScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'QuestionScreen' }],
    });
  };

  const navigateToTokensScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TokensScreen' }],
    });
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>HomeScreen</Text>

 
      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToQuestionScreen}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Ir a Lista de cuestionario 
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToTokensScreen}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Ir a Tokens Screen
      </Button>

      <Button 
        style={{ marginVertical: 10 }}
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={handleLogout}
        disabled={loading}
      >
        Cerrar sesión
      </Button>

    </Layout>
  );
};
