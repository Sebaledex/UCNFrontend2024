import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner, Button, Card, Divider } from '@ui-kitten/components';
import { Alert, Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuestionStore } from '../../store/useQuestionStore';
import { useRespuestaStore } from '../../store/useRespuestaStore';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { launchCamera } from 'react-native-image-picker';

const screenWidth = Dimensions.get('window').width;

export const QuestionDetailScreen = () => {
  const { fetchQuestionById, selectedQuestion, error } = useQuestionStore();
  const { submitResponse } = useRespuestaStore();
  const { user, status } = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [questionImages, setQuestionImages] = useState<{ [key: number]: string | null }>({});
  const [sendingAnswers, setSendingAnswers] = useState(false);

  useEffect(() => {
    fetchQuestionById(id);
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
      saveToPhotos: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelado', 'La captura de la foto fue cancelada.');
      } else if (response.errorCode) {
        Alert.alert('Error', `Error al abrir la cámara: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const photoData = response.assets[0];
        if (photoData.base64) {
          setQuestionImages((prev) => ({
            ...prev,
            [questionIndex]: photoData.base64 || null,
          }));
        } else {
          Alert.alert('Error', 'No se pudo obtener la imagen en base64.');
        }
      }
    });
  };

  const handleSendAllAnswers = async () => {
    setSendingAnswers(true);
    try {
      const respuestas = Object.keys(selectedAnswers).map((key) => ({
        numero: parseInt(key, 10) + 1,
        respuestaSeleccionada: selectedAnswers[parseInt(key, 10)],
      }));
      const imagenes = Object.keys(questionImages).map((key) => ({
        imagenBase64: questionImages[parseInt(key, 10)] || null,
      }));
      console.log('Imágenes:', imagenes);

      if (!user) {
        Alert.alert('Error', 'No se encontró el usuario. Inicia sesión nuevamente.');
        return;
      }

      await submitResponse(user.id, id, respuestas);
      console.log('Respuestas con imágenes:', respuestas);

      Alert.alert('Éxito', 'Todas las respuestas se enviaron correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
      Alert.alert('Error', 'Hubo un problema al enviar las respuestas');
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
        <Button
          style={styles.cameraButton}
          onPress={() => handleOpenCamera(index)}
        >
          Tomar Foto
        </Button>
        {questionImages[index] && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${questionImages[index]}` }}
            style={styles.imagePreview}
          />
        )}
      </Card>
      <Text style={styles.progressText}>
        Preguntas respondidas: {answeredQuestionsCount}/{totalQuestions}
      </Text>
      {allQuestionsAnswered && (
        <Button style={styles.sendButton} onPress={handleSendAllAnswers} disabled={sendingAnswers}>
          {sendingAnswers ? 'Enviando...' : 'Enviar Respuestas'}
        </Button>
      )}
    </View>
  );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={selectedQuestion.cuestionario}
        renderItem={renderQuestionItem}
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
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
});