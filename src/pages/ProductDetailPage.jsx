import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById } from "../api/api";
import useFetch from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: p, loading, error } = useFetch(() => getProductById(id), [id]);

  const remove = async () => {
    if (!window.confirm(`Delete "${p.name}"? This can't be undone.`)) return;
    await deleteProduct(p.id);
    navigate("/products");
  };

  if (loading) return <Loader />;
  if (error || !p) {
    return (
      <div className="page-container page-section">
        <div className="empty-state">
          <h3>Product not found</h3>
          <p>It may have been removed.</p>
          <Link to="/products" className="btn-secondary">Back to shop</Link>
        </div>
      </div>
    );
  }

  const out = p.stock === 0;
  return (
    <div className="page-container page-section">
      <Link to="/products" className="text-sm">Back to shop</Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <img src={p.image} alt={p.name} className="card aspect-square w-full object-cover" />
        <div className="flex flex-col gap-4">
          <span className="text-sm text-slate-500">{p.category}</span>
          <h1>{p.name}</h1>
          <p className="product-price text-3xl">${p.price}</p>
          <div>{out ? <span className="badge-out">Out of stock</span> : <span className="badge-stock">{p.stock} in stock</span>}</div>
          <p className="text-slate-600">{p.description}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button className="btn-primary" disabled={out} onClick={() => addToCart(p)}>Add to cart</button>
            <button className="btn-danger" onClick={remove}>Delete product</button>
          </div>
        </div>
      </div>
    </div>
  );
}
