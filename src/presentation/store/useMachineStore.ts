import { create } from "zustand";
import { Machine } from "../../domain/entities/machine.entity";
import { createMachine, getAllMachines } from "../../actions/machine";


interface MachineState {
  machines: Machine[];
  error: string | null;
  fetchAllMachines: () => Promise<void>;
  addMachine: (patente: string, area: string) => Promise<void>;
}

export const useMachineStore = create<MachineState>((set) => ({
  machines: [],
  error: null,

  fetchAllMachines: async () => {
    try {
      const machines = await getAllMachines();
      set({ machines, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  addMachine: async (patente, area) => {
    try {
      const newMachine = await createMachine(patente, area);
      set((state) => ({
        machines: [...state.machines, newMachine],
        error: null,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));