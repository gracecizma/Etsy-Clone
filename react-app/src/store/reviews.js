// ! constants 
const CREATE_REVIEW = "create Review"
const READ_REVIEW_ALL = "Read all Reviews"
const READ_REVIEW_ONE = "Read Reviews by id"
const READ_REVIEW_USERS = "Read a Users Reviews"
const READ_REVIEW_PRODUCT = "Read a products reviews"
const UPDATE_REVIEW = "update Review"
const DELETE_REVIEW = "delete Review"

// # actions creators

export function createReview(formData) {
    return { type: CREATE_REVIEW, payload: formData }
}
export function deleteReview(reviewId) {
    return { type: DELETE_REVIEW, payload: reviewId }
}

export function updateReview(review) {
    return { type: UPDATE_REVIEW, payload: review }
}

export function SingleReview(review) {
    return { type: READ_REVIEW_ONE, payload: review }
}

export function UsersReviews(reviews) {
    return { type: READ_REVIEW_USERS, payload: reviews }
}

export function productsReviews(reviews) {
    return { type: READ_REVIEW_PRODUCT, payload: reviews }
}
// Thunks 

export const CreateReviewThunk = (ReviewData) => async (dispatch) => {

    console.log("---", ReviewData)
    let { user_id, product_id, stars, comment } = ReviewData

    const response = await fetch(`/api/reviews/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, product_id, stars, comment }),
    });
    if (response.ok) {
        let formData = await response.json()
        dispatch(createReview(formData))
        return formData
    }

}


export const UpdateReviewThunk = (ReviewData) => async (dispatch) => {

    let { id, comment, stars } = ReviewData

    const response = await fetch(`/api/reviews/${ReviewData.id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment,
            stars,
        }),
    });
    if (response.ok) {
        let data = await response.json()
        dispatch(updateReview(data))
        return data
    }

}


export const grabAReviewThunk = (reviewId) => async dispatch => {
    let review = await fetch(`api/reviews/${reviewId}`)

    if (review.ok) {
        let res = await review.json()
        dispatch(SingleReview(res))
        return res

    }

}

export const getReviewsByUser = (userId) => async dispatch => {
    let response = await fetch(`/api/reviews/user/${userId}`)
    if (response.ok) {
        let data = await response.json()
        dispatch(UsersReviews(data))
    }

}

export const getReviewsByProduct = (productId, page, per_page) => async dispatch => {
    let response = await fetch(`/api/reviews/product/${productId}?page=${page}&per_page=${per_page}`)
    if (response.ok) {
        let data = await response.json()
        dispatch(productsReviews(data))
    }

}
export const deleteReviewThunk= (reviewId) =>async dispatch=>{
    
}

const initialState = { LoggedInUsersReviews: {}, SelectedReview: {}, SingleProductsReviews: {} }


const ReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REVIEW:
            let afterCreate = { ...state }
            afterCreate["LoggedInUsersReviews"] = { ...state.LoggedInUsersReviews, [action.payload.id]: action.payload }
            afterCreate["SingleProductsReviews"] = { ...state.SingleProductsReviews, [action.payload.id]: action.payload }

            return afterCreate
        case UPDATE_REVIEW:
            let afterUpdate = { ...state }
            afterUpdate["LoggedInUsersReviews"] = { ...state.LoggedInUsersReviews, [action.payload.id]: action.payload }
            afterUpdate["SingleProductsReviews"] = { ...state.SingleProductsReviews, [action.payload.id]: action.payload }

            return afterUpdate
        // case DELETE_REVIEW:
        //     break
        // case READ_REVIEW_ALL:
        //     return {...state,LoggedInUsersReviews:action.payload}
        // case READ_REVIEW_ONE:
        //     break
        case READ_REVIEW_PRODUCT:
            let afterProductRead = { ...state }
            afterProductRead.SingleProductsReviews = {}
            action.payload.forEach(review => afterProductRead.SingleProductsReviews[review.id] = review)
            return afterProductRead
        case READ_REVIEW_USERS:
            let afterRead = { ...state }
            action.payload.forEach(review => afterRead.LoggedInUsersReviews[review.id] = review)
            return afterRead
        default:
            return state
    }
}


export default ReviewsReducer