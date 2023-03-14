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

// Get all products
export const getAllProducts = () => async (dispatch) => {
  const response = await fetch("/api/product/");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllProducts(data));
    return data;
  }
};

// Get a single product
export const getSingleProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/product/${productId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setSingleProduct(data));
    return data;
  }
};

// Create a new product
export const createProduct = (product, images) => async (dispatch) => {
  const { title, description, price, quantity, userId } = product;

  const response = await fetch("/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      description,
      price,
      quantity,
      userId
    }),
  });
  const productData = await response.json();

  let imageResponse;

  if (response.ok) {
    for (let i = 0; i < images.length; i++) {

      if (images[i] === "") continue;
      imageResponse = await fetch(`/api/product/${productData.id}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: images[i],
          preview: true,
          productId: productData.id,
        }),

      });
      if (!imageResponse.ok) {
        return `something went wrong when creating image number ${i}`;
      }
    }
  } else {
    return "something went wrong when creating product";
  }

  if (imageResponse.ok) {
    const final = await fetch(`/api/product/${productData.id}`);
    if (final.ok) {
      const finalResponse = await final.json();
      dispatch(setSingleProduct(finalResponse));
      return finalResponse;
    }
  } else {
    return "something went wrong when creating images";
  }
};

// Edit a product
export const editProduct = (product, images) => async (dispatch) => {
  const { title, description, price, quantity, userId } = product;

  const response = await fetch("/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      description,
      price,
      quantity,
      userId
    }),
  });
  const productData = await response.json();

  let imageResponse;

  if (response.ok) {
    for (let i = 0; i < images.length; i++) {

      if (images[i] === "") continue;
      imageResponse = await fetch(`/api/product/${productData.id}/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: images[i],
          preview: true,
          productId: productData.id,
        }),

      });
      if (!imageResponse.ok) {
        return `something went wrong when creating image number ${i}`;
      }
    }
  } else {
    return "something went wrong when creating product";
  }

  if (imageResponse.ok) {
    const final = await fetch(`/api/product/${productData.id}`);
    if (final.ok) {
      const finalResponse = await final.json();
      dispatch(setSingleProduct(finalResponse));
      return finalResponse;
    }
  } else {
    return "something went wrong when creating images";
  }
};

// Delete a product
export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/product/${productId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeProduct());
    return response;
  }
};

const initialState = { allProducts: {}, singleProduct: {} };

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
