import { useState } from "react";

export function useFetch<TArgs extends unknown[], TResponse>(
  cb: (...args: TArgs) => Promise<TResponse>
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fn = async (...args: TArgs) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(...args);
      setData(res);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
}
