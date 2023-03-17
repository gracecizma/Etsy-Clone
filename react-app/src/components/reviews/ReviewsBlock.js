import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SingleReviewBlock from './SingleReviewBlock'
import { getReviewsByProduct } from "../../store/reviews"
import OpenModalButton from '../OpenModalButton/index'
import { useModal } from "../../context/Modal"
import UpdateReviewsModal from "./UpdateReviewsModal"
import ReviewModal from "./ReviewsModal"
import './ReviewCss.css'


const MainReviewBlock = ({ id, product, user }) => {
    let { closeMenu } = useModal()
    let dispatch = useDispatch()

    let ProductReviews = useSelector(state => state.reviews.SingleProductsReviews)
    useEffect(() => {
        dispatch(getReviewsByProduct(id))

    }, [id, dispatch, product]
    )


    console.log(ProductReviews, "---------")
    return ProductReviews && (
        <div className="MainBlock">
            Reviews
            <div className="MainSubBlock">
                <OpenModalButton
                    buttonText="New Review"
                    onItemClick={closeMenu}
                    modalComponent={<ReviewModal product_id={product.id} />}
                />
                {Object.values(ProductReviews).map((review) => {
                    return (<SingleReviewBlock key={review.id} review={review}/>)
                })}

            </div>
        </div>
    )
}

export default MainReviewBlock