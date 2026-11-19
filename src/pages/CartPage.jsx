import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import {useState} from "react";

export default function CartPage() {
  const { items, total, count, clearCart } = useCart();
  const [checkedOut, setCheckedOut] =usestate(false);
  function handleCheckout(){
    clearCart();
    setCheckedOut(true);
  }
if (checkedOut) {
  return (
    <div className="page-container page-section">
      <div className ="empty-state">
        <h3>Order confirmed</h3>
        <p>Thanks for the purchase. Your order is on the way</p>
      </div>
    </div>
    
  )
}

  if (!items.length) {
    return (
      <div className="page-container page-section">
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add a few products and they'll show up here.</p>
          <Link to="/products" className="btn-primary text-white hover:text-white">Browse products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container page-section">
      <h1 className="page-title">Your cart</h1>
      <div className="cart-layout">
        <ul className="flex flex-col gap-4 lg:col-span-2">
          {items.map((i) => <CartItem key={i.id} item={i} />)}
        </ul>
        <aside className="card card-body h-fit">
          <h2 className="mb-4 text-xl">Order summary</h2>
          <dl className="flex justify-between text-sm"><dt>Items</dt><dd>{count}</dd></dl>
          <dl className="mt-2 flex justify-between text-lg font-semibold"><dt>Total</dt><dd>${total.toFixed(2)}</dd></dl>
          <button className="btn-primary btn-block mt-4">Checkout</button>
          <button className="btn-ghost btn-block mt-2" onClick={clearCart}>Clear cart</button>
        </aside>
      </div>
    </div>
  );
}
