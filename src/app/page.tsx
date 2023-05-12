import Me from "@/ui/Me";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dai",
  description: "Hi, I’m Dai",
};

export default function Home() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Me />
    </div>
  );
}
