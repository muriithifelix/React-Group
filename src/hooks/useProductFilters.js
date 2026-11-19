import { useMemo, useState } from "react";

export default function useProductFilters(products = []) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q || p.name.toLowerCase().includes(q))
    );
  }, [products, search, category]);

  return { filtered, search, setSearch, category, setCategory };
}
