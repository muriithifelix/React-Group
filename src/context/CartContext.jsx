
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

const STORAGE_KEY = "bestbuy-cart";

function getSavedCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getSavedCart);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Get remaining stock
  const getAvailableStock = (product) => {
    const stock = Math.max(0, Number(product.stock) || 0);

    const existingItem = cartItems.find(
      (item) => String(item.id) === String(product.id)
    );

    return Math.max(0, stock - (existingItem?.quantity || 0));
  };

  // Add a product to cart
  const addToCart = (product) => {
    const availableStock = getAvailableStock(product);

    if (availableStock <= 0) {
      return false;
    }

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        return previousItems.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                ...product,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousItems,
        { ...product, quantity: 1 },
      ];
    });

    return true;
  };

  // Remove product completely
  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  };

  // Increase quantity without exceeding stock
  const increaseQuantity = (productId) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (String(item.id) !== String(productId)) {
          return item;
        }

        const stock = Math.max(0, Number(item.stock) || 0);

        if (item.quantity >= stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          String(item.id) === String(productId)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total number of items
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
    cartTotal,
    getAvailableStock,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
