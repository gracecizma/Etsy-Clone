import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { SingleReviewBlock } from './SingleReviewBlock'
import { getReviewsByProduct } from "../../store/reviews"

const MainReviewBlock = () => {
    let Product = useSelector(state.products.singleProduct)
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
                {ProductReviews.forEach((review) => { <SingleReviewBlock key={review.id} review={review} /> })}

            </div>
        </div>
    )
}

export default MainReviewBlock