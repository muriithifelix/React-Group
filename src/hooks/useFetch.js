
import { useEffect, useState } from "react";

export default function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchFunction();

        if (active) {
          setData(result);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, dependencies);

  return { data, loading, error };
}
