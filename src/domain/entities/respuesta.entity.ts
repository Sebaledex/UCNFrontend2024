export interface Respuesta {
  _id: string; // Este campo se refiere al ObjectId de MongoDB
  user_id: string;
  cuestionario_id: string;
  patente: string; // Ahora tenemos la patente
  fecha_respuesta: string; // Fecha en formato ISO 8601
  geolocalizacion: {
    latitud: number; // Latitud de la geolocalización
    longitud: number; // Longitud de la geolocalización
  };
  respuestas: RespuestaPregunta[]; // Respuestas a las preguntas
}

export interface RespuestaPregunta {
  numero: number; // Número de la pregunta
  respuestaSeleccionada: string; // Respuesta seleccionada (puede ser "No", "Negro", etc.)
}