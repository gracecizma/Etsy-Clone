import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SingleReviewBlock from './SingleReviewBlock'
import { getReviewsByProduct } from "../../store/reviews"
import OpenModalButton from '../OpenModalButton/index'
import { useModal } from "../../context/Modal"
import UpdateReviewsModal from "./UpdateReviewsModal"
import ReviewModal from "./ReviewsModal"


const MainReviewBlock = () => {
    let { closeMenu } = useModal
    let dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let Product = useSelector(state => state.products.singleProduct)
    let ProductReviews = useSelector(state => state.reviews.SingleProductsReviews)
    useEffect(() => {

        return () => {
            dispatch(getReviewsByProduct(Product.id))
        }
    },
    )


    console.log(ProductReviews, "---------")
    return ProductReviews && (
        <div className="MainBlock">
            Reviews
            <div className="MainSubBlock">
                <OpenModalButton
                    buttonText="New Review"
                    onItemClick={closeMenu}
                    modalComponent={<ReviewModal product_id={Product.id} />}
                />
                {Object.values(ProductReviews).forEach((review) => {
                   
                     <SingleReviewBlock key={review.id} review={review} ></SingleReviewBlock>
                })}

            </div>
        </div>
    )
}

export default MainReviewBlock