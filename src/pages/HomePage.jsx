
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  LoaderCircle,
} from "lucide-react";

import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:3000/products";

const categories = [
  { name: "Electronics", emoji: "💻" },
  { name: "Jewelery", emoji: "💎" },
  { name: "Men's Clothing", emoji: "👕" },
  { name: "Women's Clothing", emoji: "👗" },
];

function HomePage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load products.");
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Unable to load products. Please check your server."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    if (search.trim()) {
      navigate(
        `/catalog?search=${encodeURIComponent(search.trim())}`
      );
    }
  };

  const handleCategoryClick = (category) => {
    navigate(
      `/catalog?category=${encodeURIComponent(category)}`
    );
  };

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-violet-700"
          >
            ShopFront<span className="text-gray-900">.</span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Cart */}
          <Link
            to="/cart"
            className="rounded-full bg-violet-50 p-3 text-violet-700 transition hover:bg-violet-100"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={22} />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-900 to-violet-600 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">

          <div>
            <span className="mb-5 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              Welcome to ShopFront
            </span>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Find What You Love.
              <span className="block text-violet-200">
                Buy What You Need.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-violet-100">
              Discover amazing products, explore your favourite
              categories, and enjoy a simple shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-violet-800 transition hover:bg-violet-100"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/add-product"
                className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Add a Product
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex h-72 w-72 items-center justify-center rounded-full bg-white/10 text-9xl shadow-2xl md:h-96 md:w-96">
              🛍️
            </div>
          </div>

        </div>
      </section>

      {/* Search Section */}
      <section className="mx-auto max-w-3xl px-4 py-10">
        <form
          onSubmit={handleSearch}
          className="flex overflow-hidden rounded-xl border border-gray-200 shadow-sm focus-within:border-violet-500"
        >
          <div className="flex flex-1 items-center gap-3 px-4">
            <Search className="text-gray-400" size={20} />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search for products..."
              className="w-full py-4 outline-none"
              aria-label="Search for products"
            />
          </div>

          <button
            type="submit"
            className="bg-violet-700 px-6 font-semibold text-white transition hover:bg-violet-800"
          >
            Search
          </button>
        </form>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Shop by Category
          </h2>

          <p className="mt-2 text-gray-500">
            Explore our range of product categories.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              onClick={() =>
                handleCategoryClick(category.name)
              }
              className="rounded-2xl border border-gray-100 bg-gray-50 p-7 text-center transition hover:-translate-y-1 hover:border-violet-300 hover:bg-violet-50"
            >
              <span className="text-4xl">
                {category.emoji}
              </span>

              <h3 className="mt-4 font-bold text-gray-800">
                {category.name}
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>

              <p className="mt-2 text-gray-500">
                Discover some of our available products.
              </p>
            </div>

            <Link
              to="/catalog"
              className="flex items-center gap-2 font-semibold text-violet-700 transition hover:text-violet-900"
            >
              View All
              <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <LoaderCircle
                className="animate-spin text-violet-700"
                size={40}
              />
            </div>
          ) : error ? (
            <p className="rounded-xl bg-red-50 p-6 text-center text-red-600">
              {error}
            </p>
          ) : featuredProducts.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              No products available yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3">

        <div className="text-center">
          <Truck
            size={38}
            className="mx-auto text-violet-700"
          />

          <h3 className="mt-4 font-bold text-gray-900">
            Convenient Shopping
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Find products easily in one place.
          </p>
        </div>

        <div className="text-center">
          <ShieldCheck
            size={38}
            className="mx-auto text-violet-700"
          />

          <h3 className="mt-4 font-bold text-gray-900">
            Simple Experience
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Enjoy an easy-to-use shopping experience.
          </p>
        </div>

        <div className="text-center">
          <Headphones
            size={38}
            className="mx-auto text-violet-700"
          />

          <h3 className="mt-4 font-bold text-gray-900">
            Customer Support
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            We're here to help with your shopping needs.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-950 px-4 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row">

          <div>
            <Link
              to="/"
              className="text-2xl font-extrabold"
            >
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

            <Link
              to="/add-product"
              className="transition hover:text-violet-400"
            >
              Add Product
            </Link>
          </div>

        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ShopFront. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default HomePage;
