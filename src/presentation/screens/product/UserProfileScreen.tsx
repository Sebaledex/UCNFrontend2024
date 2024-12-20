import React from 'react';
import { Layout, Text, Card, Button, Avatar } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore'; // Importa tu store de autenticación

export const UserProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuthStore(); // Obtén el usuario desde el store

  const handleBackToHome = () => {
    navigation.navigate('HomeScreen');
  };

  // Manejar el caso en que no haya usuario cargado
  if (!user) {
    return (
      <Layout style={styles.centered}>
        <Text category="h5" style={styles.loadingText}>
          Cargando datos del usuario...
        </Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.profileHeader}>
      <Avatar source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }} size="giant" />
        <Text category="h5" style={styles.name}>{user.name}</Text>
        <Text category="s1" style={styles.username}>@{user.username}</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.title}>Información del Usuario</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Correo Electrónico:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Área:</Text>
          <Text style={styles.value}>{user.area || 'Sin área asignada'}</Text>
        </View>
      </Card>

      <Button style={styles.backButton} status="primary" onPress={handleBackToHome}>
        Volver al Inicio
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 10,
  },
  username: {
    color: '#8F9BB3',
    fontSize: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  value: {
    fontSize: 16,
    color: '#4F4F4F',
  },
  backButton: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#3498db',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
