"use client";
import { useRouter } from "next/navigation";
import { CSSProperties, useCallback, useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={(evt) => onClick(evt)}
    >
      <div
        ref={wrapper}
        style={
          {
            "--dark-purple": "4 6 22",
            "--light-purple": "120 119 198",

            "--bg-color":
              "linear-gradient(rgb(var(--dark-purple)), rgb(var(--dark-purple)))",
            "--border-color": `linear-gradient(145deg,
            rgb(var(--light-purple)) 0%,
            rgb(var(--light-purple) / 0.3) 33.33%,
            rgb(var(--light-purple) / 0.14) 66.67%,
            rgb(var(--light-purple) / 0.1) 100%)
          `,
          } as CSSProperties
        }
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-transparent p-8 bg-white dark:bg-slate-950"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
