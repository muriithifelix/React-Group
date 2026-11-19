import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Shop", end: true },
  { to: "/products/new", label: "Add product" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const linkClass = ({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <header className="site-header">
      <div className="page-container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-900 hover:text-slate-900">Shopfront</Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart" className="btn-secondary btn-sm" aria-label={`Cart, ${count} items`}>
            Cart
            <span className="badge bg-teal-700 text-white">{count}</span>
          </Link>
          <button className="btn-ghost btn-sm md:hidden" onClick={() => setOpen(!open)}
            aria-expanded={open} aria-label="Toggle menu">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-slate-200 px-4 py-2 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
