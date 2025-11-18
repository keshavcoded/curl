import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppContext } from "@/useAppContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";
import type { creatLinkInputTypes } from "@/lib/types";
import zod from "zod";
import { useFetch } from "@/hooks/useFetch";
import { createUrl } from "@/lib/api/url.api";
import QRCode from "qrcode";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const primary_url = searchParams.get("createLink");

  const [formData, setFormData] = useState<creatLinkInputTypes>({
    title: "",
    primaryUrl: primary_url ? primary_url : "",
    customUrl: "",
  });

  const [formError, setFormError] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: createFn } = useFetch(createUrl);

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}-${data[0].title}`);
    }
  }, [data, error, navigate]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("here");
    console.log(formData);
    setFormError({});
    try {
      const linkInputSchema = zod.object({
        title: zod.string().min(1, "Title required"),
        primaryUrl: zod.string().min(1, "URL required").url("Invalid URL"),
        customUrl: zod.string().max(6),
      });

      const result = linkInputSchema.safeParse(formData);
      console.log(result);

      if (!result.success) {
        const errorObj: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const pathkey = String(issue.path[0]);
          errorObj[pathkey] = issue.message;
        });
        setFormError(errorObj);
        return;
      }
      //api call
      const qrcode = await QRCode.toDataURL(formData.primaryUrl); //qr creation

      await createFn(
        {
          title: formData.title,
          primary_url: formData.primaryUrl,
          custom_url: formData.customUrl,
          user_id: user?.id,
        },
        qrcode
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      defaultOpen={primary_url ? true : false}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Create a New Curl Link
          </DialogTitle>
        </DialogHeader>

        <div className="relative space-y-2">
          <Input
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <Error message={formError.title} position="left-2 top-9" />
        </div>
        <div className="relative space-y-2">
          <Input
            name="primaryUrl"
            placeholder="Enter your URL"
            value={formData.primaryUrl}
            onChange={handleInputChange}
          />
          <Error message={formError.primaryUrl} position="left-2 top-9" />
        </div>
        <div className="relative flex items-center gap-2">
          <Card className="px-2 py-2 text-sm">curl.in</Card> /
          <Input
            name="customUrl"
            placeholder="Custom URL"
            value={formData.customUrl}
            onChange={handleInputChange}
          />
          <Error message={formError.customUrl} position="left-2 top-9" />
        </div>

        <DialogFooter>
          <Button
            disabled={loading}
            className="w-full mt-5"
            onClick={handleSubmit}
          >
            {loading ? <BeatLoader size={10} color="#888" /> : "Create Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
