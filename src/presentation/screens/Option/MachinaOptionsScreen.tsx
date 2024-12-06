import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

export const MachinaOptionsScreen = () => {
  // Asegúrate de que useNavigation está correctamente tipado
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Opciones de Máquinas</Text>

      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigation.navigate('MachinaAddScreen')}
        accessoryLeft={<Icon name="plus-circle-outline" />}
      >
        Agregar Máquina
      </Button>


      <Button
        style={{ marginVertical: 10 }}
        onPress={() => navigation.navigate('MachinaPreviewScreen')}
        accessoryLeft={<Icon name="archive-outline" />}
      >
        Ver Máquinas
      </Button>

    </Layout>
  );
};
