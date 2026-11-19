import { useState } from "react";

const empty = { name: "", price: "", category: "", image: "", description: "", stock: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Enter a product name.";
  if (!(Number(v.price) > 0)) e.price = "Enter a price greater than 0.";
  if (!v.category) e.category = "Choose a category.";
  if (v.stock === "" || Number(v.stock) < 0 || !Number.isInteger(Number(v.stock))) e.stock = "Enter a whole number, 0 or more.";
  if (!v.description.trim()) e.description = "Add a short description.";
  return e;
}

export default function ProductForm({ initial = empty, categories = [], onSubmit, submitLabel = "Save product", submitting }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({
      ...values,
      name: values.name.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      image: values.image.trim() || `https://picsum.photos/seed/${encodeURIComponent(values.name.trim())}/600/600`,
    });
  };

  const field = (name, label, props = {}) => (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <input id={name} name={name} value={values[name]} onChange={change}
        className={`form-input ${errors[name] ? "form-input-error" : ""}`} {...props} />
      {errors[name] && <p className="form-error">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="card card-body max-w-2xl">
      {field("name", "Product name")}
      <div className="grid gap-x-4 sm:grid-cols-2">
        {field("price", "Price ($)", { type: "number", min: "0", step: "0.01" })}
        {field("stock", "Stock", { type: "number", min: "0", step: "1" })}
      </div>
      <div className="form-group">
        <label htmlFor="category" className="form-label">Category</label>
        <select id="category" name="category" value={values.category} onChange={change}
          className={`form-input ${errors.category ? "form-input-error" : ""}`}>
          <option value="">Choose a category</option>
          {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        {errors.category && <p className="form-error">{errors.category}</p>}
      </div>
      {field("image", "Image URL (optional)", { type: "url", placeholder: "https://" })}
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" name="description" rows="4" value={values.description} onChange={change}
          className={`form-input ${errors.description ? "form-input-error" : ""}`} />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Saving" : submitLabel}
      </button>
    </form>
  );
}
