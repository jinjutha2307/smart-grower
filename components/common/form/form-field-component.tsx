"use client";
import React from "react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { GrowersFormData } from "@/types";

type ItemType = {
  label: string;
  field: string;
  placeholder?: string;
  child?: React.ReactNode;
};

type ChildProps = {
  item: ItemType;
  errors: { [key: string]: string | undefined };
  value: string | number | null;
  required?: boolean;
  handleInputChange: (field: string, value: string) => void;
};

export default function FormFieldComponent({
  item,
  errors,
  value,
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
          value={value ?? ""}
          onChange={(e) => handleInputChange(item.field, e.target.value)}
          placeholder={item.placeholder}
          className="bayer-input"
        />
      )}
    </FormField>
  );
}
