import React, { useState } from 'react';
import { Button, Icon, Layout, Text, Spinner } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const { access_token, refresh_token, refresh, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleVerifyTokens = async () => {
    setLoading(true);
    const success = await refresh();
    setLoading(false);

    if (success) {
      Alert.alert('Tokens validados y cuenta iniciada automáticamente.');
    } else {
      Alert.alert('No se pudieron encontrar los tokens, por favor inicie sesión.');
    }
  };

  const handleLogout = () => {
    logout();
    Alert.alert('Sesión cerrada.');

    // Navegar a la pantalla "CheckingScreen" después del logout
    navigation.reset({
      index: 0,
      routes: [{ name: 'CheckingScreen' }],
    });
  };

  const navigateToCheckingScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'CheckingScreen' }],
    });  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>HomeScreen</Text>

      {/* Mostrar access_token */}
      <Text style={{ marginVertical: 10 }}>
        Access Token: {access_token ? access_token : 'No access token available'}
      </Text>

      {/* Mostrar refresh_token */}
      <Text style={{ marginVertical: 10 }}>
        Refresh Token: {refresh_token ? refresh_token : 'No refresh token available'}
      </Text>

      {/* Botón para verificar Tokens */}
      <Button
        style={{ marginVertical: 10 }}
        onPress={handleVerifyTokens}
        accessoryLeft={loading ? () => <Spinner size="small" status="control" /> : <Icon name="refresh-outline" />}
        disabled={loading} // Deshabilitar si está cargando
      >
        {loading ? 'Verificando...' : 'Verificar Tokens'}
      </Button>

      {/* Botón para cerrar sesión */}
      <Button 
        style={{ marginVertical: 10 }}
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={handleLogout} // Maneja el cierre de sesión
        disabled={loading} // Deshabilitar si está cargando
      >
        Cerrar sesión
      </Button>

      {/* Nuevo botón para navegar a CheckingScreen */}
      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToCheckingScreen}
        accessoryLeft={<Icon name="navigation-outline" />}
      >
        Ir a CheckingScreen
      </Button>
    </Layout>
  );
};
