import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../store/products';
import './CreateProduct.css';

const CreateProduct = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState(['']);
    const [errors, setErrors] = useState([]);
    const [quantity, setQuantity] = useState('');

    let product = {
        title,
        description,
        price,
        quantity
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const data = await dispatch(createProduct(product, images));
        if (data) {
        setErrors(data);
        } else {
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
        newImages.push('');
        setImages(newImages);
    };
    
    return (
        <div className='create-product-container'>
        <form className='create-product-form' onSubmit={handleSubmit}>
            <div>
            {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
            ))}
            </div>
            <div>
            <label>Title</label>
            <input
                type='text'
                name='title'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            ></input>
            </div>
            <div>
            <label>Description</label>
            <textarea
                name='description'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            ></textarea>
            </div>
            <div>
            <label>Price</label>
            <input
                type='number'
                name='price'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            ></input>
            </div>
            <div>
            <label>Quantity</label>
            <input
                type='number'
                name='quantity'
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
            ></input>
            </div>
            <div>
            <label>Images</label>
            {images.map((image, idx) => (
                <input
                key={idx}
                type='text'
                name='image'
                onChange={(e) => updateImage(e, idx)}
                value={image}
                ></input>
            ))}
            <button type='button' onClick={addImage}>
                Add Image
            </button>
            </div>
            <button type='submit'>Create Product</button>
        </form>
        </div>
    );
};