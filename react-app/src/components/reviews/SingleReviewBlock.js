import { useSelector, useDispatch } from "react-redux"
// import { getSingleProduct } from "../../store/products"

// let review = { id: 1, user_id: 2, product_id: 3, comment: "this is the comment", stars: 5 }
function SingleReviewBlock({ review }) {
    const user = useSelector((state) => state.session.user)
    const product = useSelector((state) => state.product.SingleProduct)



    return (
        <div className="SingleReviewBlock">
            <div className="ReviewBlock">
                <p className="username_on_Review">{user?.username}'s review for {product.name}</p>
                <div className="RatingsBlock">
                    <p>*StarsIcon*:{review.stars}</p>
                    <p className="ReviewContent"> {review.comment}</p>

                </div>
            </div>
        </div>)
}

export default SingleReviewBlock