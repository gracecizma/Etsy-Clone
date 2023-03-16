import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../../store/products";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let product = useSelector((state) => state.products.singleProduct);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (product === undefined) {
    return null;
  }

  return (
    <div className="single-product-container">
      <div className="images-row">
        {product.images?.length > 0 ? (
          product.images.map(
            (image) =>
              image && (
                <>
                  <img
                    className="single-product-img"
                    src={image.url}
                    alt={product.name}
                  />
                </>
              )
          )
        ) : (
          <img
            className="single-product-img"
            src="https://i.imgur.com/6XK9X4u.png"
            alt={product.name}
          />
        )}
      </div>
      <div className="product-info">
        <h3 className="single-product-name">{product.name}</h3>
        <p className="single-product-price">${product.price}</p>
        <p className="tax">Tax included (where applicable), plus postage</p>
        <p>{product.description}</p>

        <p>Seller: {product.seller?.username}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
