const SET_ALL_PRODUCTS = "products/SET_ALL_PRODUCTS";
const SET_SINGLE_PRODUCT = "products/SET_SINGLE_PRODUCT";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";
const SET_ALL_PRODUCTS_BY_USER = "products/SET_ALL_PRODUCTS_BY_USER";

const setAllProducts = (products) => ({
  type: SET_ALL_PRODUCTS,
  payload: products,
});

const setProductsByUser = (products) => ({
  type: SET_ALL_PRODUCTS_BY_USER,
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

// Get all products by a user
export const getProductsByUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/product/seller/${userId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setProductsByUser(data));
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
  const { id, name, description, price, quantity, userId } = product;

  const response = await fetch(`/api/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      description,
      price,
      quantity,
      userId
    }),
  });
  
  if (response.ok) {
  const productData = await response.json();
  dispatch(setSingleProduct(productData));
  return productData;
  }

  // let imageResponse;

  // if (response.ok) {
  //   for (let i = 0; i < images.length; i++) {
  //     if (images[i] === "") continue;
  //     const imageUrl = images[i].url;
  //     const imageByProduct = await fetch(`/api/product/${productData.id}/image`);
  //     const imageByProductData = await imageByProduct.json();
  //     const imageId = imageByProductData.images[0].id;
  //     imageResponse = await fetch(`/api/product/${productData.id}/image/${imageId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: imageId,
  //         url: imageUrl,
  //         preview: true,
  //         productId: productData.id,
  //       }),

  //     });
  //     if (!imageResponse.ok) {
  //       return `something went wrong when creating image number ${i}`;
  //     }
  //   }
  // } else {
  //   return "something went wrong when creating product";
  // }
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
    case SET_ALL_PRODUCTS_BY_USER:
      return { ...state, allProductsByUser: action.payload };
    case SET_SINGLE_PRODUCT:
      return { ...state, singleProduct: action.payload };
    case REMOVE_PRODUCT:
      return { ...state, singleProduct: null };
    default:
      return state;
  }
}
