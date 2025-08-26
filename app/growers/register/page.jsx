"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Save,
  Download,
  User,
  Camera,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FormField } from "@/components/ui/form-field";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { set } from "date-fns";
import { se } from "date-fns/locale";
import FormFieldComponent from "@/components/common/form/form-field-component";
import AddressForm from "@/components/common/form/address-form";

export default function GrowerRegisterPage() {
  const [formData, setFormData] = useState({
    growerId: "",
    citizenId: "",
    firstNameTH: "",
    firstNameEN: "",
    lastNameTH: "",
    lastNameEN: "",
    gender: "",
    citizenIdIssueDate: "",
    citizenIdExpiryDate: "",
    citizenBirthDate: "",
    age: "0",
    phone: "",
    email: "",
    address: "",
    province: "",
    district: "",
    subdistrict: "",
    postalCode: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === "citizenBirthDate" && value != "") {
      setFormData((prev) => ({ ...prev, age: ageCalcuate(value) }));
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      // Clear error when user starts typing
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (100KB limit)
      if (file.size > 100 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "File size must be less than 100KB",
        }));

        return;
      }

      // Validate file type
      if (
        !file.type.startsWith("image/webp") &&
        !file.type.startsWith("image/jpeg") &&
        !file.type.startsWith("image/png")
      ) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please select a valid image file",
        }));

        return;
      }

      setFormData((prev) => ({ ...prev, photo: file }));
      setErrors((prev) => ({ ...prev, photo: "" }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    formData.map((field) => {
      if (field === "citizenId" || field === "email" || field === "phone") {
        // Validate citizen ID format (basic validation)
        if (
          formData.citizenId &&
          !/^\d{1}-\d{4}-\d{5}-\d{2}-\d{1}$/.test(formData.citizenId)
        ) {
          newErrors.citizenId = "Invalid citizen ID format (1-2345-67890-12-3)";
        }

        // Validate email format
        if (
          formData.email &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
          newErrors.email = "Invalid email format";
        }

        // Validate phone format
        if (formData.phone && !/^0\d{1}-\d{4}-\d{4}$/.test(formData.phone)) {
          newErrors.phone = "Invalid phone format (08-1234-5678)";
        }
      } else {
        if (!formData[field].trim()) newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          growerId: "",
          citizenId: "",
          firstNameTH: "",
          firstNameEN: "",
          lastNameTH: "",
          lastNameEN: "",
          addressTH: "",
          addressEN: "",
          gender: "",
          citizenIdIssueDate: "",
          citizenIdExpiryDate: "",
          citizenBirthDate: "",
          age: "0",
          phone: "",
          email: "",
          address: "",
          province: "",
          district: "",
          subdistrict: "",
          postalCode: "",
          farmSize: "",
          cropType: "",
          experience: "",
          photo: null,
        });
        setPhotoPreview(null);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to register grower. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    console.log("Exporting to Excel...");
    // In a real app, you would generate and download an Excel file
    const link = document.createElement("a");
    link.href =
      "data:text/csv;charset=utf-8,Grower ID,Name,Citizen ID,Phone,Email\n" +
      `${formData.growerId},"${formData.firstName} ${formData.lastName}",${formData.citizenId},${formData.phone},${formData.email}`;
    link.download = "grower_data.csv";
    link.click();
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bayer-card border-white/30 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Success!</h2>
            <p className="text-green-600 mb-4">
              เกษตรกรได้รับการลงทะเบียนเรียบร้อยแล้ว!
            </p>
            <p className="text-sm text-gray-600">
              Redirecting to form in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ageCalcuate = (birthDate) => {
    const birthYear = new Date(birthDate).getFullYear();

    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (isNaN(age) || age < 0) {
      return "0";
    }
    return age;
  };

  const personalDataFields = [
    {
      label: "รหัสเกษตรกร (Grower ID)",
      field: "growerId",
      placeholder: "GR001",
    },
    {
      label: "เลขบัตรประชาชน (Citizen ID)",
      field: "citizenId",
      placeholder: "1-2345-67890-12-3",
    },
    { label: "ชื่อ", field: "firstNameTH", placeholder: "สมชาย" },
    { label: "First Name", field: "firstNameEN", placeholder: "Somchai" },
    { label: "นามสกุล", field: "lastNameTH", placeholder: "ใจดี" },
    { label: "Last Name", field: "lastNameEN", placeholder: "Jaidee" },
    {
      label: "เพศ",
      field: "gender",
      child: (
        <RadioGroup
          className="flex items-center space-x-3 "
          defaultValue={formData["gender"]}
          onValueChange={(value) => handleInputChange("gender", value)}
        >
          <div className="flex items-center space-x-1 cursor-pointer">
            <RadioGroupItem value="ชาย" id="male" />
            <Label htmlFor="male">ชาย</Label>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <RadioGroupItem value="หญิง" id="female" />
            <Label htmlFor="female">หญิง</Label>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <RadioGroupItem value="อื่นๆ" id="others" />
            <Label htmlFor="others">อื่นๆ</Label>
          </div>
        </RadioGroup>
      ),
    },
    {
      label: "วัน/เดือน/ปีเกิด (Citizen Birth Date)",
      field: "citizenBirthDate",
      child: (
        <Input
          type="date"
          value={formData.citizenBirthDate}
          onChange={(e) =>
            handleInputChange("citizenBirthDate", e.target.value)
          }
          className="bayer-input"
        />
      ),
    },
    {
      label: "อายุ (Age)",
      field: "age",
      child: <div className="text- text-black md:text-sm">{formData.age}</div>,
    },
    {
      label: "วันออกบัตรประชาชน (Citizen ID Issue Date)",
      field: "citizenIdIssueDate",
      child: (
        <Input
          type="date"
          value={formData.citizenIdIssueDate}
          onChange={(e) =>
            handleInputChange("citizenIdIssueDate", e.target.value)
          }
          className="bayer-input"
        />
      ),
    },
    {
      label: "วันหมดอายุบัตรประชาชน (Citizen ID Expiry Date)",
      field: "citizenIdExpiryDate",
      child: (
        <Input
          type="date"
          value={formData.citizenIdExpiryDate}
          onChange={(e) =>
            handleInputChange("citizenIdExpiryDate", e.target.value)
          }
          className="bayer-input"
        />
      ),
    },

    {
      label: "เบอร์โทรศัพท์ (Phone)",
      field: "phone",
      placeholder: "08-1234-5678",
    },
    {
      label: "อีเมล (Email)",
      field: "email",
      placeholder: "somchai@example.com",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bayer-card rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              ลงทะเบียนเกษตรกร (Grower Registration)
            </h1>
            <p className="text-blue-700">
              กรอกข้อมูลเกษตรกรเพื่อเพิ่มเข้าสู่ระบบ
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-800 border-green-300"
          >
            <User className="h-4 w-4 mr-1" />
            New Registration
          </Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload Section */}
        <Card className="bayer-card border-white/30">
          <CardHeader>
            <CardTitle className="text-blue-900">
              รูปเกษตรกร (Grower Photo)
            </CardTitle>
            <CardDescription>อัพโหลดรูปถ่ายของเกษตรกร</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-green-400 transition-colors">
                  {photoPreview ? (
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Grower photo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <div className="text-center sm:text-left">
                <Button type="button" variant="outline" className="mb-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="h-4 w-4 mr-2" />
                  เลือกรูปภาพ
                </Button>
                <p className="text-sm text-gray-600">
                  รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 100KB
                </p>
                {errors.photo && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.photo}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="bayer-card border-white/30">
          <CardHeader>
            <CardTitle className="text-blue-900">
              ข้อมูลส่วนตัว (Personal Information)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalDataFields.map((item) => (
              <FormFieldComponent
                item={item}
                errors={errors}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            ))}
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="bayer-card border-white/30">
          <CardHeader>
            <CardTitle className="text-blue-900">ที่อยู่ (Address)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddressForm
              errors={errors}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </CardContent>
        </Card>

        {/* Farm Information */}
        <Card className="bayer-card border-white/30">
          <CardHeader>
            <CardTitle className="text-blue-900">
              ข้อมูลการเกษตร (Farm Information)
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="ขนาดพื้นที่เกษตร (Farm Size)">
              <Input
                value={formData.farmSize}
                onChange={(e) => handleInputChange("farmSize", e.target.value)}
                placeholder="10 ไร่"
                className="bayer-input"
              />
            </FormField>

            <FormField label="ประเภทพืชที่ปลูก (Crop Type)">
              <Select
                onValueChange={(value) => handleInputChange("cropType", value)}
              >
                <SelectTrigger className="bayer-input">
                  <SelectValue placeholder="เลือกประเภทพืช" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">ข้าว</SelectItem>
                  <SelectItem value="corn">ข้าวโพด</SelectItem>
                  <SelectItem value="sugarcane">อ้อย</SelectItem>
                  <SelectItem value="cassava">มันสำปะหลัง</SelectItem>
                  <SelectItem value="vegetables">ผัก</SelectItem>
                  <SelectItem value="fruits">ผลไม้</SelectItem>
                  <SelectItem value="rubber">ยางพารา</SelectItem>
                  <SelectItem value="palm">ปาล์มน้ำมัน</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="ประสบการณ์ (Years of Experience)">
              <Input
                value={formData.experience}
                onChange={(e) =>
                  handleInputChange("experience", e.target.value)
                }
                placeholder="5 ปี"
                className="bayer-input"
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Error Display */}
        {errors.submit && (
          <Card className="bayer-card border-red-200 bg-red-50/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.submit}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleExportExcel}
            className="bayer-card border-blue-300 text-blue-800 hover:bg-blue-50"
            disabled={isLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white min-w-[140px]"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                กำลังบันทึก...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                บันทึกข้อมูล
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
