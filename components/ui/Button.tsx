import { ButtonProps } from "@/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  onClick,
  disabled = false,
  loading = false,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 ease-in-out transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary hover:bg-primary-dark text-white shadow-sm hover:shadow-md",
    secondary:
      "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
