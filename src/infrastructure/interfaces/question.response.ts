export interface QuestionResponse {
  id: string;
  nombre: string;
  descripcion: string;
  fotos: string[];
  user_id: string;
  cuestionario: PreguntaResponse[];
}

export interface PreguntaResponse {
  pregunta: string;
  tipo: 'abierta' | 'multiple' | 'escala';
  opciones?: string[];
  respuestaEscala?: number;
  respuestaAbierta?: string;
}