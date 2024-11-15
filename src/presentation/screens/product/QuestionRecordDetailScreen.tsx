import React, { useEffect, useState } from 'react';
import { Layout, Text, Spinner, Button, Divider } from '@ui-kitten/components';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useQuestionStore } from '../../store/useQuestionStore'; // Asegúrate de tener la tienda de preguntas
import { useRespuestaStore } from '../../store/useRespuestaStore'; // Importa la tienda de respuestas
import { useRoute, useNavigation } from '@react-navigation/native';
import { Question } from '../../../domain/entities/question.entity';
import { Respuesta } from '../../../domain/entities/respuesta.entity';

interface RouteParams {
  id: string; // ID del cuestionario
}

export const QuestionRecordDetailScreen = () => {
  const { id } = useRoute().params as RouteParams; // Obtener el ID del cuestionario desde la ruta
  const { questions, fetchAllQuestions, error: questionError } = useQuestionStore(); // Usar el store para obtener todas las preguntas
  const { responses, fetchAllResponses, error: responseError } = useRespuestaStore(); // Usar el store para obtener todas las respuestas
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null); // Estado para almacenar el cuestionario seleccionado
  const [filteredResponses, setFilteredResponses] = useState<Respuesta[]>([]); // Estado para las respuestas filtradas
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllQuestions(); // Llamar la función para obtener todas las preguntas
    fetchAllResponses(); // Llamar la función para obtener todas las respuestas
  }, []);

  useEffect(() => {
    // Filtrar el cuestionario seleccionado por el ID
    const foundQuestion = questions.find((question) => question._id === id);
    setSelectedQuestion(foundQuestion || null); // Si no se encuentra, se mantiene null
  }, [id, questions]);

  useEffect(() => {
    // Filtrar las respuestas por el ID del cuestionario
    const filtered = responses.filter((respuesta) => respuesta.cuestionario_id === id);
    setFilteredResponses(filtered);
  }, [responses, id]);

  if (questionError || responseError) {
    return (
      <Layout style={styles.centered}>
        <Button onPress={fetchAllQuestions}>Reintentar</Button>
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

  return (
    <Layout style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Cuestionario ID: {selectedQuestion._id}</Text>
          <Divider style={styles.divider} />
          <Text style={styles.subTitle}>Nombre: {selectedQuestion.nombre}</Text>
          <Text style={styles.subTitle}>Descripción: {selectedQuestion.descripcion}</Text>
          <Divider style={styles.divider} />
          
          {/* Mostrar preguntas */}
          <Text style={styles.subTitle}>Preguntas:</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {selectedQuestion.cuestionario.map((pregunta, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>Pregunta {pregunta.numero}: {pregunta.pregunta}</Text>
                {/* Mostrar opciones si es una pregunta múltiple */}
                {pregunta.tipo === 'multiple' && pregunta.opciones && (
                  <Text style={styles.optionsText}>Opciones: {pregunta.opciones.join(', ')}</Text>
                )}
                <Divider style={styles.divider} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Mostrar respuestas del cuestionario */}
        <View style={styles.responsesContainer}>
          <Text style={styles.subTitle}>Respuestas:</Text>
          {filteredResponses.length > 0 ? (
            filteredResponses.map((respuesta, index) => (
              <View key={index} style={styles.responseContainer}>
                <Text style={styles.responseText}>Usuario: {respuesta.user_id}</Text>
                {respuesta.respuestas.map((respuestaPregunta, index) => (
                  <View key={index} style={styles.answerContainer}>
                    <Text style={styles.answerText}>
                      Pregunta {respuestaPregunta.numero}: {respuestaPregunta.respuestaSeleccionada}
                    </Text>
                  </View>
                ))}
                <Divider style={styles.divider} />
              </View>
            ))
          ) : (
            <Text>No hay respuestas para este cuestionario.</Text>
          )}
        </View>

        <Button style={styles.button} onPress={() => navigation.goBack()}>
          Volver
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  responsesContainer: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  questionContainer: {
    marginVertical: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionsText: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  responseContainer: {
    marginBottom: 12,
  },
  responseText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  answerContainer: {
    marginTop: 4,
  },
  answerText: {
    fontSize: 14,
  },
  divider: {
    marginVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
  },
});
