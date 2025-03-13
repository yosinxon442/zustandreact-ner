import { create } from "zustand";

const useStore = create((set) => ({
  products: JSON.parse(localStorage.getItem("products")) || [],
  favorites: [],
  cart: [],
  notifications: [],
  theme: "light",
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  loginUser: async (username, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login yoki parol noto‘g‘ri!");
      }

      const data = await response.json();
      
      set({ user: data, token: data.accessToken });
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.accessToken);

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
            message: isFavorite
              ? "Mahsulot unlike qilindi!"
              : "Mahsulot like qilindi!",
          },
        ],
      };
    });

    setTimeout(() => {
      set((state) => ({ notifications: state.notifications.slice(1) }));
    }, 1000);
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

    setTimeout(() => {
      set((state) => ({ notifications: state.notifications.slice(1) }));
    }, 1000);
  },
  deleteProduct: (productId) => {
    set((state) => {
      const updatedProducts = state.products.filter(
        (product) => product.id !== productId
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return {
        products: updatedProducts,
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: "error", message: "Mahsulot o‘chirildi!" },
        ],
      };
    });

    setTimeout(() => {
      set((state) => ({ notifications: state.notifications.slice(1) }));
    }, 1000);
  },
  getCurrentUser: async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Foydalanuvchi ma’lumotlarini olishda xatolik!");
      }

      const data = await response.json();
      set({ user: data });
    } catch (error) {
      console.error("Auth xatosi:", error.message);
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

  // fetchProducts: async () => {
  //   try {
  //     const response = await fetch("https://dummyjson.com/products?limit=30");
  
  //     if (!response.ok) {
  //       throw new Error("Server noto‘g‘ri javob qaytardi");
  //     }
  
  //     const data = await response.json();
  //     const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  
  //     const newProducts = [...storedProducts, ...data.products].filter(
  //       (product, index, self) =>
  //         index === self.findIndex((p) => p.id === product.id)
  //     );
  
  //     localStorage.setItem("products", JSON.stringify(newProducts));
  
  //     set({ products: newProducts });
  //   } catch (error) {
  //     console.error("❌ Mahsulotlarni yuklashda xatolik:", error);
  //   }
  // },
 

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
      
      if (reset) {
        storedProducts = [];
      }
      
      const newProducts = [...storedProducts, ...data.products].filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      );
  
      localStorage.setItem("products", JSON.stringify(newProducts));
  
      set({ products: newProducts });
    } catch (error) {
      console.error("❌ Mahsulotlarni yuklashda xatolik:", error);
    }
  },



  addProduct: (newProduct) => {
    set((state) => {
      const updatedProducts = [...state.products, { id: Date.now(), ...newProduct }];
  
      localStorage.setItem("products", JSON.stringify(updatedProducts));
  
      return {
        products: updatedProducts,
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: "success", message: "Mahsulot qo‘shildi!" },
        ],
      };
    });
  
    setTimeout(() => {
      set((state) => ({ notifications: state.notifications.slice(1) }));
    }, 1000);
  },

  editProduct: (productId, newName, newPrice) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId
          ? { ...product, name: newName, price: newPrice }
          : product
      );

      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return {
        products: updatedProducts,
        notifications: [
          ...state.notifications,
          { id: Date.now(), type: "info", message: "Mahsulot yangilandi!" },
        ],
      };
    });

    setTimeout(() => {
      set((state) => ({ notifications: state.notifications.slice(1) }));
    }, 1000);
  },

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  clearFavorites: () => {
    set({ favorites: [] });
  },

  getTotalCartPrice: () => {
    return useStore.getState().cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getTotalFavorites: () => {
    return useStore.getState().favorites.length;
  },
}));

export default useStore;
