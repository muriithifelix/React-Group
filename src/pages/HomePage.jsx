import { Link } from "react-router-dom";
import { getProducts } from "../api/api";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function HomePage() {
  const { data, loading, error } = useFetch(getProducts);

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="page-container page-section flex flex-col gap-6 md:py-20">
          <h1 className="max-w-2xl text-balance">Well-made things for your kitchen, desk and shelves</h1>
          <p className="text-lg text-slate-600">Browse the catalog, filter by category and keep a cart that survives a page reload.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary text-white hover:text-white">Shop all products</Link>
            <Link to="/products/new" className="btn-secondary">Add a product</Link>
          </div>
        </div>
      </section>

      <section className="page-container page-section">
        <h2 className="page-title">Featured</h2>
        {loading && <Loader />}
        {error && <div className="alert-error">Couldn't load products. Start the server with <code>npm run server</code>.</div>}
        {data && <div className="product-grid">{data.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>}
      </section>
    </>
  );
}
