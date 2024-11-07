import React, { useState } from 'react';
import { Button, Icon, Layout, Text, Spinner } from '@ui-kitten/components';
import { Alert } from 'react-native';
import { useAuthStore } from './auth/useAuthStore';
import { useNavigation } from '@react-navigation/native';

export const TokensScreen = () => {
  const { access_token, refresh_token, refresh } = useAuthStore();
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

  const navigateToHomeScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
  };


  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category='h1'>TokensScreen</Text>

      <Text style={{ marginVertical: 10 }}>
        Access Token: {access_token ? access_token : 'No access token available'}
      </Text>

      <Text style={{ marginVertical: 10 }}>
        Refresh Token: {refresh_token ? refresh_token : 'No refresh token available'}
      </Text>

      <Button
        style={{ marginVertical: 10 }}
        onPress={handleVerifyTokens}
        accessoryLeft={loading ? () => <Spinner size="small" status="control" /> : <Icon name="refresh-outline" />}
        disabled={loading}
      >
        {loading ? 'Verificando...' : 'Verificar Tokens'}
      </Button>

      {/* Botón para navegar a HomeScreen */}
      <Button
        style={{ marginVertical: 10 }}
        onPress={navigateToHomeScreen}
        accessoryLeft={<Icon name="home-outline" />}
      >
        Volver a HomeScreen
      </Button>
    </Layout>
  );
};
