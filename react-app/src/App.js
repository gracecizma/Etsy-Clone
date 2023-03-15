import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import AllProducts from "./components/Products/AllProducts";
import SingleProduct from "./components/Products/SingleProduct";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateProduct from "./components/Products/CreateProduct";
import UpdateProduct from "./components/Products/UpdateProduct";
import Profile from "./components/User/Profile";
import SingleReviewBlock from "./components/reviews/SingleReviewBlock"
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact={true} path="/products">
            <AllProducts />
          </Route>
          <Route path="/products/new">
            <CreateProduct />
          </Route>
          <Route path="/products/:id/edit">
            <UpdateProduct />
          </Route>
          <Route path="/products/:id">
            <SingleProduct />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
