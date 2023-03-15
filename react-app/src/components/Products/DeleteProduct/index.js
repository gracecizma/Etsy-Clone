// create delete product modal 

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteProduct, getProductsDetails, getProducts } from "../../../store/products";
import "./DeleteProductModal.css";


function DeleteProduct({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const productId = useParams().productId;
    const divRef = useRef(null);


    const handleDeleteProduct = () => {
        dispatch(deleteProduct(productId)).then(() => {
            dispatch(getProducts());
            history.push("/products");
        })
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className="modal">
            <h3>Are you sure you want to delete this product?</h3>
            <button className="delete-button-model" onClick={handleDeleteProduct}>Yes</button>
            <button className="delete-button-model" onClick={handleCloseModal}>No</button>
        </div>
    );
}