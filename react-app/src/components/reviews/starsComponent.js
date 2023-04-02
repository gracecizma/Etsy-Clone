// import React, { useState } from 'react'
// import { Rating } from 'react-simple-star-rating'

// export default function MyComponent() {
//   const [rating, setRating] = useState(0) // initial rating value

//   // Catch Rating value
//   const handleRating = (rate) => {
//     setRating(rate)
//     // Some logic
//   }

//   return (
//     <div className='App'>
//       <Rating onClick={handleRating} ratingValue={rating} /* Rating Props */ />
//     </div>
//   )
// }




// 2. RatingView Component Example
// import React, { useState } from 'react'
import { RatingView } from 'react-simple-star-rating'

// export default function MyComponent() {
//   return (
//     <div className='App'>
//       <RatingView ratingValue={2} /* RatingView Props */ />
//     </div>
//   )
// }