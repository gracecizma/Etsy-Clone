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
        <div key={product.id} className="product-card">
          {/* <Link to={`/product/${product.id}`}>
                <img src={product.imageUrl} alt={product.name} />
            </Link> */}
          <div className="product-info">
            <Link to={`/product/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
