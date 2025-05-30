import React, { useRef, useEffect } from "react";

import "./DialogModal.scss";
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
    <dialog ref={dialogRef} onClick={handleDialogClick} className="DialogModal">
        <div className="DialogModal__header" >
            <button autoFocus onClick={onClose} className="btn btn--white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="40" height="40" aria-hidden="true"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                Close <span className="visually-hidden">dialog</span>
            </button>
      </div>

      <div>{children}</div>
    </dialog>
  );
};
