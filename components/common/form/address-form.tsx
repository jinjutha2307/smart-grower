import FormFieldComponent from "./form-field-component";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  provinces,
  Province,
  District,
  Subdistrict,
} from "@/constants/thailand-geography";
import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
  const [provinceCode, setProvinceCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [subdistrictCode, setSubdistrictCode] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const selectedProvince = provinces.find((p) => p.code === provinceCode);
  const districts = selectedProvince?.districts || [];
  const selectedDistrict = districts.find((d) => d.code === districtCode);
  const subdistricts = selectedDistrict?.subdistricts || [];
  const selectedSubdistrict = subdistricts.find(
    (s) => s.code === subdistrictCode
  );

  useEffect(() => {
    setPostalCode(selectedSubdistrict?.code || "");
  }, [selectedSubdistrict]);

  const address = {
    label: "ที่อยู่ (Address)",
    field: "address",
    placeholder: "123 หมู่ 1 ตำบล..",
    child: (
      <Textarea
        value={formData.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
        placeholder="123 หมู่ 1 ตำบล..."
        className="bayer-input"
        rows={3}
      />
    ),
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
        {/*Provinces*/}
        <FormField label="จังหวัด (Province)">
          <Select
            value={provinceCode}
            onValueChange={(value) => {
              setProvinceCode(value);
              setDistrictCode("");
              setSubdistrictCode("");
              setPostalCode("");
              handleInputChange("province", value);
            }}
          >
            <SelectTrigger className="bayer-input">
              <SelectValue placeholder="เลือกจังหวัด" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((p) => (
                <SelectItem key={p.code} value={p.code}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        {/*District*/}
        <FormField label="อำเภอ (District)">
          <Select
            value={districtCode}
            onValueChange={(value) => {
              setDistrictCode(value);
              setSubdistrictCode("");
              setPostalCode("");
              handleInputChange("district", value);
            }}
          >
            <SelectTrigger className="bayer-input">
              <SelectValue placeholder="เลือกอำเภอ" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d.code} value={d.code}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        {/*Subdistrict*/}
        <FormField label="ตำบล (Subdistrict)">
          <Select
            value={subdistrictCode}
            onValueChange={(value) => {
              setSubdistrictCode(value);
              handleInputChange("subdistrict", value);
            }}
          >
            <SelectTrigger className="bayer-input">
              <SelectValue placeholder="ในเมือง" />
            </SelectTrigger>
            <SelectContent>
              {subdistricts.map((s) => (
                <SelectItem key={s.code} value={s.code}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        {/*Postal Code*/}
        <FormField required={false} label="รหัสไปรษณีย์ (Postal Code)">
          <Input
            readOnly
            value={postalCode}
            onChange={(e) => handleInputChange("postalCode", e.target.value)}
            placeholder="10100"
            className="bayer-input"
          />
        </FormField>
      </div>
    </>
  );
}
