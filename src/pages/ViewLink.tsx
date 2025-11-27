import { Device } from "@/components/Analytics";
import Location from "@/components/Location";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import { getAnalyticsById } from "@/lib/api/analytics.api";
import { deleteUrls, getUrlwithId } from "@/lib/api/url.api";
import { useAppContext } from "@/useAppContext";
import { CopyCheck, CopyIcon, DownloadIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader, SkewLoader } from "react-spinners";

const ViewLink = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const navigate = useNavigate();

  const {
    loading: urlLoading,
    data: url,
    fn: urlFn,
    error,
  } = useFetch(getUrlwithId);

  const {
    loading: analyticsLoading,
    data: analytics,
    fn: analyticsFn,
  } = useFetch(getAnalyticsById);

  useEffect(() => {
    if (!id || !user?.id) return;

    urlFn({
      id: id,
      user_id: user.id,
    });
  }, [id, user?.id]);

  useEffect(() => {
    if (url && id) {
      analyticsFn(id);
    }
  }, [url, id]);

  useEffect(() => {
    if (error) navigate("/dashboard");
  }, [error]);

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  const { loading: deleteLoader, fn: deleteFn } = useFetch(deleteUrls);

  const downloadQr = async () => {
    try {
      const res = await fetch(url?.qrcode);
      const blob = await res.blob();
      const blobURL = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobURL;
      anchor.download = `${url.title || "qr-code"}.png`;
      anchor.click();

      URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error(error);
      toast.error("Failed to download QR code");
    }
  };

  return (
    <div>
      {(urlLoading || analyticsLoading) && (
        <div className="z-50 inset-0 flex items-center justify-center fixed bg-black/30 bg-blur-md">
          <SkewLoader color="#888" />
        </div>
      )}
      <div className="mx-auto max-w-7xl py-10 px-5 flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-2xl font-bold">{url?.title}</span>
          <a
            href={`https://curl.in/${link}`}
            target="_blank"
            className="text-md sm:text-lg text-blue-500 font-bold hover:underline cursor-pointer"
          >
            https://curl.in/{link}
          </a>
          <a
            href={url?.primary_url}
            target="_blank"
            className="flex items-center text-md sm:text-lg gap-1 hover:underline cursor-pointer break-all sm:block truncate max-w-full"
          >
            {url?.primary_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-4 items-center">
            <img
              src={url?.qrcode}
              alt="QR code"
              className="object-contain h-30 self-start border-2 border-gray-500 items-center"
              draggable={false}
            />
            <div className="flex gap-2">
              <Button
                variant={"ghost"}
                className="cursor-pointer"
                onClick={() =>
                  navigator.clipboard
                    .writeText(`https://curl.in/${url?.short_url}`)
                    .then(() =>
                      toast("Link copied to clipboard", {
                        icon: <CopyCheck />,
                        style: {
                          borderRadius: "12px",
                          background: "rgba(30, 30, 30, 0.9)",
                          color: "#fff",
                          padding: "10px 14px",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          minWidth: "180px",
                          backdropFilter: "blur(6px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        },
                      })
                    )
                }
              >
                <CopyIcon />
              </Button>
              <Button
                variant={"ghost"}
                className="cursor-pointer transition-colors duration-200 hover:text-blue-500"
                onClick={downloadQr}
              >
                <DownloadIcon />
              </Button>
              <Button
                variant={"ghost"}
                className="cursor-pointer transition-colors duration-200 hover:text-red-500"
                onClick={() =>
                  deleteFn(url?.id).then(() => navigate("/dashboard"))
                }
              >
                {deleteLoader ? (
                  <PulseLoader size={5} color="#888" />
                ) : (
                  <Trash />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Stats and Analytics
              </CardTitle>
            </CardHeader>
            {analytics && analytics?.length ? (
              <CardContent className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Visits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{analytics?.length}</p>
                  </CardContent>
                </Card>

                <CardTitle>Locations</CardTitle>
                <Location analytics={analytics} />

                <CardTitle>Devices</CardTitle>
                <Device analytics={analytics} />
              </CardContent>
            ) : (
              <CardContent>
                {analyticsLoading === false
                  ? "No analytics yet"
                  : "Loading analytics..."}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewLink;
