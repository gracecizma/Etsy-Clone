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

    let { product_id, user_id, comment, stars } = ReviewData

    const response = await fetch(`/api/reviews/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id,
            product_id,
            comment,
            stars,
        }),
    });
    if (response.ok) {
        let formData = response.json()
        dispatch(createReview(formData))
        return formData
    }

}


export const UpdateReviewThunk = (ReviewData) => async (dispatch) => {

    let { id, comment, stars } = ReviewData

    const response = await fetch(`/api/reviews/${ReviewData.id}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment,
            stars,
        }),
    });
    if (response.ok) {
        let data = response.json()
        dispatch(updateReview(data))
        return data
    }

}


export const grabAReviewThunk = (reviewId) => async dispatch => {
    let review = await fetch(`api/reviews/${reviewId}`)

    if (review.ok) {
        let res = review.json()
        dispatch(SingleReview(res))
        return res

    }

}

export const getReviewsByUser = (userId) => async dispatch => {
    let response = await fetch(`/api/reviews/user/${userId}`)
    if (response.ok) {
        let data = response.json()
        dispatch(UsersReviews(data))
    }

}

export const getReviewsByProduct = (productId) => async dispatch => {
    let response = await fetch(`/api/reviews/product/${productId}`)
    if (response.ok) {
        let data = response.json()
        dispatch(productsReviews(data))
    }

}


const initialState = { LoggedInUsersReviews: {}, SelectedReview: {}, SingleProductsReviews: {} }


const ReviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REVIEW:
            break
        case UPDATE_REVIEW:
            break
        case DELETE_REVIEW:
            break
        case READ_REVIEW_ALL:
            break
        case READ_REVIEW_ONE:
            break
        case READ_REVIEW_PRODUCT:
            break
        case READ_REVIEW_USERS:
            break
        default:
            return state
    }
}


export default ReviewsReducer