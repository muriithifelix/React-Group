
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";

const API_URL = "http://localhost:3000/products";

function AddProductPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "10",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.title.trim() ||
      !formData.price ||
      !formData.description.trim() ||
      !formData.category.trim() ||
      !formData.stock
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!Number.isFinite(Number(formData.price)) ||
        Number(formData.price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (
      !Number.isInteger(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      setError("Stock must be a whole number of zero or more.");
      return;
    }

    const newProduct = {
      title: formData.title.trim(),
      price: Number(formData.price),
      description: formData.description.trim(),
      category: formData.category,
      image: formData.image.trim(),
      stock: Number(formData.stock),
    };

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product. Please try again.");
      }

      await response.json();

      navigate("/catalog");
    } catch (err) {
      setError(
        err.message ||
        "Unable to add product. Check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-medium text-violet-700 transition hover:text-violet-900"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-lg bg-violet-100 px-4 py-2 text-violet-700 transition hover:bg-violet-200"
          >
            <ShoppingCart size={18} />
            Cart
          </Link>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <PlusCircle size={30} className="text-violet-700" />

              <h1 className="text-2xl font-bold text-gray-900">
                Add New Product
              </h1>
            </div>

            <p className="text-gray-500">
              Fill in the details below to add a product to BestBuy.
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Product Name */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-medium text-gray-700"
              >
                Product Name *
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block font-medium text-gray-700"
              >
                Price *
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block font-medium text-gray-700"
              >
                Category *
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
                required
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Men's Clothing">Men's Clothing</option>
                <option value="Women's Clothing">Women's Clothing</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label
                htmlFor="stock"
                className="mb-2 block font-medium text-gray-700"
              >
                Available Stock *
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter available quantity"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
                required
              />
            </div>

            {/* Image URL - kept as requested */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block font-medium text-gray-700"
              >
                Image URL
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
              />

              <p className="mt-2 text-xs text-gray-400">
                Paste an image URL to display the product image.
              </p>

              {formData.image && (
                <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    Image Preview
                  </p>

                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="h-48 w-full rounded-lg object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-medium text-gray-700"
              >
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-600"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PlusCircle size={18} />
              {loading ? "Adding Product..." : "Add Product"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
