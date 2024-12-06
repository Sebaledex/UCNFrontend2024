import { serviceAxiosApi } from "../config/api/serviceAxiosApi";
import { Respuesta } from "../domain/entities/respuesta.entity";

export const getAllResponses = async (): Promise<Respuesta[]> => {
  try {
    const response = await serviceAxiosApi.get('/v2/respuesta');
    return response.data; // Retornamos la lista de respuestas.
  } catch (error) {
    console.error('Error al obtener las respuestas:', error);
    throw error;
  }
};

export const getResponseById = async (id: string): Promise<Respuesta> => {
  try {
    const response = await serviceAxiosApi.get(`/v2/respuesta/user/${id}`);
    return response.data; // Retornamos una respuesta específica.
  } catch (error) {
    console.error('Error al obtener la respuesta:', error);
    throw error;
  }
};

export const createResponse = async (
  userId: string,
  cuestionarioId: string,
  respuestas: { numero: number; respuestaSeleccionada: string }[],
  patente: string,
  fecha_respuesta: string,
  geolocalizacion: { latitud: number; longitud: number }
): Promise<Respuesta> => {
  try {
    const payload = { respuestas, patente, fecha_respuesta, geolocalizacion };
    const response = await serviceAxiosApi.post(`/v2/respuesta/${userId}/${cuestionarioId}`, payload);
    return response.data; // Retornamos la respuesta creada.
  } catch (error) {
    console.error('Error al enviar la respuesta:', error);
    throw error;
  }
};
