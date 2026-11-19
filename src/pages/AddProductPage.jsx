
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";

const API_URL = "http://localhost:3000/products";

function AddProductPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
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
      !formData.category.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    const newProduct = {
      ...formData,
      price: Number(formData.price),
      image: formData.image.trim(),
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
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-violet-700 hover:text-violet-900"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
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

          {error && (
            <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

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
            </div>

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
