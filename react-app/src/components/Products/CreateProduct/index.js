import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/products";
import { useSelector } from "react-redux";
import "./CreateProduct.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const userId = user.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([""]);
  const [errors, setErrors] = useState({});
  const [quantity, setQuantity] = useState("");

  if (!user) {
    history.push("/login")
  }

  let product = {
    title,
    description,
    price,
    quantity,
    userId
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    const imgPattern = /\.(jpg|jpeg|png|gif)$/i;
    if (!images || !imgPattern.test(images) ) {
      newErrors["images"] = "Please add at least one image and make sure its a valid image link 'example: ends with jpg, jpeg, png, gif' ";
    }
    if (!title) {
      newErrors["title"] = "Please add a title";
    }
    if (!description) {
      newErrors["description"] = "Please add a description";
    }
    if (!price) {
      newErrors["price"] = "Please add a price";
    }
    if (!quantity) {
      newErrors["quantity"] = "Please add a quantity";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = await dispatch(createProduct(product, images));
      history.push(`/products/${data.id}`);
    }
  };

  const updateImage = (e, idx) => {
    const newImages = [...images];
    newImages[idx] = e.target.value;
    setImages(newImages);
  };

  const addImage = () => {
    const newImages = [...images];
    newImages.push("");
    setImages(newImages);
  };

  return (
    <div className="create-product-container">
      <form className="create-product-form" onSubmit={handleSubmit}>
        <div>
          {Object.keys(errors).length > 0 && (
            <div className="alert error">
              {Object.values(errors).map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <div>
          {errors["title"] && <div className="error">{errors["title"]}</div>}
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
        </div>
        <div>
          {errors["description"] && (
            <div className="error">{errors["description"]}</div>
          )}
          <label>Description</label>
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div>
          {errors["price"] && <div className="error">{errors["price"]}</div>}
          <label>Price</label>
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          ></input>
        </div>
        <div>
          {errors["quantity"] && (
            <div className="error">{errors["quantity"]}</div>
          )}
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          ></input>
        </div>
        <div>
          {errors["images"] && <div className="error">{errors["images"]}</div>}
          <label>Images</label>
          {images.map((image, idx) => (
            <input
              key={idx}
              type="text"
              name="image"
              onChange={(e) => updateImage(e, idx)}
              value={image}
            ></input>
          ))}
          <button type="button" onClick={addImage}>
            Add Image
          </button>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
