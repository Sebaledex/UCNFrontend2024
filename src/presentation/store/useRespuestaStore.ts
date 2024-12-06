import { create } from "zustand";
import { getAllResponses, getResponseById, createResponse } from "../../actions/respuesta";
import { Respuesta } from "../../domain/entities/respuesta.entity";

interface RespuestaState {
  responses: Respuesta[]; // Lista de respuestas.
  selectedResponse: Respuesta | null; // Respuesta seleccionada.
  error: string | null; // Mensaje de error si ocurre alguno.
  fetchAllResponses: () => Promise<void>; // Obtener todas las respuestas.
  fetchResponseById: (id: string) => Promise<void>; // Obtener una respuesta específica.
  submitResponse: (
    userId: string,
    cuestionarioId: string,
    respuestas: { numero: number; respuestaSeleccionada: string }[],
    patente: string,
    fecha_respuesta: string,
    geolocalizacion: { latitud: number; longitud: number },
    foto:string,
  ) => Promise<void>; // Enviar una nueva respuesta.
}

export const useRespuestaStore = create<RespuestaState>((set) => ({
  responses: [],
  selectedResponse: null,
  error: null,

  fetchAllResponses: async () => {
    try {
      const responses = await getAllResponses();
      set({ responses, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchResponseById: async (id: string) => {
    try {
      const selectedResponse = await getResponseById(id);
      set({ selectedResponse, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  submitResponse: async (
    userId,
    cuestionarioId,
    respuestas,
    patente,
    fecha_respuesta,
    geolocalizacion,
    foto
  ) => {
    try {
      await createResponse(userId, cuestionarioId, respuestas, patente, fecha_respuesta, geolocalizacion,foto);
      set({ error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));