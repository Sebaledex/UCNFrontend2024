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

  export const answerQuestion = async (
    questionId: string,
    numeroPregunta: number,
    respuesta: string
): Promise<void> => {
    try {
        // Aquí imprimimos los datos antes de hacer la solicitud
        console.log('Enviando a endpoint:', `/v2/question/${questionId}/answer`);
        console.log('Datos a enviar:', {
            numeroPregunta,
            respuesta,
        });

        await serviceAxiosApi.patch(`/v2/question/${questionId}/answer`, {
            numeroPregunta,
            respuesta,
        });
    } catch (error) {
        console.error('Error al enviar la respuesta:', error);
        throw error;
    }
};