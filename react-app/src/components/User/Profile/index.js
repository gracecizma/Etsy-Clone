import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteProduct, getProductsByUser } from "../../../store/products";
import DeleteProduct from "../../Products/DeleteProduct";
import { getAllUsers } from "../../../store/session";
import "./Profile.css";

const missingImage = "https://i.imgur.com/6vKJZ0X.png";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userProducts, setUserProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  const loggedInUser = useSelector((state) => state.session.user);
  const allUsers = useSelector((state) => state.session.users);
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef(null);
  let user;
  const history = useHistory();

  const handleShowModal = (productId) => {
    setShowModal(true);
    setProductId(productId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productsByUser = await dispatch(getProductsByUser(id));
      const users = await dispatch(getAllUsers());
      setUserProducts(Object.values(productsByUser));
      const user =
        users && users[0] && users[0].find((user) => user.id === parseInt(id));
    };
    fetchData();
    function handleCloseModal(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [dispatch, id]);

  if (allUsers === undefined) {
    return null;
  }

  if (userProducts.length === 0) {
    return null;
  }

  const users = Object.values(allUsers);
  user = users[0].find((user) => user.id === parseInt(id));

  const products = userProducts;

  if (products[0][0]?.images[0]?.length === 0) {
    return null;
  }


  return (
    <>
      {showModal && (
        <div ref={divRef} className="delete-product-modal">
          <DeleteProduct setShowModal={setShowModal} productId={productId} />
        </div>
      )}
      <div className="profile-container">
        <div className="profile-header">
          <h1>Profile</h1>
        </div>
        <div className="profile-body">
          <div className="profile-info">
            <div className="profile-info-header">
              <h2>Profile Info</h2>
            </div>
            <div className="profile-info-body">
              <div className="profile-info-body-left">
                <div className="profile-info-body-left-item">
                  <h3>Username</h3>
                  <p>{user.username}</p>
                </div>
                <div className="profile-info-body-left-item">
                  <h3>Email</h3>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="user-products-section">
                <div className="user-products-header">
                  <h2>My Products</h2>
                  {user.id === Number(id) && (
                    <button
                      className="add-product-button"
                      onClick={() => history.push("/products/new")}
                    >
                      Add Product
                    </button>
                  )}
                  <div className="user-products-body">
                    {products[0].map((product) => (
                      <div className="user-product-card">
                        <div className="user-product-card-image">
                          {product.images[0] && (
                            <img
                              style={{ width: "200px", height: "150px" }}
                              src={product.images[0].url}
                              alt={product.name}
                            />
                          )}
                        </div>
                        <div className="user-product-card-info">
                          <div className="user-product-card-info-top">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                          </div>
                          {user.id === Number(id) && (
                            <div className="user-product-card-buttons">
                              <button
                                className="user-product-card-button"
                                onClick={() =>
                                  history.push(`/products/${product.id}/edit`)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="user-product-card-button"
                                onClick={() => handleShowModal(product.id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
