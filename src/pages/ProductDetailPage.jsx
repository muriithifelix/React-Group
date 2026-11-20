
import { useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle,
  Package,
  ShieldCheck,
  Truck,
  Trash2,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { getProductById } from "../api/api";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";

const API_URL = "http://localhost:3000/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    getAvailableStock,
    cartCount,
    removeFromCart,
  } = useCart();

  const fetchProduct = useCallback(
    () => getProductById(id),
    [id]
  );

  const {
    data: product,
    loading,
    error,
  } = useFetch(fetchProduct, [fetchProduct]);

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);

  const availableStock = product
    ? getAvailableStock(product)
    : 0;

  const formatPrice = (price) =>
    `$${Number(price || 0).toFixed(2)}`;

  // Add product to cart
  const handleAddToCart = () => {
    if (!product || quantity > availableStock) {
      setMessage("Requested quantity exceeds available stock.");
      return;
    }

    let added = true;

    for (let i = 0; i < quantity; i++) {
      if (!addToCart(product)) {
        added = false;
        break;
      }
    }

    if (added) {
      setMessage(`${quantity} item(s) added to your cart successfully!`);
      setQuantity(1);
    } else {
      setMessage("Some items could not be added because of stock limits.");
    }
  };

  // Delete product entirely
  const handleDeleteProduct = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${product.title || product.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setMessage("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product. Please try again.");
      }

      // Remove the deleted product from the shopping cart
      removeFromCart(product.id);

      alert("Product deleted successfully!");

      navigate("/catalog");
    } catch (err) {
      setMessage(err.message || "Unable to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  // Navigation
  const Navigation = () => (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-violet-700"
        >
          ShopFront<span className="text-gray-900">.</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-violet-700"
          >
            Home
          </Link>

          <Link
            to="/catalog"
            className="font-medium text-gray-700 transition hover:text-violet-700"
          >
            Shop
          </Link>

          <Link
            to="/add-product"
            className="font-medium text-gray-700 transition hover:text-violet-700"
          >
            Add Product
          </Link>
        </div>

        <Link
          to="/cart"
          className="relative rounded-full bg-violet-50 p-3 text-violet-700 transition hover:bg-violet-100"
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <ShoppingCart size={22} />

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-700 px-1 text-xs font-bold text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row">
        <div>
          <Link to="/" className="text-2xl font-extrabold">
            ShopFront<span className="text-violet-400">.</span>
          </Link>

          <p className="mt-2 text-sm text-gray-400">
            Your shopping experience starts here.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
          <Link to="/" className="transition hover:text-violet-400">
            Home
          </Link>

          <Link to="/catalog" className="transition hover:text-violet-400">
            Shop
          </Link>

          <Link to="/cart" className="transition hover:text-violet-400">
            Cart
          </Link>

          <Link to="/add-product" className="transition hover:text-violet-400">
            Add Product
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopFront. All rights reserved.
      </div>
    </footer>
  );

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navigation />

        <main className="flex flex-1 items-center justify-center bg-gray-50">
          <Loader />
        </main>

        <Footer />
      </div>
    );
  }

  // Product not found
  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navigation />

        <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-red-600">
              Product not found
            </h2>

            <p className="mb-6 text-sm leading-6 text-gray-500">
              We couldn't load this product. It may have been removed or is currently unavailable.
            </p>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-violet-800"
            >
              <ArrowLeft size={18} />
              Back to Shop
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const productName = product.title || product.name;

  const productDescription =
    product.description || "Discover more about this amazing product.";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-r from-violet-900 to-violet-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            ShopFront Collection
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            Product Details
          </h1>

          <p className="mt-3 max-w-2xl text-violet-100">
            Explore product information and find exactly what you're looking for.
          </p>
        </div>
      </section>

      {/* Product Details */}
      <main className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition hover:text-violet-700">
              Home
            </Link>

            <span>/</span>

            <Link to="/catalog" className="transition hover:text-violet-700">
              Shop
            </Link>

            <span>/</span>

            <span className="font-semibold text-violet-700">
              Product Details
            </span>
          </div>

          <div className="grid grid-cols-1 gap-10 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:grid-cols-2 md:gap-12 md:p-10">
            {/* Product Image */}
            <div className="flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-8 md:min-h-[500px]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={productName}
                  className="max-h-[450px] w-full object-contain transition duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Package size={70} strokeWidth={1.2} />
                  <p className="mt-4 text-sm">
                    No product image available
                  </p>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center py-4">
              <span className="mb-4 w-fit rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                {product.category || "Featured Product"}
              </span>

              <h2 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                {productName}
              </h2>

              <div className="mt-5">
                <span className="text-3xl font-extrabold text-violet-700">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="my-7 border-t border-gray-100" />

              <h3 className="mb-3 text-lg font-bold text-gray-900">
                Product Description
              </h3>

              <p className="text-sm leading-7 text-gray-500">
                {productDescription}
              </p>

              {/* Stock */}
              <div className="mt-7 flex items-center gap-3">
                <Package size={20} className="text-violet-700" />

                {Number(product.stock) > 0 ? (
                  <span className="text-sm font-semibold text-green-600">
                    {availableStock > 0
                      ? `${availableStock} available`
                      : "All available stock is in your cart"}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-red-500">
                    Out of stock
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-bold text-gray-800">
                  Quantity
                </h3>

                <div className="flex w-fit items-center rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-3 text-gray-600 transition hover:text-violet-700 disabled:opacity-30"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="min-w-12 text-center font-bold text-gray-900">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(availableStock, q + 1))
                    }
                    disabled={quantity >= availableStock}
                    className="p-3 text-gray-600 transition hover:text-violet-700 disabled:opacity-30"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={availableStock <= 0 || quantity > availableStock}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-violet-700 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <ShoppingCart size={20} />
                {availableStock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Feedback */}
              {message && (
                <div
                  className={`mt-4 flex items-start gap-2 rounded-xl p-4 text-sm ${
                    message.includes("successfully")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  <CheckCircle size={18} className="shrink-0" />
                  {message}
                </div>
              )}

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <Truck size={22} className="text-violet-700" />
                  <span className="text-xs font-medium text-gray-600">
                    Reliable Delivery
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={22} className="text-violet-700" />
                  <span className="text-xs font-medium text-gray-600">
                    Quality Products
                  </span>
                </div>
              </div>

              {/* Delete Product */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="mb-2 font-bold text-gray-900">
                  Remove Product
                </h3>

                <p className="mb-4 text-sm text-gray-500">
                  Permanently remove this product from your shop.
                </p>

                <button
                  type="button"
                  onClick={handleDeleteProduct}
                  disabled={deleting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-4 font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={19} />
                  {deleting ? "Deleting Product..." : "Delete Product"}
                </button>
              </div>
            </div>
          </div>

          {/* Back to Shop */}
          <div className="mt-8">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
            >
              <ArrowLeft size={18} />
              Back to Shop
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
