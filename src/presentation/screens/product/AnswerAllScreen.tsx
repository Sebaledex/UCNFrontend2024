import React, { useEffect } from 'react';
import { Layout, Text, Spinner, Card, Divider, Button } from '@ui-kitten/components';
import { FlatList, StyleSheet } from 'react-native';
import { useRespuestaStore } from '../../store/useRespuestaStore';
import { useQuestionStore } from '../../store/useQuestionStore';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Respuesta } from '../../../domain/entities/respuesta.entity';
import { Image } from 'react-native';


export const AnswerAllScreen = () => {
  const { responses, fetchAllResponses, error } = useRespuestaStore();
  const { questions, fetchAllQuestions } = useQuestionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchAllResponses(); // Obtener respuestas
    fetchAllQuestions(); // Obtener cuestionarios
  }, []);

  // Filtrar respuestas por el ID del usuario actual
  const filteredResponses = responses.filter((respuesta) => respuesta.user_id === user?.id);

  // Crear un mapa de IDs de cuestionarios a nombres
  const questionNameMap = new Map(questions.map((question) => [question._id, question.nombre]));

  // Formatear fecha al formato solicitado (dd/mm/año hora:minutos)
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    
    // Restar 3 horas a la fecha para ajustar la zona horaria
    date.setHours(date.getHours() - 3);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  if (error) {
    return (
      <Layout style={styles.centered}>
        <Text status="danger">{error}</Text>
        <Button onPress={fetchAllResponses}>Reintentar</Button>
      </Layout>
    );
  }

  if (!responses.length || !questions.length) {
    return (
      <Layout style={styles.centered}>
        <Spinner size="large" />
      </Layout>
    );
  }

  const renderResponseItem = ({ item }: { item: Respuesta }) => (
    <Card style={styles.card} status="primary">
      <Text style={styles.title}>
        Cuestionario: {questionNameMap.get(item.cuestionario_id) || 'Nombre no disponible'}
      </Text>
      <Divider style={styles.divider} />
      <Text style={styles.subTitle}>Patente: {item.patente || 'No disponible'}</Text>
      <Text style={styles.subTitle}>
        Fecha: {item.fecha_respuesta ? formatDate(item.fecha_respuesta) : 'Fecha no disponible'}
      </Text>
      {/* Mostrar la imagen si existe */}
    {item.foto ? (
      <Image
        source={{ uri: item.foto }}
        style={{ width: 200, height: 200, resizeMode: 'contain' }} // Ajusta las dimensiones según tus necesidades
      />
    ) : (
      <Text style={styles.subTitle}>Evidencia no disponible</Text>
    )}

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
        keyExtractor={(item) => item._id} // `_id` debe ser único y de tipo string
        renderItem={renderResponseItem}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('HomeScreen')}
      >
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
