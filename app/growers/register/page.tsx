"use client";

import { useEffect, useState } from "react";
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

import {
  Upload,
  Save,
  User,
  Camera,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormFieldComponent from "@/components/common/form/form-field-component";
import AddressForm from "@/components/common/form/address-form";
import { createGrowersData, uploadPhoto } from "@/lib/api";
import { GrowersFormData } from "@/types";
import UserAvatar from "@/components/ui/user-avatar";

interface ErrorState {
  [key: string]: string | undefined;
}

interface PersonalDataField {
  label: string;
  field: keyof GrowersFormData;
  placeholder?: string;
  value: string | number | null;
  child?: React.ReactNode;
}

export default function GrowerRegisterPage({
  growerData,
  disabled,
}: {
  growerData?: GrowersFormData | null;
  disabled?: boolean;
}) {
  const [formData, setFormData] = useState<GrowersFormData>({
    growerId: "",
    citizenId: "",
    firstName: "",
    lastName: "",
    gender: "",
    citizenIdIssueDate: "",
    citizenIdExpiryDate: "",
    citizenBirthDate: "",
    age: 0,
    phone: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zipCode: "",
    photo: null,
  });

  useEffect(() => {
    if (growerData) {
      setFormData(growerData);
    }
  }, [growerData]);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (growerData) {
      setPhotoPreview(`${process.env.NEXT_PUBLIC_API_URL}${growerData.photo}`);
    }
  }, [growerData]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (field: string, value: any) => {
    if (field === "citizenBirthDate" && value != "") {
      setFormData((prev) => ({ ...prev, age: ageCalcuate(value) }));
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 100 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "File size must be less than 100KB",
        }));
        return;
      }

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
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: ErrorState = {};

    Object.keys(formData).forEach((field) => {
      if (field === "citizenId" || field === "email" || field === "phone") {
        if (field === "citizenId") {
          if (formData.citizenId.length > 13) {
            newErrors.citizenId = "Citizen ID must be 13 digits";
          } else if (
            formData.citizenId &&
            !/^\d{13}$/.test(formData.citizenId)
          ) {
            newErrors.citizenId =
              "Invalid citizen ID format (1-2345-67890-12-3)";
          }
        }

        if (field === "email") {
          if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          ) {
            newErrors.email = "Invalid email format";
          }
        }

        if (field === "phone") {
          if (formData.phone.length > 10) {
            newErrors.phone = "Phone number must be 10 digits";
          } else if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone format (123-456-7890)";
          }
        }
      } else {
        if (
          typeof formData[field as keyof GrowersFormData] === "string" &&
          !(formData[field as keyof GrowersFormData] as string).trim()
        ) {
          newErrors[field] = `${field} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      let photoUrl = "";
      if (formData.photo && formData.photo instanceof File) {
        const data = await uploadPhoto(formData.photo);
        photoUrl = data.url;
      }
      const updatedFormData: GrowersFormData = { ...formData, photo: photoUrl };
      await createGrowersData(updatedFormData);

      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          growerId: "",
          citizenId: "",
          firstName: "",
          lastName: "",
          gender: "",
          citizenIdIssueDate: "",
          citizenIdExpiryDate: "",
          citizenBirthDate: "",
          age: 0,
          phone: "",
          email: "",
          address: "",
          state: "",
          city: "",
          zipCode: "",
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

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bayer-card border-white/30 max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Success!</h2>
            <p className="text-green-600 mb-4">Register Successfully!</p>
            <p className="text-sm text-gray-600">
              Redirecting to form in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ageCalcuate = (birthDate: string) => {
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (isNaN(age) || age < 0) {
      return 0;
    }

    return age;
  };

  const personalDataFields: PersonalDataField[] = [
    {
      label: "Grower ID",
      field: "growerId",
      value: formData.growerId.toUpperCase(),
      placeholder: "GR001",
    },
    {
      label: "Citizen ID",
      field: "citizenId",
      value: formData.citizenId,
      placeholder: "1-2345-67890-12-3",
    },
    {
      label: "First Name",
      field: "firstName",
      value: formData.firstName,
      placeholder: "Jane",
    },
    {
      label: "Last Name",
      field: "lastName",
      value: formData.lastName,
      placeholder: "Smith",
    },
    {
      label: "Gender",
      field: "gender",
      value: formData.gender,
      child: (
        <RadioGroup
          className="flex items-center space-x-3 "
          value={formData.gender}
          onValueChange={(value: string) => handleInputChange("gender", value)}
        >
          <div className="flex items-center space-x-1 cursor-pointer">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-1 cursor-pointer">
            <RadioGroupItem value="others" id="others" />
            <Label htmlFor="others">Others</Label>
          </div>
        </RadioGroup>
      ),
    },
    {
      label: "Citizen Birth Date",
      field: "citizenBirthDate",
      value: formData.citizenBirthDate,
      child: (
        <Input
          type="date"
          value={formData.citizenBirthDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("citizenBirthDate", e.target.value)
          }
          className="bayer-input"
        />
      ),
    },
    {
      label: "Age",
      field: "age",
      value: formData.age,
      child: <div className="text- text-black md:text-sm">{formData.age}</div>,
    },
    {
      label: "Citizen ID Issue Date",
      field: "citizenIdIssueDate",
      value: formData.citizenIdIssueDate,
      child: (
        <Input
          type="date"
          value={formData.citizenIdIssueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("citizenIdIssueDate", e.target.value)
          }
          className="bayer-input"
        />
      ),
    },
    {
      label: "Citizen ID Expiry Date",
      field: "citizenIdExpiryDate",
      value: formData.citizenIdExpiryDate,
      child: (
        <Input
          type="date"
          value={formData.citizenIdExpiryDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("citizenIdExpiryDate", e.target.value)
          }
          className="bayer-input"
        />
      ),
    },
    {
      label: "Phone",
      field: "phone",
      value: formData.phone,
      placeholder: "xxx-xxx-xxxx",
    },
    {
      label: "Email",
      field: "email",
      value: formData.email,
      placeholder: "jennie@example.com",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bayer-card rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              Grower Registration
            </h1>
            <p className="text-blue-700">
              Complete farmer details for system entry
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
            <CardTitle className="text-blue-900">Grower Photo</CardTitle>
            <CardDescription>Upload photo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-green-400 transition-colors">
                  {photoPreview ? (
                    <UserAvatar
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
                  Upload Photo
                </Button>
                <p className="text-sm text-gray-600">
                  Supports JPG, PNG files up to 100KB
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
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalDataFields.map((item) => (
              <FormFieldComponent
                key={item.field}
                item={item}
                errors={errors}
                value={item.value}
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
            type="submit"
            disabled={isLoading}
            className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white min-w-[140px]"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                saved
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
