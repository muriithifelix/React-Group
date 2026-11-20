
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

import { getProducts, getCategories } from "../api/api";
import useFetch from "../hooks/useFetch";
import useProductFilters from "../hooks/useProductFilters";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function CatalogPage() {
  const products = useFetch(getProducts);
  const categories = useFetch(getCategories);

  const { cartCount } = useCart();

  const {
    filtered,
    search,
    setSearch,
    category,
    setCategory,
  } = useProductFilters(products.data || []);

  const [sort, setSort] = useState("default");
  const [menuOpen, setMenuOpen] = useState(false);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const result = [...(filtered || [])];

    switch (sort) {
      case "low":
        return result.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );

      case "high":
        return result.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );

      case "name":
        return result.sort((a, b) =>
          (a.title || a.name || "").localeCompare(
            b.title || b.name || "",
            undefined,
            { sensitivity: "base" }
          )
        );

      default:
        return result;
    }
  }, [filtered, sort]);

  const hasFilters =
    search.trim() !== "" ||
    category !== "All" ||
    sort !== "default";

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
  };

  const allProducts = products.data || [];

  // Shared Navigation
  const Navigation = () => (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-violet-700"
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
            className="font-semibold text-violet-700"
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

        {/* Cart and Mobile Menu */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative cursor-pointer rounded-full bg-violet-50 p-3 text-violet-700 transition hover:bg-violet-100"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-700 px-1 text-xs font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-md md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 transition hover:text-violet-700"
            >
              Home
            </Link>

            <Link
              to="/catalog"
              onClick={() => setMenuOpen(false)}
              className="font-semibold text-violet-700"
            >
              Shop
            </Link>

            <Link
              to="/add-product"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 transition hover:text-violet-700"
            >
              Add Product
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-violet-700"
            >
              <ShoppingCart size={18} />
              Shopping Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  );

  // Shared Footer
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
  if (products.loading) {
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

  // Error
  if (products.error) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navigation />

        <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="mb-3 text-xl font-bold text-red-600">
              Something went wrong
            </h2>

            <p className="text-sm leading-6 text-gray-500">
              Couldn't load products. Please make sure your API server is running.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Catalog Hero */}
      <section className="bg-gradient-to-r from-violet-900 to-violet-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="mb-5 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            ShopFront Collection
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Our Product Catalog
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-violet-100">
            Discover amazing products, explore your favourite categories,
            and find exactly what you need.
          </p>

          <p className="mt-6 text-sm font-medium text-violet-200">
            Explore {allProducts.length} available products
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Filters
                </h2>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="cursor-pointer text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-8">
                <h3 className="mb-3 font-semibold text-gray-800">
                  Search Products
                </h3>

                <SearchBar
                  value={search}
                  onChange={setSearch}
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="mb-4 font-semibold text-gray-800">
                  Categories
                </h3>

                {categories.loading ? (
                  <p className="text-sm text-gray-400">
                    Loading categories...
                  </p>
                ) : categories.error ? (
                  <p className="text-sm text-red-500">
                    Unable to load categories.
                  </p>
                ) : (
                  <CategoryFilter
                    categories={categories.data || []}
                    selected={category}
                    onSelect={setCategory}
                  />
                )}
              </div>
            </aside>

            {/* Products */}
            <section className="min-w-0" aria-label="Product results">
              {/* Toolbar */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Explore Products
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-bold text-violet-700">
                      {sortedProducts.length}
                    </span>{" "}
                    of {allProducts.length} products
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort"
                    className="whitespace-nowrap text-sm font-medium text-gray-600"
                  >
                    Sort by:
                  </label>

                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="default">Recommended</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-violet-200 bg-white px-6 py-20 text-center">
                  <div className="mb-5 text-5xl">
                    🔍
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {allProducts.length === 0
                      ? "No products available"
                      : "No products found"}
                  </h3>

                  <p className="mx-auto mb-6 max-w-sm text-sm leading-6 text-gray-500">
                    {allProducts.length === 0
                      ? "There are currently no products in the shop."
                      : search.trim()
                        ? `We couldn't find products matching "${search}".`
                        : "No products match the selected category or filters."}
                  </p>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="cursor-pointer rounded-xl bg-violet-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-800"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
