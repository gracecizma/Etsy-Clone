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


    if (!product) {
        return null;
    }
    
    return (
        <div className="single-product-container">
        {/* <img src={product.imageUrl} alt={product.name} /> */}
        <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
        </div>
    );
    }

export default SingleProduct;
