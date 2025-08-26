"use client";
import React from "react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

type ChildProps = {
  item: any;
  errors?: string;
  formData: any;
  required?: boolean;
  handleInputChange: (field: string, value: string) => void;
};

export default function FormFieldComponent({
  item,
  errors,
  formData,
  required,
  handleInputChange,
}: ChildProps) {
  return (
    <FormField
      key={item.field}
      label={item.label}
      required={required}
      error={errors && errors[item.field]}
    >
      {item.child ? (
        item.child
      ) : (
        <Input
          value={formData[item.field]}
          onChange={(e) => handleInputChange(item.field, e.target.value)}
          placeholder={item.placeholder}
          className="bayer-input"
        />
      )}
    </FormField>
  );
}
