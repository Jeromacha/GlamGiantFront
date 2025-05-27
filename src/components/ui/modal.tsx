import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-md relative border border-[#c28f42] text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#c28f42] hover:text-white text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
