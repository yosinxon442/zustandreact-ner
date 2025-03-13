import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct"; // Yangi sahifani import qildik
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute"; // Login bo‘lganlar uchun sahifa
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

        {/* Faqat login qilgan foydalanuvchilar uchun mahsulot qo‘shish sahifasi */}
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
