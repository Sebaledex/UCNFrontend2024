import { serviceAxiosApi } from "../config/api/serviceAxiosApi";
import { Machine } from "../domain/entities/machine.entity";

export const getAllMachines = async (): Promise<Machine[]> => {
  try {
    const response = await serviceAxiosApi.get("/v2/machines");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las máquinas:", error);
    throw error;
  }
};

// Crear una nueva máquina
export const createMachine = async (patente: string, area: string): Promise<Machine> => {
  try {
    const response = await serviceAxiosApi.post("/v2/machines", { patente, area });
    return response.data;
  } catch (error) {
    console.error("Error al crear la máquina:", error);
    throw error;
  }
};