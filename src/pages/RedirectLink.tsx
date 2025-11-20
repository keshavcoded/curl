import { useFetch } from "@/hooks/useFetch";
import { getRedirect } from "@/lib/api/url.api";
import { getAnalytics } from "@/lib/api/analytics.api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SkewLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, fn: redirect } = useFetch(getRedirect);

  const { loading: analyticsloader, fn: saveAnalytics } =
    useFetch(getAnalytics);

  useEffect(() => {
    if (!loading) redirect(id);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      saveAnalytics({
        id: data?.id,
        primaryUrl: data?.primary_url,
      });
    }
  }, [loading]);

  if (loading || analyticsloader) {
    return (
      <div className="z-50 inset-0 flex items-center justify-center fixed bg-black/30 bg-blur-md">
        <SkewLoader color="#888" />
      </div>
    );
  }
};

export default RedirectLink;
