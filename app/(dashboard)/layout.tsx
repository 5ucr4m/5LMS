import React from "react";

import { Sidebar } from "./_compoennts/Sidebar";
import { Navbar } from "./_compoennts/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-white">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />d
      </div>
      <main className="md:pl-56 p-[80px] h-full">{children}</main>
    </div>
  );
}
