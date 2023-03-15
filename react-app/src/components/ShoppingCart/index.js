import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, addItemToCart, updateItemInCart, deleteFromCart } from "../../store/shoppingcart"
import { addNewOrder } from "../../store/orders"
import "./shoppingcart.css"

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cart);
  const currUser = useSelector((state) => state?.session?.user)

  useEffect(() => {
    dispatch(getUserCart())
  }, [dispatch])


  if (!cart) return (
    <h1>Unable to load cart, please try again later.</h1>
  )

  let cartArr = Object.values(cart)


}
