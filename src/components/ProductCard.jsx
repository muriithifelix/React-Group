
import { Link } from "react-router-dom";
import { ShoppingCart, Star, ArrowUpRight } from "lucide-react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart, getAvailableStock } = useCart();

  const {
    id,
    title,
    name,
    price,
    image,
    description,
    category,
    rating,
  } = product;

  const productName = title || name || "Unnamed Product";
  const ratingValue = Number(rating?.rate ?? rating);

  const availableStock = getAvailableStock(product);

  const isOutOfStock = availableStock <= 0;
  const isLowStock = availableStock > 0 && availableStock <= 3;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product);
    }
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/products/${id}`}>
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-white p-6">
          {image ? (
            <img
              src={image}
              alt={productName}
              loading="lazy"
              className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
            />
          ) : (
            <ShoppingCart size={50} className="text-gray-300" />
          )}

          <span className="absolute left-4 top-4 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold capitalize text-violet-700">
            {category || "Product"}
          </span>

          <div className="absolute right-4 top-4 rounded-full bg-white p-2 text-gray-600 opacity-0 shadow transition group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-1 text-sm text-amber-500">
          <Star size={15} fill="currentColor" />
          <span className="font-semibold">
            {Number.isFinite(ratingValue)
              ? ratingValue.toFixed(1)
              : "New"}
          </span>
        </div>

        <Link to={`/products/${id}`}>
          <h3 className="mt-3 line-clamp-2 min-h-12 font-bold text-gray-900 transition hover:text-violet-700">
            {productName}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-6 text-gray-500">
          {description || "Discover this amazing product."}
        </p>

        {/* Stock status */}
        <div className="mt-3">
          {isOutOfStock ? (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              Low Stock - {availableStock} left
            </span>
          ) : (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              In Stock
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-lg font-extrabold text-violet-700">
            KSh {Number(price).toLocaleString("en-KE")}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={`Add ${productName} to cart`}
            className={`rounded-xl p-3 text-white transition ${
              isOutOfStock
                ? "cursor-not-allowed bg-gray-300"
                : "bg-violet-700 hover:bg-violet-800 cursor-pointer"
            }`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
