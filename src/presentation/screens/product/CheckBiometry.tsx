import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const CheckBiometry: React.FC = () => {
  const checkBiometricSupport = async () => {
    console.log('Verificando soporte de biometría...');
    try {
      const biometrics = new ReactNativeBiometrics();
      const sensorInfo = await biometrics.isSensorAvailable();
      if (sensorInfo.available) {
        console.log('Biometría disponible:', sensorInfo.biometryType);

        // Activar el sensor biométrico
        const promptResponse = await biometrics.simplePrompt({
          promptMessage: 'Por favor, autentíquese con biometría',
          cancelButtonText: 'Cancelar',
        });

        if (promptResponse.success) {
          console.log('Autenticación biométrica exitosa.');
          Alert.alert('Éxito', 'Autenticación biométrica exitosa.');
        } else {
          console.log('Autenticación biométrica cancelada por el usuario.');
          Alert.alert('Cancelado', 'La autenticación biométrica fue cancelada.');
        }
      } else {
        console.log('No hay soporte de biometría en este dispositivo.');
        Alert.alert('Error', 'Este dispositivo no soporta biometría.');
      }
    } catch (error) {
      console.error('Error al verificar biometría:', error);
      Alert.alert('Error', 'Ocurrió un problema al verificar la biometría.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verificar soporte de biometría</Text>
      <Button title="Verificar Biometría" onPress={checkBiometricSupport} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckBiometry;
