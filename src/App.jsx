
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
//import CatalogPage from "./pages/CatalogPage";
//import ProductDetailPage from "./pages/ProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
//import CartPage from "./pages/CartPage";
//import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/catalog" element={<CatalogPage />} /> */}
     {/*<Route path="/products/:id" element={<ProductDetailPage />} />*/} 
      <Route path="/add-product" element={<AddProductPage />} />
      {/* <Route path="/cart" element={<CartPage />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;
