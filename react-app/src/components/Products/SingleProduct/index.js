import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../../store/products";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    let product = useSelector((state) => state.products.singleProduct);
    
    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [dispatch, id]);


    if (product === undefined) {
        return null;
    }
    
    return (
        <div className="single-product-container">
             {product.images?.length > 0 ? (
                product.images.map((image) => (
                    image && <img style={{width: "200px", height: "150px"}} src={image.url} alt={product.name}  />
                ))
              ) : (
                <img style={{width: "200px", height: "150px"}} src="https://i.imgur.com/6XK9X4u.png" alt={product.name} />
              )}
        <div className="product-info">
         <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Seller: {product.seller?.username}</p>
        </div>
        </div>
    );
    }

export default SingleProduct;
