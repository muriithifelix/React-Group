
const API_URL = "https://4285e700-9356-421d-a7ca-eb4a4eb230d0.mock.pstmn.io/";

// Get all products
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

// Get categories
export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

// Get a single product by ID
export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};
