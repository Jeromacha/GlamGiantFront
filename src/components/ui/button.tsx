export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium bg-[#DAA85B] text-black hover:bg-[#e6c200] disabled:bg-gray-400 transition ${className}`}
    >
      {children}
    </button>
  );
}
