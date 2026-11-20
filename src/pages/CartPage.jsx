
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();

  const formatPrice = (price) =>
    `$${Number(price).toFixed(2)}`;

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

          <Link
            to="/cart"
            className="font-semibold text-violet-700"
          >
            Cart
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
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Cart Hero */}
      <section className="bg-gradient-to-r from-violet-900 to-violet-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <span className="mb-5 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            ShopFront Collection
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Your Shopping Cart
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-violet-100">
            Review your selected products and get ready
            to complete your purchase.
          </p>

          <p className="mt-6 text-sm font-medium text-violet-200">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <main className="min-h-[500px] bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-violet-200 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 text-violet-700">
                <ShoppingBag size={38} />
              </div>

              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                Your cart is empty
              </h2>

              <p className="mx-auto mb-8 max-w-md text-sm leading-6 text-gray-500">
                Looks like you haven't added anything to
                your cart yet. Explore our collection and
                find something you'll love.
              </p>

              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-violet-700 px-7 py-3 font-semibold text-white transition hover:bg-violet-800"
              >
                <ShoppingBag size={18} />
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Heading */}
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shopping Cart
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    You have {cartItems.length} different products in your cart.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-700"
                >
                  <Trash2 size={17} />
                  Clear Cart
                </button>
              </div>

              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">

                {/* Cart Items */}
                <section className="space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                        {/* Product Image */}
                        <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:w-32">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title || item.name}
                              className="h-full w-full object-contain p-3"
                            />
                          ) : (
                            <ShoppingBag
                              size={36}
                              className="text-gray-300"
                            />
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-lg font-bold text-gray-900">
                            {item.title || item.name}
                          </h3>

                          <p className="mt-2 text-lg font-extrabold text-violet-700">
                            {formatPrice(item.price)}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            Product ID: {item.id}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                          <div className="flex items-center rounded-xl border border-gray-200">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={item.quantity <= 1}
                              className="p-2 text-gray-600 transition hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="min-w-9 text-center text-sm font-bold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              disabled={
                                item.quantity >= Number(item.stock || 0)
                              }
                              className="p-2 text-gray-600 transition hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="inline-flex items-center gap-1 text-sm font-medium text-red-500 transition hover:text-red-700"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal */}
                      <div className="mt-5 flex justify-between border-t border-gray-100 pt-4">
                        <span className="text-sm text-gray-500">
                          Item subtotal
                        </span>

                        <span className="font-bold text-gray-900">
                          {formatPrice(
                            Number(item.price) * item.quantity
                          )}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Continue Shopping */}
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                  >
                    <ArrowLeft size={18} />
                    Continue Shopping
                  </Link>
                </section>

                {/* Order Summary */}
                <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-28">
                  <h2 className="mb-6 text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Items ({cartCount})
                      </span>

                      <span className="font-semibold text-gray-900">
                        {formatPrice(cartTotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Shipping
                      </span>

                      <span className="font-semibold text-green-600">
                        Free
                      </span>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">
                          Total
                        </span>

                        <span className="text-xl font-extrabold text-violet-700">
                          {formatPrice(cartTotal)}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-gray-400">
                        Shipping and taxes may be confirmed at checkout.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert("Checkout coming soon!")}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-violet-800"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <ShoppingCart size={15} />
                    Secure shopping experience
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
