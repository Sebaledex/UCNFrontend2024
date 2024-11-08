export interface Question {
    _id: string; // Este campo se refiere al ObjectId de MongoDB
    nombre: string;
    descripcion: string;
    fotos: string[];
    userId: string;
    cuestionario: Pregunta[];
  }
  
  export interface Pregunta {
    numero: number;
    pregunta: string;
    tipo: 'abierta' | 'multiple' | 'escala';
    opciones?: string[];
    //respuestaEscala?: number;
   // respuestaAbierta?: string;
    respuestaSeleccionada?: string;
  }
  
