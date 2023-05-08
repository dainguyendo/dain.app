import * as AvatarPrimitive from "@radix-ui/react-avatar";
import styles from "./styles.module.css";

export const Avatar = () => (
  <AvatarPrimitive.Root className={styles.AvatarRoot}>
    <AvatarPrimitive.Image
      src="/me.png"
      alt="Dai Nguyendo"
      className={styles.AvatarImage}
    />
    <AvatarPrimitive.Fallback className={styles.AvatarFallback}>
      DN
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
);
