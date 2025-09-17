import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import useFetch from "@/hooks/usefetch";
import { UrlState } from "@/context";
import { getUrls } from "@/db/apiUrls";
import { getClicks } from "@/db/apiClicks";
import Error from "@/components/Error";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicks,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-grotesk min-h-screen flex flex-col items-center justify-start px-4 py-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Loader */}
        <div className="w-full mb-6">
          {(loading || loadingClicks) && (
            <BarLoader width={"100%"} color="#36d7b7" />
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Links Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{urls?.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{clicks?.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Header + Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-8 mb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-0 text-center sm:text-left">
            My Links
          </h1>
          <Button>Create Link</Button>
        </div>

        {/* Input with Icon */}
        <div className="w-full relative max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <Input
            type="text"
            placeholder="Filter links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Filter className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Errors + Links */}
        <div className="w-full mt-6">
          {error && <Error message={error?.message} />}
          {(filteredUrls || []).map((url, i) => (
            <p key={i} className="py-2">
              {url.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
