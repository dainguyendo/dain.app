import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { motion } from "framer-motion";

export const Avatar = () => (
  <AvatarPrimitive.Root asChild>
    <motion.div
      layoutId="avatar"
      className="inline-flex items-center justify-center align-middle overflow-hidden select-none h-32 w-32 rounded-full"
    >
      <AvatarPrimitive.Image
        src="/me.png"
        alt="Dai Nguyendo"
        className="w-full h-full object-cover"
      />
      <AvatarPrimitive.Fallback className="w-full h-full flex items-center justify-center text-rose-600 font-bold">
        DN
      </AvatarPrimitive.Fallback>
    </motion.div>
  </AvatarPrimitive.Root>
);
