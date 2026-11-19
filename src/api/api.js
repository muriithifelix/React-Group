const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.status === 204 ? null : res.json();
}

export const getProducts = () => request("/products");
export const getCategories = () => request("/categories");
export const getProductById = (id) => request(`/products/${id}`);
export const createProduct = (data) =>
  request("/products", { method: "POST", body: JSON.stringify(data) });
export const updateProduct = (id, data) =>
  request(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteProduct = (id) => request(`/products/${id}`, { method: "DELETE" });
