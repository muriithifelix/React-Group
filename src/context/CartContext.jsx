import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...product, quantity: 1 }];
    });

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id, quantity) =>
    setItems((prev) =>
      quantity < 1 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );

  const clearCart = () => setItems([]);

  const { total, count } = useMemo(
    () => ({
      total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, total, count, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
