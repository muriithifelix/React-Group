
import { useMemo, useState } from "react";

export default function useProductFilters(products = []) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    return safeProducts.filter((product) => {
      const productName = product.name || product.title || "";

      const matchesSearch = [
        productName,
        product.category || "",
        product.description || "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "All" ||
        (product.category || "").toLowerCase() ===
          category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return {
    filtered,
    search,
    setSearch,
    category,
    setCategory,
  };
}
