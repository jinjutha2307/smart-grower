"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Download, Eye, Edit, FileText } from 'lucide-react'
import Link from "next/link"

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const contracts = [
    {
      id: "PC-001",
      growerId: "GR001",
      growerName: "สมชาย ใจดี",
      cropType: "ข้าว",
      quantity: "1000",
      totalValue: "15500.00",
      status: "draft",
      createdDate: "2024-01-15",
      startDate: "2024-02-01",
      endDate: "2024-07-31"
    },
    {
      id: "PC-002",
      growerId: "GR002", 
      growerName: "สมหญิง รักษ์ดิน",
      cropType: "ข้าวโพด",
      quantity: "800",
      totalValue: "12400.00",
      status: "signed",
      createdDate: "2024-01-20",
      startDate: "2024-02-15",
      endDate: "2024-08-15"
    },
    {
      id: "PC-003",
      growerId: "GR003",
      growerName: "วิชัย เกษตรกร",
      cropType: "อ้อย",
      quantity: "2000",
      totalValue: "31000.00",
      status: "pending",
      createdDate: "2024-02-01",
      startDate: "2024-03-01",
      endDate: "2024-12-31"
    }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">ร่าง</Badge>
      case 'pending':
        return <Badge variant="outline" className="border-yellow-300 text-yellow-700">รอลงนาม</Badge>
      case 'signed':
        return <Badge variant="default" className="bg-green-500">ลงนามแล้ว</Badge>
      case 'expired':
        return <Badge variant="destructive">หมดอายุ</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredContracts = contracts.filter(contract =>
    contract.growerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bayer-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              รายการสัญญา (Contract List)
            </h1>
            <p className="text-blue-700">
              จัดการสัญญาทั้งหมดในระบบ
            </p>
          </div>
          <Link href="/contracts/pre-contract">
            <Button className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              สร้างสัญญาใหม่
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="bayer-card border-white/30">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="ค้นหาด้วยชื่อเกษตรกรหรือเลขที่สัญญา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bayer-input"
              />
            </div>
            <Button variant="outline" className="bayer-card border-gray-200">
              <Filter className="h-4 w-4 mr-2" />
              ตัวกรอง
            </Button>
            <Button variant="outline" className="bayer-card border-gray-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contracts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="bayer-card border-white/30 hover:bg-white/30 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {contract.id}
                </CardTitle>
                {getStatusBadge(contract.status)}
              </div>
              <CardDescription className="text-blue-700">
                เกษตรกร: {contract.growerName} ({contract.growerId})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ประเภทพืช:</span>
                  <p className="font-medium">{contract.cropType}</p>
                </div>
                <div>
                  <span className="text-gray-600">ปริมาณ:</span>
                  <p className="font-medium">{contract.quantity} หน่วย</p>
                </div>
                <div>
                  <span className="text-gray-600">มูลค่า:</span>
                  <p className="font-medium text-green-600">฿{parseFloat(contract.totalValue).toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">วันที่สร้าง:</span>
                  <p className="font-medium">{contract.createdDate}</p>
                </div>
              </div>
              
              <div className="p-3 bg-white/20 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-600">ระยะเวลาสัญญา:</span>
                  <p className="font-medium">{contract.startDate} ถึง {contract.endDate}</p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-3 border-t border-white/20">
                <Button size="sm" variant="outline" className="flex-1 bayer-card border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Eye className="h-4 w-4 mr-1" />
                  ดู
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bayer-card border-green-200 text-green-700 hover:bg-green-50">
                  <Edit className="h-4 w-4 mr-1" />
                  แก้ไข
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bayer-card border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredContracts.length === 0 && (
        <Card className="bayer-card border-white/30">
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FileText className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              ไม่พบสัญญา
            </h3>
            <p className="text-gray-500 mb-4">
              ลองเปลี่ยนคำค้นหาหรือสร้างสัญญาใหม่
            </p>
            <Link href="/contracts/pre-contract">
              <Button className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                สร้างสัญญาใหม่
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
