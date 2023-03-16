import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { Rating } from 'react-simple-star-rating'
import { CreateReviewThunk } from "../../store/reviews";




function ReviewModal({ product_id }) {

    const dispatch = useDispatch();
    let [review, setReview] = useState('')
    let [rating, setRating] = useState(0)
    let user_id = useSelector(state => state.session.user.id)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        let Errors = []
        if (review.length > 500) {
            Errors.push("Reviews must be 500 Characters or less!!")
        }
        if (rating < 0 || rating > 5) {
            Errors.push("Ratings Are Positive Numbers Under 5!!")
        }
        if (!Errors.length) {
            dispatch(CreateReviewThunk({ "comment": review, "stars": rating, "user_id": user_id, "product_id": product_id }))
            closeModal()

        }
        else {
            setErrors(Errors)
        }
    }
    return (
        <>
            <div className="modal-Review">
                <h1>Add a Review!</h1>
                <form className="createReviewForm" onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li className="createReviewsErrors" key={idx}>
                                {error}
                            </li>
                        ))}
                    </ul>
                    <label>Review</label>
                    <textarea
                        placeholder="how was your purchase?"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}

                    />

                    <label>Rating</label>
                    <Rating onClick={handleRating} ratingValue={rating} ></Rating>


                    <button className="ReviewButton" type="submit">
                        Publish Review
                    </button>
                </form>
            </div>
        </>
    );
}

export default ReviewModal;
