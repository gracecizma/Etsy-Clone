import { useSelector } from "react-redux"

function SingleReviewBlock({review}){
 user = useSelector(state=>state.session.user)
//  product = useSelector(state=>state.product."currentProduct or something
//  similar"
//
    
    return (
         <div className="SingleReviewBlock"> 
            <div className="ReviewBlock">
            <p className="username_on_Review">{user.username}'s review</p>
                <div className="RatingsBlock">
                <p>{user.username}'s Rating for </p>

                </div>
            </div>
         </div>)
}

export default SingleReviewBlock