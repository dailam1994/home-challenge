"use client";

import { Close } from "@mui/icons-material";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog
} from "@mui/material";
import type { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  children
}: DialogProps) {
  return (
    <MuiDialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600
        }}
      >
        {title}

        <IconButton onClick={onClose} aria-label="Close dialog" size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>
    </MuiDialog>
  );
}
