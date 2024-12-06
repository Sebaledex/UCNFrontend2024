import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner, Button, Card, Divider } from '@ui-kitten/components';
import { Alert, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuestionStore } from '../../store/useQuestionStore';
import { useRespuestaStore } from '../../store/useRespuestaStore';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import ReactNativeBiometrics from 'react-native-biometrics';

const screenWidth = Dimensions.get('window').width;

export const QuestionDetailScreen = () => {
  const { fetchQuestionById, selectedQuestion, error } = useQuestionStore();
  const { submitResponse } = useRespuestaStore();
  const { user, status } = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute();
  const { id, machinePatente } = route.params as { id: string; machinePatente: string };
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [questionImages, setQuestionImages] = useState<{ [key: number]: string | null }>({});
  const [sendingAnswers, setSendingAnswers] = useState(false);
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);


  const getCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      },
      error => {
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  
  console.log('Coordenadas:', coordinates);

  useEffect(() => {
    fetchQuestionById(id);
    getCoordinates();
  }, [id]);

  if (error) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">{error}</Text>
      </Layout>
    );
  }

  if (!selectedQuestion) {
    return (
      <Layout style={styles.centered}>
        <Spinner size="large" />
      </Layout>
    );
  }

  const totalQuestions = selectedQuestion.cuestionario.length;
  const answeredQuestionsCount = Object.keys(selectedAnswers).length;
  const allQuestionsAnswered = totalQuestions === answeredQuestionsCount;

  const handleOptionSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };


  

  const handleOpenCamera = (questionIndex: number) => {
    const options = {
      mediaType: 'photo' as const,
      includeBase64: true,
      saveToPhotos: true, // Guarda la foto en la galería
    };
  
    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelado', 'La captura de la foto fue cancelada.');
      } else if (response.errorCode) {
        Alert.alert('Error', `Error al abrir la cámara: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const photoData = response.assets[0];
        const fileUri = photoData.uri ?? null; // Asegúrate de que sea null si no hay URI
  
        // Guardamos el URI de la foto en el estado para esa pregunta
        setQuestionImages((prev) => ({
          ...prev,
          [questionIndex]: fileUri, // Asociamos el URI a la pregunta
        }));
  
        if (fileUri) {
          Alert.alert('Éxito', 'Foto guardada exitosamente.');
        } else {
          Alert.alert('Error', 'No se pudo guardar la foto.');
        }
      }
    });
  };
  
  

  const handleSendAllAnswers = async () => {
    const biometrics = new ReactNativeBiometrics();
    try {
      const sensorInfo = await biometrics.isSensorAvailable();
      if (!sensorInfo.available) {
        Alert.alert('Error', 'Este dispositivo no soporta biometría.');
        return;
      }
  
      const promptResponse = await biometrics.simplePrompt({
        promptMessage: 'Por favor, autentíquese para continuar',
        cancelButtonText: 'Cancelar',
      });
  
      if (!promptResponse.success) {
        Alert.alert('Cancelado', 'La autenticación biométrica fue cancelada.');
        return;
      }
  
      // Si la autenticación biométrica es exitosa, enviar respuestas
      setSendingAnswers(true);
  
      if (!coordinates?.latitude || !coordinates?.longitude) {
        Alert.alert(
          'Obteniendo geolocalización',
          'Espere a que se obtenga la ubicación antes de enviar las respuestas.',
        );
        return;
      }
  
      // Geolocalización es válida
      const geolocalizacion = {
        latitud: coordinates.latitude,
        longitud: coordinates.longitude,
      };
  
      // Fecha de respuesta en formato ISO
      const fecha_respuesta = new Date().toISOString();
      console.log('imagenes:', questionImages);
  
      // Mapear las respuestas y asociar las fotos de cada pregunta
      const respuestas = Object.keys(selectedAnswers).map((key) => {
        const questionIndex = parseInt(key, 10);
        return {
          numero: questionIndex + 1,
          respuestaSeleccionada: selectedAnswers[questionIndex],
          // foto: questionImages[questionIndex] ?? "" // Enviamos el URI de la foto si existe
        };
      });
  
      // Validación de usuario
      if (!user || !user.id) {
        Alert.alert('Error', 'No se encontró el usuario. Inicia sesión nuevamente.');
        return;
      }
  
      // Enviar respuestas al store
      await submitResponse(user.id, id, respuestas, machinePatente, fecha_respuesta, geolocalizacion, questionImages[0]?.toString() ?? '');
  
      Alert.alert('Éxito', 'Todas las respuestas se enviaron correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error durante la autenticación biométrica o el envío:', error);
      Alert.alert('Error', 'Ocurrió un problema al autenticar o enviar las respuestas.');
    } finally {
      setSendingAnswers(false);
    }
  };
  

  const renderQuestionItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.questionWrapper, { width: screenWidth }]}>
      <Card style={styles.card}>
        <Text style={styles.boldText}>Pregunta {item.numero}</Text>
        <Text style={styles.questionText}>{item.pregunta}</Text>
        {item.opciones?.map((opcion: string, i: number) => (
          <TouchableOpacity
            key={i}
            style={styles.optionContainer}
            onPress={() => handleOptionSelect(index, opcion)}
          >
            <View
              style={[
                styles.selectionIndicator,
                selectedAnswers[index] === opcion && styles.selected,
              ]}
            />
            <Text style={styles.optionText}>{opcion}</Text>
          </TouchableOpacity>
        ))}
        {/* {questionImages[index] && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${questionImages[index]}` }}
            style={styles.imagePreview}
          />
        )} */}
      </Card>

      <Text style={styles.progressText}>
        Preguntas respondidas: {answeredQuestionsCount}/{totalQuestions}
      </Text>

      {allQuestionsAnswered ? (
  <>
    <Button style={styles.sendButton} onPress={handleSendAllAnswers} disabled={sendingAnswers}>
      {sendingAnswers ? 'Enviando...' : 'Enviar Respuestas'}
    </Button>
    
    <Button
      style={styles.cameraButton}
      onPress={() => handleOpenCamera(0)}
    >
      Tomar Evidencia
    </Button>
  </>
) : null}
    </View>
  );

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
       {/* <Text style={styles.headerText}>ID del Cuestionario: {id}</Text>*/}
        <Text style={styles.headerText}>Patente de la Máquina: {machinePatente}</Text>
       {/*  <Text style={styles.headerText}>ID del Usuario: {user?.id || "No disponible"}</Text> */}
       {coordinates ? (
        <Text style={styles.headerText}>
          Latitud: {coordinates.latitude.toFixed(4)}, Longitud: {coordinates.longitude.toFixed(4)}
        </Text>
      ) : (
        <Text style={styles.headerText}>Obteniendo coordenadas...</Text>
      )}
      </View>

      <FlatList
        data={selectedQuestion.cuestionario}
        renderItem={renderQuestionItem}
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />

<Button style={styles.button} onPress={() => navigation.goBack()}>
          Volver
        </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: '#1F4A6F',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  optionText: {
    fontStyle: 'italic',
    marginLeft: 8,
  },
  selectionIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  selected: {
    backgroundColor: 'blue',
  },
  cameraButton: {
    marginTop: 16,
  },
  imagePreview: {
    marginTop: 8,
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  sendButton: {
    marginTop: 16,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
});
