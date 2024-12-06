import React, { useState } from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    Alert.alert('Sesión cerrada.');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'CheckingScreen' }], // Nombre exacto del Stack
      }),
    );
  };

  const navigateToScreen = (screen: keyof RootStackParams) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen }], // Se asegura que el nombre sea correcto
      }),
    );
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">HomeScreen</Text>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigateToScreen('QuestionOptionsScreen')}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Cuestionarios
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigateToScreen('MachinaOptionsScreen')}
        accessoryLeft={<Icon name="car-outline" />}
      >
        Máquinas
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigateToScreen('UserProfileScreen')}
        accessoryLeft={<Icon name="person-outline" />}
      >
        Datos Usuarios
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={handleLogout}
      >
        Cerrar sesión
      </Button>
    </Layout>
  );
};
