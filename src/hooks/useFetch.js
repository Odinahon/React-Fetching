import { useState, useEffect } from "react";
export function useFetch(fetchFn, initialValue) {
  //to make this hook functional we need to manage state inside it
  //often time fetch hook manages three states loading, error and data
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }
      setIsFetching(false);
    }
    fetchData(fetchFn);
  }, []);
  return { isFetching, error, fetchedData, setFetchedData };
}
