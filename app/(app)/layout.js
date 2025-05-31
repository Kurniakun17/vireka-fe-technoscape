import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import Providers from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vireka",
  description:
    "Website berbasis data yang dapat membantu pemerintah dalam menghitung risiko dan mengidentifikasi urgensi dalam pembiayaan sektor kesehatan suatu kota melalui tiga fitur utama",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Sidebar />
            <div className="ml-64 flex items-stretch ">
              <div className=" flex-1 p-8 max-w-[1500px] mx-auto  ">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
