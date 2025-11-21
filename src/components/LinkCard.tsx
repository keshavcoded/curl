import type { UrlTypes } from "@/lib/types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CopyCheck, CopyIcon, DownloadIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useFetch } from "@/hooks/useFetch";
import { deleteUrls } from "@/lib/api/url.api";
import { useAppContext } from "@/useAppContext";
import { PulseLoader } from "react-spinners";

const LinkCard = ({
  url,
  fetchurls,
}: {
  url: UrlTypes;
  fetchurls: (user_id: string | undefined) => Promise<void>;
}) => {
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
  const { user } = useAppContext();
  const { loading: deleteLoader, fn: deleteFn } = useFetch(deleteUrls);

  return (
    <div className="flex flex-col justify-center md:flex-row gap-5 border p-4 transition-all duration-200 bg-black/4 hover:bg-black/6 rounded-lg">
      <img
        src={url?.qrcode}
        alt="QR code"
        className="object-contain h-24 self-start border-2 border-gray-500 items-center"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 gap-1">
        <span className="text-xl font-bold">{url?.title}</span>
        <span className="text-md text-blue-500 font-semibold">
          https://curl.in/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="break-all block truncate max-w-[300px] sm:max-w-[400px]">
          {url?.primary_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
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
            deleteFn(url?.id).then(() => {
              fetchurls(user?.id);
            })
          }
        >
          {deleteLoader ? <PulseLoader size={5} color="#888" /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
