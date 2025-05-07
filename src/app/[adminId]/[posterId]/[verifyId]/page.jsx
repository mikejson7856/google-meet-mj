import { headers } from "next/headers";
import React from "react";
import { ServerOff } from "lucide-react";
import VideoCall from "@/components/VideoCall/VideoCall";

async function page({ params }) {
  try {
    const { adminId, paramsId, verifyId } = await params;
    const headerList = await headers();
    const userAgent = headerList.get("user-agent");
    const isMobileView = userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    const isTabletView = userAgent.match(
      /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
    );
    const device = isMobileView ? "phone" : isTabletView ? "tablet" : "desktop";

    const url = `${process.env.API_URL}/${process.env.SITE}/${adminId}/${paramsId}/${verifyId}/${device}`;
    console.log("url", url);

    const response = await fetch(url);
    const result = await response.json();

    console.log("result", result);

    // if (result?.success === "not exist") {
    //   return (
    //     <div className="flex gap-5 justify-center items-center bg-amber-200 min-h-screen">
    //       <ServerOff size={30} />

    //       <p className="text-xl">No Data Exists</p>
    //     </div>
    //   );
    // } else {
      return <VideoCall />;
    // }
  } catch (error) {
    console.log(error);
    return <div>Error in server!!</div>;
  }
}

export default page;
