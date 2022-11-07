import React from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../Cart/cart.slice";
import { useAppDispatch } from "../store.hooks";
import { getProductsSelector, removeProduct } from "./ProductsSlice";

interface Product {
    title: string;
    price: number;
    id: string;
  }

const ProductsList: React.FC = ({}) => {
  //const [products, setProducts] = useState<Product[]>([]);
    const products = useSelector(getProductsSelector)
    const dispatch = useAppDispatch()
    const removeFromStore = (id: string) => {
        dispatch(removeProduct(id))
    }

    const addToCartHandle = (product: Product) => dispatch(addToCart(product)) 
  return (
    <div>
      <label>Game list</label>
      {products.map((item) => (
        <div key={item.id}>
          <span>{`${item.title} : ${item.price}`}</span>
          <button onClick={() => addToCartHandle(item)}>Add to cart</button>
          <button onClick={() => removeFromStore(item.id)}>Remove from the store</button>
        </div>
      ))}

    </div>
  );
};

export default ProductsList;
