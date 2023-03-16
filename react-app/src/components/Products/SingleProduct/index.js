import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../../store/products";
import { addItemToCart, getUserCart } from "../../../store/shoppingcart";
import AddToCart from "../../ShoppingCart/AddToCart"
import OpenModalButton from "../../OpenModalButton";
import { useParams, Link } from "react-router-dom";
import "./SingleProduct.css";

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector((state) => state.products.singleProduct);
    const currUser = useSelector((state) => state?.session?.user)
    const cart = useSelector((state) => state?.cart?.cart)
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [dispatch, id]);


    if (product === undefined) {
        return null;
    }

    const maxAvailable = [];
    for (let i = 1; i <= product.quantity; i++) {
        maxAvailable.push(i)
    }

    const quantityUpdate = (e) => {
        setQuantity(e.target.value)
    }

    const addCartClick = async (e) => {
        e.preventDefault()

        const data = {
            userId: currUser.id,
            productId: product.id,
            quantity: quantity
        }
        await dispatch(addItemToCart(data))
        await dispatch(getUserCart())
    }

    const disableButton = () => {
        if (!currUser) {
            return true
        }
    }

    return (
        <div className="single-product-container">
            {product.images?.length > 0 ? (
                product.images.map((image) => (
                    image && <img style={{ width: "200px", height: "150px" }} src={image.url} alt={product.name} />
                ))
            ) : (
                <img style={{ width: "200px", height: "150px" }} src="https://i.imgur.com/6XK9X4u.png" alt={product.name} />
            )}
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <Link to={`/user/${product.seller?.id}`}>
                    <p>Seller: {product.seller?.username}</p>
                </Link>
            </div>
            <select className="select-quantity" onChange={quantityUpdate}>
                <option>Select Quantity</option>
                {maxAvailable.map(number => (
                    <option>{number}</option>
                ))}
            </select>
            <div className="cart-button" onClick={addCartClick}>
                <OpenModalButton
                    modalClass="add-cart-button"
                    buttonText="Add to cart"
                    modalDisabled={disableButton}
                    modalComponent={
                        <AddToCart product={product} quantity={quantity} />
                    }
                />
            </div>
        </div>
    );
}

export default SingleProduct;
