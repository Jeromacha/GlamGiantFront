
import Sidebar from "@/components/layout/aside";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-1 p-6 bg-white">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
