// create delete product modal 

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteProduct, getProductsDetails, getAllProducts } from "../../../store/products";
import "./DeleteProduct.css";


function DeleteProduct({ setShowModal, productId }) {
    const dispatch = useDispatch();
    const history = useHistory();



    const handleDeleteProduct = () => {
        dispatch(deleteProduct(productId)).then(() => {
            dispatch(getAllProducts());
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

export default DeleteProduct;