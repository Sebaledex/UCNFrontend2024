import { serviceAxiosApi } from "../config/api/serviceAxiosApi";
import { Question } from "../domain/entities/question.entity";

export const getAllQuestions = async (): Promise<Question[]> => {
    try {
      const response = await serviceAxiosApi.get('/v2/question'); // Actualiza aquí la ruta
      return response.data; 
    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
      throw error; 
    }
  };

  export const getQuestionById = async (id: string): Promise<Question> => {
    try {
      const response = await serviceAxiosApi.get(`/v2/question/${id}`); // Asegúrate de que esta sea la ruta correcta
      return response.data;
    } catch (error) {
      console.error('Error al obtener el cuestionario:', error);
      throw error;
    }
  };