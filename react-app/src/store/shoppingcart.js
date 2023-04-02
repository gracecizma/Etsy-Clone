const GET_CART = "shopping-cart/GET_CART"
const ADD_CART_ITEM = "shopping-cart/ADD_ITEM"
const EDIT_CART_ITEM = "shopping-cart/EDIT_CART_ITEM"
const REMOVE_FROM_CART = "shopping-cart/REMOVE_FROM_CART"

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart
})

const addCartItem = (cart) => {
  return {
    type: ADD_CART_ITEM,
    payload: cart
  }
}

const updateCartItem = (cart) => {
  return {
    type: EDIT_CART_ITEM,
    payload: cart
  }
}

const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: item
})


// Get cart
export const getUserCart = () => async (dispatch) => {
  const res = await fetch(`/api/shopping-cart/`)

  if (res.ok) {
    const data = await res.json();
    // console.log("get user cart data", data)
    let normalizedObj = {}
    data.forEach((item) => normalizedObj[item.id] = item)
    // console.log("user cart data normalized obj", normalizedObj)
    dispatch(getCart(normalizedObj))
  }
}

// Add item to cart
export const addItemToCart = (item) => async (dispatch) => {
  const res = await fetch("/api/shopping-cart/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  })
  console.log("item", item)
  console.log("res", res)
  if (res.ok) {
    const data = await res.json()
    console.log("add item to cart data", data)
    dispatch(addCartItem(data))
  }
}

// update cart item
export const updateItemInCart = (item) => async (dispatch) => {
  const res = await fetch("/api/shopping-cart/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  })

  if (res.ok) {
    const data = await res.json()
    console.log("update dart item data", data)
    dispatch(updateCartItem(data))
    dispatch(getUserCart())
  }
}


// Delete from cart
export const deleteFromCart = (item) => async (dispatch) => {
  const res = await fetch(`api/shopping-cart/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  })

  if (res.ok) {
    dispatch(removeFromCart())
    dispatch(getUserCart())
  }
}


const initialState = {
  cart: {}
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      let getState = { ...state }
      // console.log("get cart state", getState)
      getState.cart = action.payload
      // console.log("get state action", action.payload)
      return getState
    case ADD_CART_ITEM:
      let addState = { ...state, cart: { ...state.cart } }
      // console.log("add to cart state", addState)
      // addState.cart[action.payload.id] = action.payload
      // console.log("add state action", action.payload)
      return addState
    case EDIT_CART_ITEM:
      let editState = { ...state }
      editState.cart = { ...state.cart }
      editState.cart[action.payload.id].quantity = action.payload.quantity
      return editState
    case REMOVE_FROM_CART:
      let deleteState = { ...state }
      delete deleteState.cart[action.payload]
      return deleteState
    default:
      return state
  }
}
