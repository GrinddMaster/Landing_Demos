export interface cartItem {
  id:string ,
  name:string,
  img:URL,
  quantity:number,
  price:number,
}
export type TourViewProps={
  spaceId:string,
  sdkKey:string,
}

export interface cartState{
  cartItems: cartItem[],
  addItem: (item:cartItem) => void,
  clearCart: () => void,
}