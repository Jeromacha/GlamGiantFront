
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
