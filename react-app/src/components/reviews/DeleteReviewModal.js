import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk, getReviewsByProduct } from "../../store/reviews";

const DeleteReviewModal = ({
    review,page,per_page
}) => {

    const { closeModal } = useModal();
    let dispatch = useDispatch();
    function handleClick(e) {
        e.preventDefault() 
        dispatch(deleteReviewThunk(review.id)).then(() => {
            dispatch(getReviewsByProduct(review.product.id, page, per_page));
        }).then(closeModal())
    }

    return (
        <>
            <div className="modal">
                <form
                    className="Form"
                    onSubmit={handleClick}>
                    <h2>Are you certain you'd like to delete this review?</h2>
                    <button type="submit" className="formButton">
                        yes
                    </button>
                    <button className="formButton cancel" onClick={closeModal}>
                        cancel
                    </button>
                </form>
            </div>
        </>
    );
};

export default DeleteReviewModal;
