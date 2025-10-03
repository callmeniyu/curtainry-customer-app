import { CardProps } from "@/types";
import { cn } from "@/lib/utils";

export default function Card({
  children,
  className,
  hover = true,
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-100",
        hover && "hover:shadow-lg transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
