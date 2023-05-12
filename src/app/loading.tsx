import Me from "@/ui/Me";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="grow flex items-center justify-center">
        <Me variant="avatar-only" />
      </div>
    </div>
  );
}
