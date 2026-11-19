import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getCategories } from "../api/api";
import useFetch from "../hooks/useFetch";
import ProductForm from "../components/ProductForm";

export default function AddProductPage() {
  const navigate = useNavigate();
  const { data: categories } = useFetch(getCategories);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setError("");
    try {
      const created = await createProduct(values);
      navigate(`/products/${created.id}`);
    } catch {
      setError("Couldn't save the product. Check that the server is running and try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container page-section">
      <h1 className="page-title">Add a product</h1>
      {error && <div className="alert-error mb-4 max-w-2xl">{error}</div>}
      <ProductForm categories={categories || []} onSubmit={handleSubmit} submitting={submitting} submitLabel="Add product" />
    </div>
  );
}
