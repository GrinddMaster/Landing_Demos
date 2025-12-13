export type TourViewProps={
  spaceId:string,
  sdkKey:string,
}
export interface cartItem {
  id:string ,
  name:string,
  img:URL,
  quantity:number,
  price:number,
}
export interface cartState{
  cartItems: cartItem[],
  addItem: (item:cartItem) => void,
  clearCart: () => void,
}
export interface reservationItem {
  name:string,
  guests:number,
  date:string,
  times:string[],
}
export interface reservationState{
  reservationItem: reservationItem[],
  selectedTable: string | null,
  addReservation: (item:reservationItem) => void,
  setSelectedTable: (tableName: string) => void,
  clearReservations: () => void,
}