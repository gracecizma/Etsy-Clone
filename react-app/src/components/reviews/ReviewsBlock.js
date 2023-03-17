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
    let [page,setPage] = useState(1)
    let [per_page,setPer_Page] = useState(3)

    let ProductReviews = useSelector(state => state.reviews.SingleProductsReviews)
    useEffect(() => {
        return async()=>await dispatch(getReviewsByProduct(id,page,per_page))

    }, [id, dispatch, product,page,per_page]
    )
    function handlePages(e){
        e.preventDefault()
        let buttonValue=e.target.value
        if(page<=1&& +buttonValue<0){
            return
        }
        setPage(page + +buttonValue)
    }

    console.log(ProductReviews, "---------")
    return ProductReviews && (
        <div className="MainBlock">
            Reviews

            <button
            onClick={handlePages}
            value={-1}
            >prev page</button>{page}<button
            onClick={handlePages}
            value={1}
            >next page</button>
               <select
               placeholder="#/Page"
               value={per_page}
               onChange={(e)=>setPer_Page(e.target.value)}
               >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
               </select>
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