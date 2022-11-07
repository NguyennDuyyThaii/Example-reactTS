import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store.hooks";
import { addProduct, addProductAsync, getErrorMessage } from "./ProductsSlice";

interface Product {
  title: string;
  price: number;
  id: string;
}

const ProductForm: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const errorMessage = useSelector(getErrorMessage);
  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    price: 0,
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setProduct((prev) => {
      (prev as any)[name] = value;
      const newValue = { ...prev };

      return newValue;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProductAsync(product));
  };
  return (
    <>
      <h2>Add game to the store</h2>
      {errorMessage && <span>error: {errorMessage}</span>}
      <form onSubmit={handleSubmit}>
        <input
          style={{ border: errorMessage ? "1px solid red" : "1px solid black" }}
          onChange={handleChange}
          value={product.title}
          type="text"
          placeholder="Game title"
          name="title"
        />
        <input
          style={{ border: errorMessage ? "1px solid red" : "1px solid black" }}
          onChange={handleChange}
          value={product.price}
          type="number"
          placeholder="price"
          name="price"
        />
        <input
          style={{ border: errorMessage ? "1px solid red" : "1px solid black" }}
          onChange={handleChange}
          value={product.id}
          type="text"
          placeholder="id"
          name="id"
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default ProductForm;
