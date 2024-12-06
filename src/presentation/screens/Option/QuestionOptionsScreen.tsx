import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export const QuestionOptionsScreen = () => {
  // Asegúrate de que useNavigation está correctamente tipado
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Opciones de Cuestionarios</Text>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigation.navigate('QuestionScreen')}
        accessoryLeft={<Icon name="edit-outline" />}
      >
        Ir a Responder Cuestionario
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigation.navigate('AnswerAllScreen')}
        accessoryLeft={<Icon name="file-text-outline" />}
      >
        Mis Cuestionarios
      </Button>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigation.navigate('QuestionRecordScreen')}
        accessoryLeft={<Icon name="eye-outline" />}
      >
        Ver Todas las Respuestas
      </Button>
    </Layout>
  );
};
