import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../../store/products";
import { useModal } from "../../context/Modal";
import "./SearchFilterModal.css";

function SearchFilterModal() {
  const dispatch = useDispatch();
  //   const [order, setOrder] = useState("");
  //   const [price, setPrice] = useState("");

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(getAllProducts());
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Choose your filter</h1>
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Filter Types"
          name="FilterTypes"
          isMulti={false}
          options={[
            { label: "Relevancy", value: 1 },
            { label: "Lowest Price", value: 2 },
            { label: "Highest Price", value: 3 },
            { label: "Top Customer Reviews", value: 4 },
            { label: "Most Recent", value: 5 },
          ]}
        ></SelectField>
      </form>
    </>
  );
}

export default SearchFilterModal;
