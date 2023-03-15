const GET_ORDERS = "orders/GET_ORDERS"
const ADD_ORDER = "orders/ADD_ORDER"

const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    payload: orders
  }
}

const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    payload: order
  }
}

export const getAllOrders = () => async (dispatch) => {
  const res = await fetch("/api/orders")

  if (res.ok) {
    const data = await res.json()
    console.log("get all orders data", data)
    dispatch(getOrders(data))
  }
}

export const addNewOrder = (cart) => async (dispatch) => {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(cart)
    }
  })

  if (res.ok) {
    const data = await res.json()
    console.log("add new order data", data)
    dispatch(addOrder(data))
  }
}

const initialState = {}

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      let getState = { ...state }
      getState["orders"] = { ...action.payload }
      return getState
    case ADD_ORDER:
      let addState = { ...state }
      addState.orders = action.payload
      return addState
    default:
      return state
  }
}
