
import { getProducts, getCategories } from "../api/api";
import useFetch from "../hooks/useFetch";
import useProductFilters from "../hooks/useProductFilters";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function CatalogPage() {
  const products = useFetch(getProducts);
  const categories = useFetch(getCategories);

  const {
    filtered,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
  } = useProductFilters(products.data || []);

  return (
    <div className="page-container page-section">
      <h1 className="page-title">Shop</h1>

      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <CategoryFilter
            categories={categories.data || []}
            selected={category}
            onSelect={setCategory}
          />
        </aside>

        <section className="flex-1">
          {/* Sorting dropdown */}
          <div className="mb-4">
            <SortDropdown
              value={sort}
              onChange={setSort}
            />
          </div>

          {products.loading && <Loader />}

          {products.error && (
            <div className="alert-error">
              Couldn't load products. Start the server with{" "}
              <code>npm run server</code>.
            </div>
          )}

          {products.data && (
            filtered.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-slate-500">
                  {filtered.length} products
                </p>

                <div className="product-grid">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <h3>No products match</h3>

                <p>
                  Try a different search or choose another category.
                </p>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setSort("default");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}
