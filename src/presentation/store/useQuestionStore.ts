import { create } from "zustand";
import { answerQuestion, getAllQuestions, getQuestionById } from "../../actions/question";
import { Question } from "../../domain/entities/question.entity";


interface QuestionState {
    question: Question | null;
    questions: Question[];
    selectedQuestion: Question | null; // Para almacenar el cuestionario seleccionado
    error: string | null;
    fetchAllQuestions: () => Promise<void>;
    fetchQuestionById: (id: string) => Promise<void>; // Función para obtener un cuestionario específico
    submitAnswer: (questionId: string, numeroPregunta: number, respuesta: string) => Promise<void>;
}

export const useQuestionStore = create<QuestionState>((set) => ({
    question: null,
    questions: [],
    selectedQuestion: null,
    error: null,
    
    fetchAllQuestions: async () => {
        try {
            const questions = await getAllQuestions();
            set({ questions, error: null });
        } catch (error) {
            set({ error: (error as Error).message });
        }
    },

    fetchQuestionById: async (id: string) => {
        try {
            const selectedQuestion = await getQuestionById(id);
            set({ selectedQuestion, error: null });
        } catch (error) {
            set({ error: (error as Error).message });
        }
    },

    submitAnswer: async (questionId, numeroPregunta, respuesta) => {
        try {
            await answerQuestion(questionId, numeroPregunta, respuesta);
            set({ error: null });
        } catch (error) {
            set({ error: (error as Error).message });
        }
    },
}));