import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner, Button, Card, Divider, Modal } from '@ui-kitten/components';
import { Alert, Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuestionStore } from '../../store/useQuestionStore';
import Carousel from 'react-native-snap-carousel';
import { answerQuestion } from '../../../actions/question';

const screenWidth = Dimensions.get('window').width;

export const QuestionDetailScreen = () => {
  const { fetchQuestionById, selectedQuestion, error, submitAnswer } = useQuestionStore();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [sendingAnswers, setSendingAnswers] = useState<boolean>(false);

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
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: option,
    }));
    setCurrentQuestionIndex(questionIndex);
  };

  const handleSendAllAnswers = async () => {
    setSendingAnswers(true);
    try {
      for (let i = 0; i < selectedQuestion.cuestionario.length; i++) {
        if (selectedAnswers[i] !== undefined) {
          const numeroPregunta = i + 1;
          const respuesta = selectedAnswers[i];
          await submitAnswer(id, numeroPregunta, respuesta);
        }
      }
      Alert.alert('Éxito', 'Todas las respuestas se enviaron correctamente');
      navigation.goBack(); // Redirige a la pantalla de preguntas
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
            <View style={[
              styles.selectionIndicator,
              selectedAnswers[index] === opcion && styles.selected,
            ]} />
            <Text style={styles.optionText}>{opcion}</Text>
          </TouchableOpacity>
        ))}
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