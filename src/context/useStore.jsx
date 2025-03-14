import { create } from "zustand";

// LocalStorage'dan user va tokenni olish
const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (error) {
    console.error("❌ LocalStorage'dan userni olishda xatolik:", error);
    return null;
  }
};

const useStore = create((set, get) => ({
  user: getUserFromStorage(),
  token: localStorage.getItem("token") || null,
  products: JSON.parse(localStorage.getItem("products")) || [],
  favorites: [],
  cart: [],
  notifications: [],
  theme: "light",

  getCurrentUser: () => get().user, // 🔹 Funksiya qo‘shildi

  loginUser: async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Login yoki parol noto‘g‘ri!");

      const data = await response.json();
      
      set({ user: data, token: data.token });
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      set((state) => ({
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: "success", message: "Tizimga kirdingiz!" },
        ],
      }));
    } catch (error) {
      set((state) => ({
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: "error", message: error.message },
        ],
      }));
    }
  },

  logoutUser: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), type: "info", message: "Tizimdan chiqdingiz!" },
      ],
    }));
  },

  toggleFavorite: (product) => {
    set((state) => {
      const isFavorite = state.favorites.some((item) => item.id === product.id);
      const updatedFavorites = isFavorite
        ? state.favorites.filter((item) => item.id !== product.id)
        : [...state.favorites, product];

      return {
        favorites: updatedFavorites,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            type: "success",
            message: isFavorite ? "Mahsulot unlike qilindi!" : "Mahsulot like qilindi!",
          },
        ],
      };
    });
  },

  addToCart: (product) => {
    set((state) => {
      const existingCartItem = state.cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existingCartItem) {
        updatedCart = state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...state.cart, { ...product, quantity: 1 }];
      }

      return {
        cart: updatedCart,
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: "success", message: "Savatchaga qo‘shildi!" },
        ],
      };
    });
  },

  fetchProducts: async (page = 1, reset = false) => {
    try {
      const limit = 21;
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  
      if (!response.ok) {
        throw new Error("Server noto‘g‘ri javob qaytardi");
      }
  
      const data = await response.json();
      
      let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      if (reset) storedProducts = [];
      
      const newProducts = [...storedProducts, ...data.products].filter(
        (product, index, self) => index === self.findIndex((p) => p.id === product.id)
      );
  
      localStorage.setItem("products", JSON.stringify(newProducts));
      set({ products: newProducts });
    } catch (error) {
      console.error("❌ Mahsulotlarni yuklashda xatolik:", error);
    }
  },

  toggleTheme: () => {
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  clearFavorites: () => {
    set({ favorites: [] });
  },
}));

export default useStore;
