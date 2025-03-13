import { useEffect } from "react";
import useStore from "../context/useStore";

const ProductList = () => {
  const { products, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts(); 
  }, []);

  return (
    <div>
      <h2>Mahsulotlar</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            {product.category}
            {product.title} - {product.price} so'm
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
