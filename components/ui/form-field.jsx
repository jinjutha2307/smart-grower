import { Label } from "@/components/ui/label"

export function FormField({ 
  label, 
  required = false, 
  error, 
  children, 
  className = "",
  labelClassName = "",
  ...props 
}) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {label && (
        <Label className={`text-sm font-medium ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}
