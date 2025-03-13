import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import ProductCard from "../components/ProductCard";
import useStore from "../context/useStore";
import "../styles/home.css";

const Products = () => {
  const { user } = useStore();
  const [page, setPage] = React.useState(1);

  const fetchProducts = async (page) => {
    const limit = 21;
    const skip = (page - 1) * limit;
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
    keepPreviousData: true,
  });

  if (isLoading) return <div className="loader">Loading...</div>;
  if (isError) return <div className="error-message">Error fetching products</div>;

  return (
    <div>
      <div className="products-grid">
        {data.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isLoggedIn={!!user}
          />
        ))}
      </div>
      <div className="pagination">
        <Pagination
          defaultCurrent={1}
          total={data.total}
          pageSize={21}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Products;