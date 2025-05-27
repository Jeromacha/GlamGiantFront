import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full text-white">
      {label && <label className="text-sm font-medium text-title">{label}</label>}
      <input
        {...props}
        className="border border-[#DAA85B] bg-black text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#c28f42]"
      />
    </div>
  );
}
