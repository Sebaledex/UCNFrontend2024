import React from 'react';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { StyleSheet, View, Alert } from 'react-native';
import { useAuthStore } from '../../store/auth/useAuthStore';

export const UserProfileScreen = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar sesión', onPress: logout },
      ]
    );
  };

  if (!user) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">No hay información del usuario disponible.</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Información del Usuario</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Correo Electrónico:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Area:</Text>
          <Text style={styles.value}>{user.area || 'No especificado'}</Text>
        </View>
      </Card>
      <Button style={styles.logoutButton} status="danger" onPress={handleLogout}>
        Cerrar Sesión
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
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
  },
  value: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
