import { useFetch } from "@/hooks/useFetch";
import { getRedirect } from "@/lib/api/url.api";
import { getAnalytics } from "@/lib/api/analytics.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SkewLoader } from "react-spinners";
import { useTheme } from "@/components/ThemeProvider";

const RedirectLink = () => {
  const { id } = useParams();

  const { theme } = useTheme();

  const { loading, data, fn: redirect, error } = useFetch(getRedirect);

  const { loading: analyticsloader, fn: saveAnalytics } =
    useFetch(getAnalytics);

  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!loading) redirect(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!data) {
        setNotFound(true);
      }
    }
  }, [loading, data]);

  useEffect(() => {
    if (!loading && data) {
      saveAnalytics({
        id: data?.data.id,
        primaryUrl: data?.data.primary_url,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading || analyticsloader) {
    return (
      <div className="z-50 inset-0 flex items-center justify-center fixed bg-black/30 bg-blur-md">
        <SkewLoader color="#888" />
      </div>
    );
  }

  if (notFound && error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1
          className={`text-md sm:text-xl font-medium ${
            theme === "dark" ? "text-white " : "text-black"
          } text-center`}
        >
          This link does not exist or has been removed.
        </h1>
      </div>
    );
  }
};

export default RedirectLink;
