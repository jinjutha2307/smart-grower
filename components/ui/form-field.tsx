import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

type ChildProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function FormField({
  label,
  required = true,
  error,
  children,
  className = "",
  labelClassName = "",
  ...props
}: ChildProps) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {label && (
        <Label className={`text-sm font-medium ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
