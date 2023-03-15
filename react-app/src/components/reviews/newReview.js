import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";


const CreateReview = ({
  product_Id
}) => {
  const dispatch = useDispatch();
  let [productId, setProductId] = useState(product_Id)
  let [review, setReview] = useState("");
  let [stars, setStars] = useState(0);
  let [errors, setErrors] = useState([])

  let handleSubmit = (e)=>{
    e.preventDefault()
    if 
  }

  return (
    <div className="CreateReviewForm">
      <h1>Please enter Your Review!</h1>

      <form>
        <div>{Object.keys(errors).length > 0 && (
          <div className="alert error">
            {Object.values(errors).map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        </div>
        
        <label>
                <textArea
                value={review}
                placeholder={`${review}`}
                onChange={(e)=>setReview(e.target.value)}
                className="formInput"
                ></textArea>
            </label>
            <label>Stars
            
            </label>
      </form>
    </div>
  )

}

export default CreateReview