import React, { useEffect } from 'react';
import { Layout, Text, Spinner, Button, Card, Divider } from '@ui-kitten/components';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuestionStore } from '../../store/useQuestionStore';

export const QuestionDetailScreen = () => {
  const { fetchQuestionById, selectedQuestion, error } = useQuestionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute();
  const { id } = route.params as { id: string };

  useEffect(() => {
    fetchQuestionById(id);
  }, [id]);

  if (error) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">{error}</Text>
        <Button onPress={() => navigation.goBack()}>Volver</Button>
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

  const renderQuestionItem = ({ item, index }: { item: any; index: number }) => (
    <View key={index} style={styles.questionContainer}>
      <Text style={styles.questionText}>Pregunta: {item.pregunta}</Text>
      {item.tipo === 'multiple' && (
        <View style={styles.optionContainer}>
          {item.opciones?.map((opcion: string, i: number) => (
            <Text key={i} style={styles.optionText}>Opción: {opcion}</Text>
          ))}
        </View>
      )}
      {item.tipo === 'escala' && item.respuestaEscala !== undefined && (
        <Text>Respuesta Escala: {item.respuestaEscala}</Text>
      )}
      {item.tipo === 'abierta' && item.respuestaAbierta !== undefined && (
        <Text>Respuesta Abierta: {item.respuestaAbierta}</Text>
      )}
      <Divider style={styles.divider} />
    </View>
  );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={selectedQuestion.cuestionario}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <Card style={styles.card}>
            <Text style={styles.title}>{selectedQuestion.nombre}</Text>
            <Text style={styles.description}>{selectedQuestion.descripcion}</Text>
            <View style={styles.photoContainer}>
              {selectedQuestion.fotos.map((foto, index) => (
                <Text key={index}>Foto: {foto}</Text>
              ))}
            </View>
          </Card>
        }
        renderItem={renderQuestionItem}
        contentContainerStyle={{ paddingBottom: 100 }} // Espacio para el botón
      />
      <Button style={styles.floatingButton} onPress={() => navigation.goBack()}>
        Volver
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    marginVertical: 8,
  },
  questionContainer: {
    marginVertical: 8,
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionContainer: {
    marginLeft: 16,
  },
  optionText: {
    fontStyle: 'italic',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3366FF',
    borderRadius: 8,
    elevation: 5,
  },
  divider: {
    marginVertical: 8,
  },
});
