import { useState } from "react";

/* type FetchOptions = Record<string, unknown>; */

export function useFetch<TArgs = void, TResponse = unknown>(
  cb: (args: TArgs) => Promise<TResponse>

  /* options: FetchOptions = {} */
) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fn = async (args?: TArgs) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(args as TArgs);
      setData(response);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
}
