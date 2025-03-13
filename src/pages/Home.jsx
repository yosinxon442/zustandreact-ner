import { useEffect } from "react";
import useStore from "../context/useStore";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

const Home = () => {
  const { products, user, deleteProduct, editProduct, notifications, fetchProducts } =
    useStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Home page yuklandi. Products:", products);

  return (
    <div>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLoggedIn={!!user} 
              onDelete={() => deleteProduct(product.id)}
              onEdit={(newName, newPrice) =>
                editProduct(product.id, newName, newPrice)
              }
            />
          ))
        ) : (
          <div className="loader"></div>
        )}
      </div>

      <div className="notifications">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
