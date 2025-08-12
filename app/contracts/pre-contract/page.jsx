"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Eye, Download, Send, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { FormField } from "@/components/ui/form-field"

export default function PreContractPage() {
  const [contractData, setContractData] = useState({
    contractId: `PC-${Date.now()}`,
    growerId: "",
    growerName: "",
    cropType: "",
    quantity: "",
    pricePerUnit: "",
    totalValue: "",
    startDate: "",
    endDate: "",
    deliveryLocation: "",
    paymentTerms: "",
    specialConditions: "",
    signature: ""
  })

  const [termsAccepted, setTermsAccepted] = useState({
    qualityStandards: false,
    deliverySchedule: false,
    paymentTerms: false,
    forcemajeure: false,
    dataPrivacy: false
  })

  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")

  // Sample grower data
  const growerData = {
    "GR001": "สมชาย ใจดี",
    "GR002": "สมหญิง รักษ์ดิน", 
    "GR003": "วิชัย เกษตรกร",
    "GR004": "นิรันดร์ ปลูกผัก",
    "GR005": "สุดา เกษตรกรรม"
  }

  const handleInputChange = (field, value) => {
    setContractData(prev => {
      const updated = { ...prev, [field]: value }
      
      // Auto-populate grower name when grower ID is selected
      if (field === 'growerId' && growerData[value]) {
        updated.growerName = growerData[value]
      }
      
      // Auto-calculate total value
      if (field === 'quantity' || field === 'pricePerUnit') {
        const quantity = parseFloat(field === 'quantity' ? value : updated.quantity) || 0
        const price = parseFloat(field === 'pricePerUnit' ? value : updated.pricePerUnit) || 0
        updated.totalValue = (quantity * price).toFixed(2)
      }
      
      return updated
    })

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleTermsChange = (term, checked) => {
    setTermsAccepted(prev => ({ ...prev, [term]: checked }))
  }

  const allTermsAccepted = Object.values(termsAccepted).every(Boolean)

  const validateForm = () => {
    const newErrors = {}

    if (!contractData.growerId) newErrors.growerId = "Please select a grower"
    if (!contractData.cropType) newErrors.cropType = "Please select crop type"
    if (!contractData.quantity) newErrors.quantity = "Quantity is required"
    if (!contractData.pricePerUnit) newErrors.pricePerUnit = "Price per unit is required"
    if (!contractData.startDate) newErrors.startDate = "Start date is required"
    if (!contractData.endDate) newErrors.endDate = "End date is required"

    // Validate date range
    if (contractData.startDate && contractData.endDate) {
      if (new Date(contractData.startDate) >= new Date(contractData.endDate)) {
        newErrors.endDate = "End date must be after start date"
      }
    }

    // Validate numeric values
    if (contractData.quantity && (isNaN(contractData.quantity) || parseFloat(contractData.quantity) <= 0)) {
      newErrors.quantity = "Quantity must be a positive number"
    }

    if (contractData.pricePerUnit && (isNaN(contractData.pricePerUnit) || parseFloat(contractData.pricePerUnit) <= 0)) {
      newErrors.pricePerUnit = "Price must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true)
    }
  }

  const handleDownloadPDF = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you would generate and download a PDF
      console.log("Generating PDF with data:", contractData)
      setSuccessMessage("PDF generated successfully!")
      
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      setErrors({ submit: "Failed to generate PDF" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendToDocuSign = async () => {
    if (!validateForm() || !allTermsAccepted) {
      if (!allTermsAccepted) {
        setErrors({ terms: "Please accept all terms and conditions" })
      }
      return
    }

    setIsLoading(true)
    try {
      // Simulate DocuSign integration
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      console.log("Sending to DocuSign:", contractData)
      setSuccessMessage("Document sent to DocuSign successfully!")
      
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      setErrors({ submit: "Failed to send to DocuSign" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm() || !allTermsAccepted) {
      if (!allTermsAccepted) {
        setErrors({ terms: "Please accept all terms and conditions" })
      }
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Contract submitted:", contractData)
      setSuccessMessage("Pre-contract created successfully!")
      
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      setErrors({ submit: "Failed to create contract" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bayer-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              สัญญาเบื้องต้น (Pre-Contract Form)
            </h1>
            <p className="text-blue-700">
              สร้างและจัดการสัญญาเบื้องต้นกับเกษตรกร
            </p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">
            <FileText className="h-4 w-4 mr-1" />
            {contractData.contractId}
          </Badge>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Card className="bayer-card border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span>{successMessage}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contract Basic Info */}
            <Card className="bayer-card border-white/30">
              <CardHeader>
                <CardTitle className="text-blue-900">ข้อมูลพื้นฐาน (Basic Information)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="รหัสเกษตรกร (Grower ID)" required error={errors.growerId}>
                  <Select onValueChange={(value) => handleInputChange('growerId', value)}>
                    <SelectTrigger className="bayer-input">
                      <SelectValue placeholder="เลือกเกษตรกร" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(growerData).map(([id, name]) => (
                        <SelectItem key={id} value={id}>
                          {id} - {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="ชื่อเกษตรกร (Grower Name)">
                  <Input
                    value={contractData.growerName}
                    className="bayer-input bg-gray-50"
                    readOnly
                    placeholder="Auto-filled when grower selected"
                  />
                </FormField>

                <FormField label="ประเภทพืช (Crop Type)" required error={errors.cropType}>
                  <Select onValueChange={(value) => handleInputChange('cropType', value)}>
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
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="สถานที่ส่งมอบ (Delivery Location)">
                  <Input
                    value={contractData.deliveryLocation}
                    onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                    placeholder="โรงงาน ABC"
                    className="bayer-input"
                  />
                </FormField>
              </CardContent>
            </Card>

            {/* Contract Terms */}
            <Card className="bayer-card border-white/30">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  เงื่อนไขสัญญา (Contract Terms)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="ปริมาณ (Quantity)" required error={errors.quantity}>
                  <Input
                    type="number"
                    value={contractData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    placeholder="1000"
                    className="bayer-input"
                    min="0"
                    step="0.01"
                  />
                </FormField>

                <FormField label="ราคาต่อหน่วย (Price/Unit)" required error={errors.pricePerUnit}>
                  <Input
                    type="number"
                    step="0.01"
                    value={contractData.pricePerUnit}
                    onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                    placeholder="15.50"
                    className="bayer-input"
                    min="0"
                  />
                </FormField>

                <FormField label="มูลค่ารวม (Total Value)">
                  <Input
                    value={contractData.totalValue ? `฿${parseFloat(contractData.totalValue).toLocaleString()}` : ""}
                    className="bayer-input bg-gray-50"
                    readOnly
                    placeholder="Auto-calculated"
                  />
                </FormField>

                <FormField label="วันที่เริ่มต้น (Start Date)" required error={errors.startDate}>
                  <Input
                    type="date"
                    value={contractData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="bayer-input"
                  />
                </FormField>

                <FormField label="วันที่สิ้นสุด (End Date)" required error={errors.endDate}>
                  <Input
                    type="date"
                    value={contractData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="bayer-input"
                  />
                </FormField>

                <FormField label="เงื่อนไขการชำระเงิน">
                  <Select onValueChange={(value) => handleInputChange('paymentTerms', value)}>
                    <SelectTrigger className="bayer-input">
                      <SelectValue placeholder="เลือกเงื่อนไข" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">เงินสด</SelectItem>
                      <SelectItem value="30days">เครดิต 30 วัน</SelectItem>
                      <SelectItem value="60days">เครดิต 60 วัน</SelectItem>
                      <SelectItem value="installment">ผ่อนชำระ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </CardContent>
            </Card>

            {/* Special Conditions */}
            <Card className="bayer-card border-white/30">
              <CardHeader>
                <CardTitle className="text-blue-900">เงื่อนไขพิเศษ (Special Conditions)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={contractData.specialConditions}
                  onChange={(e) => handleInputChange('specialConditions', e.target.value)}
                  placeholder="ระบุเงื่อนไขพิเศษ (ถ้ามี)..."
                  className="bayer-input"
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card className="bayer-card border-white/30">
              <CardHeader>
                <CardTitle className="text-blue-900">ข้อตกลงและเงื่อนไข (Terms & Conditions)</CardTitle>
                <CardDescription>กรุณาอ่านและยอมรับเงื่อนไขทั้งหมด</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'qualityStandards', label: 'ยอมรับมาตรฐานคุณภาพสินค้า' },
                  { key: 'deliverySchedule', label: 'ยอมรับตารางการส่งมอบ' },
                  { key: 'paymentTerms', label: 'ยอมรับเงื่อนไขการชำระเงิน' },
                  { key: 'forcemajeure', label: 'ยอมรับเงื่อนไขเหตุสุดวิสัย' },
                  { key: 'dataPrivacy', label: 'ยอมรับนโยบายความเป็นส่วนตัว' }
                ].map((term) => (
                  <div key={term.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={term.key}
                      checked={termsAccepted[term.key]}
                      onCheckedChange={(checked) => handleTermsChange(term.key, checked)}
                    />
                    <Label htmlFor={term.key} className="text-sm cursor-pointer">
                      {term.label}
                    </Label>
                  </div>
                ))}
                
                {errors.terms && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.terms}
                  </p>
                )}
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
                onClick={handlePreview}
                className="bayer-card border-blue-200 text-blue-700 hover:bg-blue-50"
                disabled={isLoading}
              >
                <Eye className="h-4 w-4 mr-2" />
                ดูตัวอย่าง
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadPDF}
                className="bayer-card border-purple-200 text-purple-700 hover:bg-purple-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Download PDF
              </Button>
              <Button
                type="button"
                onClick={handleSendToDocuSign}
                disabled={!allTermsAccepted || isLoading}
                className="bayer-blue-gradient hover:from-blue-600 hover:to-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    กำลังส่ง...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    ส่งไป DocuSign
                  </>
                )}
              </Button>
              <Button
                type="submit"
                disabled={!allTermsAccepted || isLoading}
                className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <FileText className="h-4 w-4 mr-2" />
                )}
                สร้างสัญญา
              </Button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <Card className="bayer-card border-white/30 sticky top-24">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                ตัวอย่างสัญญา
              </CardTitle>
              <CardDescription>Live preview ของสัญญาที่กำลังสร้าง</CardDescription>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-white/50 rounded-lg border">
                    <h3 className="font-bold text-center mb-4 text-blue-900">สัญญาเบื้องต้น</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">เลขที่สัญญา:</span>
                        <span className="font-medium">{contractData.contractId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">เกษตรกร:</span>
                        <span className="font-medium">{contractData.growerName || 'ยังไม่ระบุ'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ประเภทพืช:</span>
                        <span className="font-medium">{contractData.cropType || 'ยังไม่ระบุ'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ปริมาณ:</span>
                        <span className="font-medium">{contractData.quantity || '0'} หน่วย</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ราคา:</span>
                        <span className="font-medium">{contractData.pricePerUnit || '0'} บาท/หน่วย</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600 font-semibold">มูลค่ารวม:</span>
                        <span className="font-bold text-green-600">
                          ฿{contractData.totalValue ? parseFloat(contractData.totalValue).toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ระยะเวลา:</span>
                        <span className="font-medium text-xs">
                          {contractData.startDate || 'ยังไม่ระบุ'} ถึง {contractData.endDate || 'ยังไม่ระบุ'}
                        </span>
                      </div>
                      {contractData.deliveryLocation && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">สถานที่ส่งมอบ:</span>
                          <span className="font-medium text-xs">{contractData.deliveryLocation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <Badge variant={allTermsAccepted ? "default" : "secondary"} className="text-xs">
                      {allTermsAccepted ? "พร้อมสร้างสัญญา" : "รอการยอมรับเงื่อนไข"}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Terms accepted: {Object.values(termsAccepted).filter(Boolean).length}/5
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">คลิก "ดูตัวอย่าง" เพื่อแสดงตัวอย่างสัญญา</p>
                  <p className="text-xs mt-2">กรอกข้อมูลให้ครบถ้วนก่อนดูตัวอย่าง</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
