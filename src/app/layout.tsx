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
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className={[karla.className].join(" ")}>
        {children}
        {/* <Providers>{children}</Providers> */}
        {modal}
      </body>
    </html>
  );
}
