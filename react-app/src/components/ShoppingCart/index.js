import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, addItemToCart, updateItemInCart, deleteFromCart } from "../../store/shoppingcart"
import { addNewOrder } from "../../store/orders"
import "./shoppingcart.css"

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cart);
  console.log("cart items", cart)
  const currUser = useSelector((state) => state?.session?.user)

  useEffect(() => {
    dispatch(getUserCart())
  }, [dispatch])


  if (!cartItems) return (
    <h1>Unable to load cart, please try again later.</h1>
  )

  const updateHandler = async (e, item) => {
    const itemData = {
      id: item.id,
      userId: currUser.id,
      productId: item.product_id,
      quantity: Number(e.target.value)
    }
    await dispatch(updateItemInCart(itemData))
  }

  const deleteHandler = async (e, item) => {
    e.preventDefault()
    const itemData = {
      id: item.id,
      userId: currUser.id,
      productId: item.product_id
    }
    await dispatch(deleteFromCart(itemData))
  }


  const cartQuantity = (cartArr) => {
    let total = 0
    for (let item of cartArr) {
      total += item.quantity
    }
    return total
  }

  const cartPrice = (cartArr) => {
    let total = 0
    for (let item of cartArr) {
      let itemPrice = item.quantity * item.product.price
      total += itemPrice
    }
    return total
  }

  return (
    <h1>Welcome to your Shopping Cart</h1>
  )
}
