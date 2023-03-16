import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SingleReviewBlock } from './SingleReviewBlock'
import { getReviewsByProduct } from "../../store/reviews"
import { OpenModalButton } from '../OpenModalButton/index'
import { useModal } from "../../context/Modal"

const MainReviewBlock = () => {
    let { closeMenu } = useModal
    let dispatch = useDispatch()
    let user = useSelector(state => state.session.user)
    let Product = useSelector(state => state.products.singleProduct)
    let ProductReviews = useSelector(state => state.reviews.SingleProductsReviews)
    useEffect(() => {

        return () => {
            dispatch(getReviewsByProduct(Product?.id))
        }
    }, []
    )



    return (
        <div className="MainBlock">
            Reviews
            <div className="MainSubBlock">
                {ProductReviews.forEach((review) => {
                    if (review.user_id === user.id) {
                        <OpenModalButton
                            buttonText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<UpdateReviewModal reviewId={review.id} />}
                        />
                    }
                    <SingleReviewBlock key={review.id} review={review} />
                })}

            </div>
        </div>
    )
}

export default MainReviewBlock