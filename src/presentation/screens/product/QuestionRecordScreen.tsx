import React, { useEffect } from 'react';
import { Layout, Text, Spinner, Card, Divider, Button } from '@ui-kitten/components';
import { FlatList, StyleSheet } from 'react-native';
import { useQuestionStore } from '../../store/useQuestionStore';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { Question } from '../../../domain/entities/question.entity';

export const QuestionRecordScreen = () => {
  const { questions, fetchAllQuestions, error } = useQuestionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const handleQuestionPress = (_id: string) => {
    // Navega a QuestionRecordDetailScreen y pasa el ID del cuestionario
    navigation.navigate('QuestionRecordDetailScreen', { id: _id });
  };

  if (error) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">{error}</Text>
        <Button onPress={fetchAllQuestions}>Reintentar</Button>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout style={styles.centered}>
        <Spinner size="large" />
      </Layout>
    );
  }

  const renderQuestionItem = ({ item }: { item: Question }) => (
    <Card style={styles.card} status="primary" onPress={() => handleQuestionPress(item._id)}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Divider style={styles.divider} />
      <Text>{item.descripcion}</Text>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(item) => item._id}
        renderItem={renderQuestionItem}
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
