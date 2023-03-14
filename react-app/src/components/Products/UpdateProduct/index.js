import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editProduct } from "../../../store/products.js";
import { getSingleProduct } from "../../../store/products.js";
import "./UpdateProduct.css";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const product = useSelector((state) => state.products.singleProduct);
    const user = useSelector((state) => state.session.user);
    const userId = user.id;
    const [title, setTitle] = useState(product.name || "");
    const [description, setDescription] = useState(product.description || "");
    const [price, setPrice] = useState(product.price || "");
    const [images, setImages] = useState(product.images || "");
    const [errors, setErrors] = useState({});
    const [quantity, setQuantity] = useState(product.quantity || "");
    
    if (!user) {
        history.push("/login");
    }

    useEffect(() => {
        const updateFields = async () => {
            const singleProduct = await dispatch(getSingleProduct(id));
            setTitle(singleProduct.name);
            setDescription(singleProduct.description);
            setPrice(singleProduct.price);
            setImages(singleProduct.images);
            setQuantity(singleProduct.quantity);
        };
        updateFields()
    }, [dispatch, id]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let productObj = {
            name: title,
            description,
            price,
            quantity,
            userId,
        };
        
        let newErrors = {};
        if (!images) {
        newErrors["images"] = "Please add at least one image";
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
        const data = await dispatch(editProduct(productObj, images));
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
    
    const removeImage = (idx) => {
        const newImages = [...images];
        newImages.splice(idx, 1);
        setImages(newImages);
        dispatch(editProduct({ ...product, images: newImages }));
    };

    if (Object.keys(product).length === 0 || images.length === 0) {
        return null;
    }
    
    return (
        <div className="create-product-container">
        <h1>Edit Product</h1>
        <form onSubmit={handleSubmit}>
            <div className="create-product-form">
            <div className="create-product-title">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                {errors.title && <div className="error">{errors.title}</div>}
            </div>
            <div className="create-product-description">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                {errors.description && <div className="error">{errors.description}</div>}
            </div>
            <div className="create-product-price">
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                {errors.price && <div className="error">{errors.price}</div>}
            </div>
            <div className="create-product-quantity">
                <label>Quantity</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                {errors.quantity && <div className="error">{errors.quantity}</div>}
            </div>
            <div className="create-product-images">
                <label>Images</label>
                {images.map((image,idx) => (
                <div key={idx} className="create-product-image">
                    <input type="text" value={image.url} onChange={(e) => updateImage(e, idx)} />
                    <button type="button" onClick={() => removeImage(idx)}>
                    Remove
                    </button>
                </div>
                ))}
                <button type="button" onClick={addImage}>
                Add Image
                </button>
                {errors.images && <div className="error">{errors.images}</div>}
            </div>
            <button type="submit">Edit Product</button>
            </div>
        </form>
        </div>
    );
};

export default UpdateProduct;