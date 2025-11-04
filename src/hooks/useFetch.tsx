import { useState } from "react";

type FetchOptions = Record<string, unknown>;

export function useFetch<TResponse>(
  cb: (options: FetchOptions, ...args: unknown[]) => Promise<TResponse>,

  options: FetchOptions = {}
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | Error | null>(null);

  const fn = async (...args: unknown[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(options, ...args);
      setData(response);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
}
