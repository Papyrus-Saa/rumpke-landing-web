"use client";

import React from "react";

export default function HomeContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="2xl:w-full mx-auto duration-100 overflow-x-hidden">
      {children}
    </div>
  );
}
