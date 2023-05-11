import { Karla } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

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
        <Providers>{children}</Providers>
        {modal}
      </body>
    </html>
  );
}
