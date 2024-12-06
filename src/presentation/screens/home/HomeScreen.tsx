import React, { useState } from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Alert, StyleSheet, Image } from 'react-native';
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
    <Layout style={styles.container}>
      {/* Imagen del logo */}
      <Image
        source={require('../../../images/cuestionario.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Espaciado adicional entre el logo y el título */}
      <Text style={styles.title} category="h1">
        HomeScreen
      </Text>

      {/* Botones de opciones */}
      <Button
        style={styles.button}
        onPress={() => navigateToScreen('QuestionOptionsScreen')}
        accessoryLeft={<Icon name="question-mark-circle-outline" />}
      >
        Cuestionarios
      </Button>

      <Button
        style={styles.button}
        onPress={() => navigateToScreen('MachinaOptionsScreen')}
        accessoryLeft={<Icon name="car-outline" />}
      >
        Máquinas
      </Button>

      <Button
        style={styles.button}
        onPress={() => navigateToScreen('UserProfileScreen')}
        accessoryLeft={<Icon name="person-outline" />}
      >
        Datos Usuarios
      </Button>

      <Button
        style={styles.button}
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={handleLogout}
      >
        Cerrar sesión
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
    width: 175, // Ajusta el ancho del logo
    height: 175, // Ajusta la altura del logo
    marginBottom: 20, // Espacio entre la imagen y el título
  },
  title: {
    marginBottom: 30, // Espaciado adicional entre el título y las opciones
  },
  button: {
    marginVertical: 10,
  },
});
