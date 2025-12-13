import useReservationStore from '@/Stores/reservationStore';
import  { reservationItem } from '@/types';

export function addReservation(item: reservationItem) {
  const { addReservation } = useReservationStore.getState();
  addReservation(item);
}

export function setSelectedTable(tableName: string) {
  const { setSelectedTable } = useReservationStore.getState();
  setSelectedTable(tableName);
}