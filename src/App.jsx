
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
//import CatalogPage from "./pages/CatalogPage";
//import ProductDetailPage from "./pages/ProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
import CatalogPage from "./pages/CatalogPage";
//import CartPage from "./pages/CartPage";
//import NotFoundPage from "./pages/NotFoundPage";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/catalog" element={<CatalogPage />} /> */}
        {/*<Route path="/products/:id" element={<ProductDetailPage />} />*/}
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </CartProvider>
  );
}

export default App;
