import FormFieldComponent from "./form-field-component";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { US_STATES } from "@/constants/us-states";
import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities, getZipCodes } from "@/lib/get-address";

type ChildProps = {
  errors: string;
  formData: any;
  handleInputChange: (field: string, value: string) => void;
};
export default function AddressForm({
  formData,
  handleInputChange,
  errors,
}: ChildProps) {
  const [stateId, setStateId] = useState<string>("");
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [cityId, setCityId] = useState<string>("");
  const [zipCodes, setZipCodes] = useState<{ id: string; code: string }[]>([]);
  const [zipCodeId, setZipCodeId] = useState<string>("");
  const address = {
    label: "Address",
    field: "address",
    placeholder: "123 Green Valley Rd.",
    child: (
      <Textarea
        value={formData.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
        placeholder="123 Green Valley Rd."
        className="bayer-input"
        rows={3}
      />
    ),
  };

  const fetchCities = async (stateId: string) => {
    const data = await getCities(stateId);
    setCities(data);
  };

  const fetchZipCodes = async (cityId: string) => {
    const data = await getZipCodes(cityId);
    setZipCodes(data);
  };

  const DropDownComponent = ({
    label,
    value,
    onValueChange,
    placeholder,
    items,
    disabled = false,
  }: {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    items: { id: string; [subject: string]: string }[];
    disabled?: boolean;
  }) => {
    return (
      <FormField label={label}>
        <Select value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger className="bayer-input">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name ?? item.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    );
  };

  return (
    <>
      <FormFieldComponent
        item={address}
        errors={errors}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/*State*/}
        <DropDownComponent
          label="State"
          value={stateId}
          onValueChange={(value) => {
            console.log("Satet id:", value);
            setStateId(value);
            fetchCities(value);
            handleInputChange(
              "state",
              US_STATES.find((s) => s.id === value)?.name || ""
            );
          }}
          placeholder="State"
          items={Array.from(US_STATES)}
        />

        {/*City*/}
        <DropDownComponent
          label="City"
          value={cityId}
          onValueChange={(value) => {
            setCityId(value);
            fetchZipCodes(value);
            handleInputChange(
              "city",
              cities.find((c) => c.id === value)?.name || ""
            );
          }}
          placeholder="City"
          items={cities}
          disabled={cities.length === 0}
        />
        {/*Zip codes*/}
        <DropDownComponent
          label="Zip Code"
          value={zipCodeId}
          onValueChange={(value) => {
            setZipCodeId(value);
            handleInputChange(
              "zipCode",
              zipCodes.find((z) => z.id === value)?.code || ""
            );
          }}
          placeholder="Zip Code"
          items={zipCodes}
          disabled={zipCodes.length === 0}
        />
      </div>
    </>
  );
}
