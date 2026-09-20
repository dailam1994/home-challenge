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
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            overflow: "visible"
          }
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        {title}

        <IconButton
          onClick={onClose}
          aria-label="Close dialog"
          size="small"
          sx={{
            position: "absolute",
            top: 15,
            right: -10,
            width: 40,
            height: 25,
            zIndex: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 1,
            boxShadow: 2,
            "&:hover": { bgcolor: "primary.dark" }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>
    </MuiDialog>
  );
}
