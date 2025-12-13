import { create } from 'zustand';
import { reservationItem, reservationState } from '@/types';

const useReservationStore = create<reservationState>((set) => ({
  reservationItem: [],
  selectedTable: null,
  addReservation: (item: reservationItem) =>
    set((state: reservationState) => ({
      reservationItem: [...state.reservationItem, item],
    })),
  setSelectedTable: (tableName: string) =>
    set({ selectedTable: tableName }),
  clearReservations: () => set({ reservationItem: [] }),
}));

export default useReservationStore;