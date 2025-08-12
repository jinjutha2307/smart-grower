import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Grower - Agriculture Management System",
  description:
    "Modern agriculture management platform for growers and contracts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset>
              <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-blue-200/30 bayer-blue-gradient px-4">
                <SidebarTrigger className="text-white hover:bg-white/20" />
                <div className="flex items-center gap-2 text-white">
                  <div className="h-8 w-8 rounded-lg bayer-green-gradient flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="font-semibold">Smart Grower</span>
                </div>
              </header>
              <main className="flex-1 p-6">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
