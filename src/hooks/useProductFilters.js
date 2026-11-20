import { useMemo, useState } from "react";

export default function useProductFilters(products = []) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    // First filter products by category and search term
    const results = products.filter(
      (product) =>
        (category === "All" || product.category === category) &&
        (!q || product.name.toLowerCase().includes(q))
    );

    // Then sort a copy of the filtered results
    switch (sort) {
      case "price-low-high":
        results.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-high-low":
        results.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "name-a-z":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return results;
  }, [products, search, category, sort]);

  return {
    filtered,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
  };
}