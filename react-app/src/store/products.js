

const SET_ALL_PRODUCTS = "products/SET_ALL_PRODUCTS";
const SET_SINGLE_PRODUCT = "products/SET_SINGLE_PRODUCT";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";


const setAllProducts = (products) => ({
    type: SET_ALL_PRODUCTS,
    payload: products,
});

const setSingleProduct = (product) => ({
    type: SET_SINGLE_PRODUCT,
    payload: product,
});

const removeProduct = () => ({
    type: REMOVE_PRODUCT,
});

