import LinkCard from "@/components/LinkCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { getAnalytics } from "@/lib/api/analytics.api";
import { getUrls } from "@/lib/api/url.api";
import { useAppContext } from "@/useAppContext";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { SkewLoader } from "react-spinners";

const Dashboard = () => {
  const [searchData, setSearchData] = useState<string>("");
  const { user } = useAppContext();
  const { data: urls, loading: urlLoading, fn: urlsFn } = useFetch(getUrls);

  useEffect(() => {
    urlsFn(user?.id);
  }, [user?.id]);

  const {
    data: analytics,
    loading: analyticsLoading,
    fn: analyticsFn,
  } = useFetch(getAnalytics);

  useEffect(() => {
    if (urls?.length) {
      analyticsFn(urls.map((url) => url.id));
    }
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchData.toLowerCase());
  });

  return (
    <div>
      {(urlLoading || analyticsLoading) && (
        <div className="z-50 inset-0 flex items-center justify-center fixed bg-black/30 bg-blur-md">
          <SkewLoader color="#888" />
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <Card >
            <CardHeader>
              <CardTitle>Links created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{urls?.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analytics?.length}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between mt-8">
          <h1 className="text-2xl font-bold">My Links</h1>
          <Button className="cursor-pointer">Create Link</Button>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
          <Filter className="absolute top-2 right-2 p-1" />
        </div>

        {(filteredUrls || []).map((url) => {
          return <LinkCard key={url.id} url={url} fetchurls={urlsFn} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
