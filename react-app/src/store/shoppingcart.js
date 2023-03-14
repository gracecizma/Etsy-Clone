const GET_CART = "shopping-cart/GET_CART"
const REMOVE_FROM_CART = "shopping-cart/REMOVE_FROM_CART"

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart
})

const removeFromCart = () => ({
  type: REMOVE_FROM_CART
})


// Get cart
export const getUserCart = (cartId) => async (dispatch) => {
  const res = await fetch(`/api/carts/${cartId}`)

  if (res.ok) {
    const data = await res.json();
    dispatch(getCart(data))
  }
}


// Delete from cart
export const deleteFromCart = (productId) => async (dispatch) => {
  const res = await fetch(`api/carts/remove-from-cart/${productId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(removeFromCart())
  }
}


const initialState = { cart: {} };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return { ...state, cart: action.payload }
    case REMOVE_FROM_CART:
      return { ...state }
  }
}
