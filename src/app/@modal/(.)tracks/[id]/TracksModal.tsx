"use client";

import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import React from "react";

export default function TracksModal() {
  const [open, setOpen] = React.useState(true);

  const router = useRouter();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title>Track modal</Dialog.Title>
          <Dialog.Description />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
