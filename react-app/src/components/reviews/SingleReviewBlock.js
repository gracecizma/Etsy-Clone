import { useSelector, useDispatch } from "react-redux"
// import { getSingleProduct } from "../../store/products"
import "./ReviewCss.css"
import { RatingView } from 'react-simple-star-rating'

function SingleReviewBlock({ review, user, product }) {




    return (
        <div className="SingleReview">
            <div className="ReviewBlock">
                <p className="username_on_Review">{review["author"].username}'s review for {review["product"].name}</p>
                <div className="RatingsBlock">
                    <p><RatingView ratingValue={review.stars} stars={5}></RatingView></p>
                    <p className="ReviewContent"> {review.comment}</p>

                </div>
            </div>
        </div>)
}

export default SingleReviewBlock