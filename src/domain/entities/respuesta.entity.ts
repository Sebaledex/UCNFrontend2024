export interface Respuesta {
    _id: string; // Este campo se refiere al ObjectId de MongoDB
    user_id: string;
    cuestionario_id: string;
    respuestas: RespuestaPregunta[];
  }
  
  export interface RespuestaPregunta {
    numero: number;
    respuestaSeleccionada: string;
    //respuestaEscala?: number;
   // respuestaAbierta?: string;
    //respuestaSeleccionada?: string;
  }
  
