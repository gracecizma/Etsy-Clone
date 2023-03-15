import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <ul className="nav-items">
            <li className="nav-left">
              <NavLink className={".nav-home"} exact to="/">
                Handmade Haven
              </NavLink>
            </li>
            <div className="search-container">
              <div className="search-form">
                <form className="search-form">
                  <input
                    placeholder="Search for anything"
                    className="search-form-input"
                  ></input>
                </form>
              </div>
            </div>
            {isLoaded && (
              <>
                <div className="nav-right">
                  <div className="profile-box">
                    <ProfileButton user={sessionUser} />
                  </div>
                  <div className="cart-box">
                    <NavLink exact to="/shopping_cart">
                      <i className="fas fa-shopping-cart fa-lg"></i>
                    </NavLink>
                  </div>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navigation;
