import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <li className="card flex gap-4 p-4">
      <img src={item.image} alt={item.name} className="h-24 w-24 shrink-0 rounded-lg object-cover" />
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex justify-between gap-2">
          <Link to={`/products/${item.id}`} className="text-slate-900"><h3 className="product-name">{item.name}</h3></Link>
          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="qty-control">
            <button className="qty-btn" aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span className="qty-value">{item.quantity}</span>
            <button className="qty-btn" aria-label="Increase quantity" disabled={item.quantity >= item.stock}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <button className="btn-ghost btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      </div>
    </li>
  );
}
