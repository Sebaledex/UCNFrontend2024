import React, { useEffect } from 'react';
import { Layout, Text, Spinner, Card, Divider, Button } from '@ui-kitten/components';
import { FlatList, StyleSheet } from 'react-native';
import { useRespuestaStore } from '../../store/useRespuestaStore';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { Respuesta } from '../../../domain/entities/respuesta.entity';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useQuestionStore } from '../../store/useQuestionStore';

export const AnswerAllScreen = () => {
  const { responses, fetchAllResponses, error } = useRespuestaStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { user, status } = useAuthStore();
  const {question, fetchQuestionById} = useQuestionStore();

  useEffect(() => {
    fetchAllResponses();
  }, []);
  let filteredResponses = responses.filter((respuesta) => respuesta._id === user?.id);
  if (error) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">{error}</Text>
        <Button onPress={fetchAllResponses}>Reintentar</Button>
      </Layout>
    );
  }

  if (responses.length === 0) {
    return (
      <Layout style={styles.centered}>
        <Spinner size="large" />
      </Layout>
    );
  }

  const renderResponseItem = ({ item }: { item: Respuesta }) => (
    <Card style={styles.card} status="primary">
      <Text style={styles.title}>Cuestionario ID: {item._id}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.subTitle}>Usuario ID: {item._id}</Text>
      <Divider style={styles.divider} />
      <Text style={styles.title}>Respuestas:</Text>
      {item.respuestas.map((respuesta, index) => (
        <Text key={index}>
          {respuesta.numero}. {respuesta.respuestaSeleccionada}
        </Text>
      ))}
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={filteredResponses}
        keyExtractor={(item) => item._id}
        renderItem={renderResponseItem}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <Button style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
        Volver al Home
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
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
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
