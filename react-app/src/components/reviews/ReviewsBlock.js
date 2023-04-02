import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SingleReviewBlock from './SingleReviewBlock'
import { getReviewsByProduct } from "../../store/reviews"
import OpenModalButton from '../OpenModalButton/index'
import { useModal } from "../../context/Modal"
import UpdateReviewsModal from "./UpdateReviewsModal"
import DeleteReviewModal from "./DeleteReviewModal"
import ReviewModal from "./ReviewsModal"
import './ReviewCss.css'


const MainReviewBlock = ({ id, product, user }) => {
    let { closeMenu } = useModal()
    let dispatch = useDispatch()
    let [page, setPage] = useState(1)
    let [per_page, setPer_Page] = useState(3)
    // let Product = useSelector(state => state.products.SingleProduct)
    let ProductReviews = useSelector(state => state.reviews.SingleProductsReviews)
    useEffect(() => {
        dispatch(getReviewsByProduct(id, page, per_page))

    }, [id, dispatch, product, page, per_page, product.avg_rating]
    )
    function handlePages(e) {
        e.preventDefault()
        let buttonValue = e.target.value
        if (page <= 1 && +buttonValue < 0) {
            return
        }
        setPage(page + +buttonValue)
    }

    return ProductReviews && (
        <div className="MainBlock">
            <p>{product?.total_reviews}{product?.total_reviews == 1 ? ' Review' : ' Reviews'}</p>
            <p>Average Star Rating: {product?.avg_rating || 0.0}</p>
            <div className="pagination">
            <button
                className="ReviewPageButton"
                onClick={handlePages}
                value={-1}
            >{"<="}</button>{page}<button
                className="ReviewPageButton"
                onClick={handlePages}
                value={1}
            >{"=>"}</button>
            <select
                placeholder="#/Page"
                value={per_page}
                onChange={(e) => setPer_Page(e.target.value)}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
            </select></div>
            <div className="MainSubBlock">
                <OpenModalButton
                    buttonText="New Review"
                    onItemClick={closeMenu}
                    modalComponent={<ReviewModal product_id={product?.id} />}
                />
                {Object.values(ProductReviews).map((review) => {
                    return (
                        <>
                            <SingleReviewBlock key={review.id} review={review} />
                            {review.author.id === user?.id ? (<><OpenModalButton
                                buttonText="Delete"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteReviewModal review={review} page={page} per_page={per_page} />}
                            />
                                <OpenModalButton
                                    buttonText="Update"
                                    onItemClick={closeMenu}
                                    modalComponent={<UpdateReviewsModal Review={review} />}
                                /></>) : ""}
                        </>
                    )

                })}

            </div>
        </div>
    )
}

export default MainReviewBlock