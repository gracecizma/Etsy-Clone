import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import { useHistory } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const products = useSelector((state) => state.products);
  const [filter, setFilter] = useState("Relevancy");
  const [display, setDisplay] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  let allProducts = products.allProducts;

  let search = window.location.pathname;

  let splitsearch = search.split("/");
  console.log("path", splitsearch[2]);
  let newstr = splitsearch[2].replace("%20", " ");
  console.log(newstr);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  allProducts = Object.values(allProducts);
  console.log(filter);
  // console.log(allProducts);

  let filteredProducts = [];

  if (allProducts.length) {
    let all = allProducts[0];
    for (let i = 0; i < all.length; i++) {
      // console.log(all[i]);
      // console.log(all[i]["name"]);
      if (all[i]["name"].toLowerCase().includes(newstr.toLowerCase())) {
        filteredProducts.push(all[i]);
      }
    }
  }
  // console.log("filtered", filteredProducts);
  const filterHelper = (a, b) => {
    let d1 = new Date(a.created_at);
    let d2 = new Date(b.created_at);

    return d1.getTime() > d2.getTime();
  };

  useEffect(() => {
    if (filteredProducts.length) {
      console.log(filter);
      if (filter === "Most Recent") {
        filteredProducts = filteredProducts.sort((a, b) => filterHelper);
      }

      if (filter === "Lowest Price") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      }

      if (filter === "Highest Price") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }

      if (filter === "Top Reviewed") {
        filteredProducts.sort((a, b) => a.price < b.price);
      }

      console.log("use hit");
      console.log("filtered", filteredProducts);
      setDisplay(filteredProducts);
    }
  }, [filter]);
  // allProducts = allProducts.filter((product) => product.includes(searchParams));
  // console.log("filtered", filteredProducts);

  // console.log("dis", display);
  if (allProducts.length === 0) {
    return null;
  }

  if (!display.length && !filteredProducts.length) {
    return (
      <div className="no-results">
        <div className="no-results-text">
          {"No Results for '" + newstr.replace("%20", " ") + "'"}
        </div>
        <div className="try-again">
          Try searching for something else instead?
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="all-products-container">
        <div className="filter-results-bar">
          <div className="filter button">
            {" "}
            <form className="filter-form" onSubmit={handleSubmit}>
              <select
                className="filter-round"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="Relevancy">Filter by: Relevancy</option>
                <option value="Lowest Price">Filter by: Lowest Price</option>
                <option value="Highest Price">Filter by: Highest Price</option>
                <option value="Top Reviewed">Filter by: Top Reviewed</option>
                <option value="Most Recent">Filter by: Most Recent</option>
              </select>
            </form>
          </div>

          <div className="num-results">
            {filteredProducts.length ? filteredProducts.length : ""}{" "}
            {filteredProducts.length > 1
              ? "Results"
              : filteredProducts.length === 0
              ? "No Results"
              : "Result"}{" "}
            for {`"${newstr.replace("%20", " ")}"`}
          </div>
        </div>
        <div className="products-container">
          {display.length
            ? display.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => history.push(`/products/${product.id}`)}
                >
                  {/* <Link to={`/products/${product.id}`}> */}
                  <div>
                    {product.images.length > 0 ? (
                      <img
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "7px",
                        }}
                        src={product.images[0].url}
                        alt={product.name}
                      />
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "7px",
                        }}
                        src="https://i.imgur.com/6XK9X4u.png"
                        alt={product.name}
                      />
                    )}

                    <div className="product-info">
                      <div className="product-name">{product.name}</div>
                      <div className="product-reviews">Reviews go here</div>
                      <p className="price">${product.price}</p>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              ))
            : filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => history.push(`/products/${product.id}`)}
                >
                  {/* <Link to={`/products/${product.id}`}> */}
                  <div>
                    {product.images.length > 0 ? (
                      <img
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "7px",
                        }}
                        src={product.images[0].url}
                        alt={product.name}
                      />
                    ) : (
                      <img
                        style={{
                          width: "100%",
                          height: "250px",
                          borderRadius: "7px",
                        }}
                        src="https://i.imgur.com/6XK9X4u.png"
                        alt={product.name}
                      />
                    )}

                    <div className="product-info">
                      <div className="product-name">{product.name}</div>
                      <div className="product-reviews">Reviews go here</div>
                      <p className="price">${product.price}</p>
                      <p className="product-description">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
