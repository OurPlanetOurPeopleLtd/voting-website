import React, { useRef, useEffect } from "react";

interface DialogModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DialogModal: React.FC<DialogModalProps> = ({ open, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    // Open or close the dialog based on `open` prop
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }

    const handleCancel = (e: Event) => {
      e.preventDefault(); // prevent ESC from closing unless you want it
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [open, onClose]);

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Optional: close if backdrop is clicked
    const dialog = dialogRef.current;
    if (dialog && e.target === dialog) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} onClick={handleDialogClick} className="rounded-lg shadow-xl p-4 max-w-lg w-full">
      <button autoFocus onClick={onClose} className="mb-4 bg-gray-200 px-4 py-2 rounded">
        Close
      </button>
      <div>{children}</div>
    </dialog>
  );
};
