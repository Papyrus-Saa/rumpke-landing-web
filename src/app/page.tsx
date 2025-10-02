"use client";

import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("./HomeContent"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse">
      <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-800" />
    </div>
  ),
});

export default function Page() {
  return <HomeContent />;
}
