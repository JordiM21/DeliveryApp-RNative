import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const BasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id)
      let newBasket = [...state.items]
      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(
          "cannot remove product id as its not on your basket"
        )
      }
      state.items = newBasket
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = BasketSlice.actions

export const selectBasketItems = state => state.basket.items

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id)

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0)

export default BasketSlice.reducer