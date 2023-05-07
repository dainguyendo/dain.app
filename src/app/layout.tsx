import { Header } from "@/layout/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Footer } from "@/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dai",
  description: "Hi, I’m Dai.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={[inter.className, "root-layout"].join(" ")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
