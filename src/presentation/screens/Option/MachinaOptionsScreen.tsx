import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParams } from '../../navigation/StackNavigator';

export const MachinaOptionsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Layout style={styles.container}>
      {/* Imagen del logo */}
      <Image
        source={require('../../../images/camion.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Espaciado adicional entre la imagen y el título */}
      <Text style={styles.spacing} category="h1">
        Opciones de Máquinas
      </Text>

      {/* Botones de opciones */}
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('MachinaAddScreen')}
        accessoryLeft={<Icon name="plus-circle-outline" />}
      >
        Agregar Máquina
      </Button>

      <Button
        style={styles.button}
        onPress={() => navigation.navigate('MachinaPreviewScreen')}
        accessoryLeft={<Icon name="archive-outline" />}
      >
        Ver Máquinas
      </Button>

      {/* Botón para volver al Home */}
      <Button
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeScreen')}
        accessoryLeft={<Icon name="arrow-back-outline" />}
      >
        Volver al Home
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  spacing: {
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  backButton: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});
