import React, { useState } from 'react';
import { Button, Icon, Layout, Text, Spinner } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Alert } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const { access_token, refresh_token, refresh, logout } = useAuthStore(); // Accediendo a access_token, refresh_token y métodos
  const [loading, setLoading] = useState(false);

  const handleVerifyTokens = async () => {
    setLoading(true);
    const success = await refresh();
    setLoading(false);

    if (success) {
      Alert.alert('Tokens encontrados y cuenta iniciada automáticamente.');
    } else {
      Alert.alert('No se pudieron encontrar los tokens, por favor inicie sesión.');
    }
  };

  const handleLogout = () => {
    // Aquí puedes llamar a tu función de logout del store
    logout(); // Asegúrate de implementar esta función en tu store
    Alert.alert('Sesión cerrada.');
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>HomeScreen</Text>

      {/* Mostrar access_token */}
      <Text style={{ marginVertical: 10 }}>
        Access Token: {access_token ? access_token : 'No token available'}
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
        accessoryLeft={<Icon name="log-out-outline" />}
        onPress={handleLogout} // Maneja el cierre de sesión
        disabled={loading} // Deshabilitar si está cargando
      >
        Cerrar sesión
      </Button>
    </Layout>
  );
};
