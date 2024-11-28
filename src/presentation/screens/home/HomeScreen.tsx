import React, { useState } from 'react';
import { Button, Icon, Layout, Text, Spinner } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TokensScreen } from '../../store/TokensScreen';
import { MachineScreen } from '../product/machineScreen';

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


  const navigateToAnswerAllScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AnswerAllScreen' }],
    });
  };

  const navigateToQuestionRecordScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'QuestionRecordScreen' }],
    });
  };

  const navigateToMachineScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MachinaPreviewScreen' }],
    });
  };

  const navigateToAddMachineScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MachinaAddScreen' }],
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
        Ir a Responder cuestionario 
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToAnswerAllScreen}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Ir a Mis Respuestas
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToQuestionRecordScreen}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Ir a Ver Todas las Respuestas 
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToMachineScreen}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Ir a MachineScreen
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToAddMachineScreen}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Ir a MachineScreen
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