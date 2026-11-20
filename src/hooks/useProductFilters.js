
import { useMemo, useState } from "react";

export default function useProductFilters(products = []) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];

    return safeProducts.filter((product) => {
      const matchesSearch = (product.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

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
