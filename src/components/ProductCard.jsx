import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const out = product.stock === 0;

  return (
    <article className="card card-hover flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </Link>
      <div className="card-body flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">{product.category}</span>
          {out ? <span className="badge-out">Out of stock</span>
               : product.stock < 8 && <span className="badge-sale">Low stock</span>}
        </div>
        <Link to={`/products/${product.id}`} className="text-slate-900 hover:text-teal-800">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-price mt-auto">${product.price}</p>
        <button className="btn-primary btn-block" disabled={out} onClick={() => addToCart(product)}>
          {out ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
