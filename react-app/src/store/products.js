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

const initialState = { allProducts: null, singleProduct: null };

// Get all products
export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllProducts(data));
    return data;
  }
};

// Get a single product
export const getSingleProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setSingleProduct(data));
    return data;
  }
};

// Create a new product
export const createProduct = (product) => async (dispatch) => {
  const { name, description, price, imageUrl, userId } = product;
  const response = await fetch("/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      price,
      userId,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    const imageResponse = await fetch(`/api/products/${data.id}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: imageUrl,
        preview: true,
        productId: data.id,
      }),
    });

    dispatch(setSingleProduct(data));
    return data;
  }
};

// Edit a product
export const editProduct = (product) => async (dispatch) => {
  const { id, name, description, price, imageUrl, userId } = product;
  const response = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      price,
      userId,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    const imageResponse = await fetch(`/api/products/${data.id}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: imageUrl,
        preview: true,
        productId: data.id,
      }),
    });

    dispatch(setSingleProduct(data));
    return data;
  }
};

// Delete a product
export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeProduct());
    return response;
  }
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    case SET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.payload };
    case REMOVE_PRODUCT:
      return { ...state, singleProduct: null };
    default:
      return state;
  }
}