import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../../store/products";
import { addItemToCart, getUserCart } from "../../../store/shoppingcart";
import AddToCart from "../../ShoppingCart/AddToCart";
import OpenModalButton from "../../OpenModalButton";
import { useParams, Link } from "react-router-dom";
import MainReviewBlock from "../../reviews/ReviewsBlock";
import "./SingleProduct.css";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.products.singleProduct);
  const currUser = useSelector((state) => state?.session?.user)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (product === undefined) {
    return null;
  }

  const maxAvailable = [];
  for (let i = 1; i <= product.quantity; i++) {
    maxAvailable.push(i);
  }

  const quantityUpdate = (e) => {
    setQuantity(e.target.value);
  };

  const addCartClick = async (e) => {
    e.preventDefault();


    const data = {
      user_id: currUser.id,
      product_id: product.id,
      quantity: quantity
    }
    console.log("item to be added", data)
    await dispatch(addItemToCart(data))
  }

  const disableButton = () => {
    if (!currUser) {
      return true;
    }
  };

  return (
    <div className="single-product-container">
      <div className="images-row">
        {product.images?.length > 0 ? (
          product.images.map(
            (image) =>
              image && (
                <img
                  className="single-product-img"
                  src={image.url}
                  alt={product.name}
                />
              )
          )
        ) : (
          <img
            className="single-product-img"
            src="https://i.imgur.com/6XK9X4u.png"
            alt={product.name}
          />
        )}
      </div>
      <div className="product-info">
        <h3 className="single-product-name">{product.name}</h3>
        <p>{product.description}</p>
        <p className="single-product-price">${product.price}</p>
        <Link to={`/user/${product.seller?.id}`}>
          <p>Seller: {product.seller?.username}</p>
        </Link>
      </div>
      <MainReviewBlock id={id} product={product} user={currUser}/>
      <select className="select-quantity" onChange={quantityUpdate}>
        <option>Select Quantity</option>
        {maxAvailable.map((number) => (
          <option>{number}</option>
        ))}
      </select>
      <div className="cart-button" onClick={addCartClick}>
        <OpenModalButton
          modalClass="add-cart-button"
          buttonText="Add to cart"
          modalDisabled={disableButton}
          modalComponent={<AddToCart product={product} quantity={quantity} />}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
