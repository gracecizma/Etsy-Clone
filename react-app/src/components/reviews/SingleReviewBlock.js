import { useSelector, useDispatch } from "react-redux"
import { getSingleProduct } from "../../store/products"

let review = { id: 1, user_id: 2, product_id: 3, comment: "this is the comment", stars: 5 }
function SingleReviewBlock(review = "No review Supplied", product = "No Product Supplied", shop = "No Shop Supplied") {
    const user = useSelector((state) => { return state?.session?.User })
    //  product = useSelector(state=>state.product."currentProduct or something
    //  similar"

    if (product = "No Product Supplied" ){
       product = {name:"No product Chosen"}
    }

product = {}


        return (
            <div className="SingleReviewBlock">
                        <h7 className="RatingStars"></h7>
                <div className="ReviewBlock">
                    <p className="username_on_Review">{user?.username}'s review for {product.name}</p>
                    <p className="ReviewContent"> {review.comment}</p>
                    <div className="RatingsBlock">
                        <p>{user?.username}'s Rating for {product.name} </p>

                    </div>
                </div>
            </div>)
}

export default SingleReviewBlock