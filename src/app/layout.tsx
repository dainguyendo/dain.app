import { Footer } from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

export const metadata = {
  title: "Dai",
  description: "Hi, I’m Dai.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={[karla.className, "root-layout"].join(" ")}>
        <Header />
        {children}
        <Footer />
        {modal}
      </body>
    </html>
  );
}
