import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../store/products";
import { Link } from "react-router-dom";
import "./AllProducts.css";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  let allProducts = products.allProducts;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  allProducts = Object.values(allProducts);

  if (allProducts.length === 0) {
    return null;
  }

  return (
    <div className="all-products-container">
      {allProducts[0].map((product) => (
        <Link to={`/products/${product.id}`}>
        <div key={product.id} className="product-card">
          
               {product.images.length > 0 ? (
                <img style={{width: "200px", height: "150px"}} src={product.images[0].url} alt={product.name}  />
              ) : (
                <img style={{width: "200px", height: "150px"}} src="https://i.imgur.com/6XK9X4u.png" alt={product.name} />
              )}
           
          <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            <p>${product.price}</p>
            
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default AllProducts;
