"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, Users } from 'lucide-react'
import Link from "next/link"

export default function GrowersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  
  const growers = [
    {
      id: "GR001",
      name: "สมชาย ใจดี",
      citizenId: "1-2345-67890-12-3",
      phone: "08-1234-5678",
      email: "somchai@example.com",
      cropType: "ข้าว",
      farmSize: "10 ไร่",
      status: "active",
      registeredDate: "2024-01-15",
      province: "กรุงเทพมหานคร"
    },
    {
      id: "GR002", 
      name: "สมหญิง รักษ์ดิน",
      citizenId: "1-2345-67890-12-4",
      phone: "08-1234-5679",
      email: "somying@example.com",
      cropType: "ข้าวโพด",
      farmSize: "15 ไร่",
      status: "active",
      registeredDate: "2024-01-20",
      province: "เชียงใหม่"
    },
    {
      id: "GR003",
      name: "วิชัย เกษตรกร",
      citizenId: "1-2345-67890-12-5", 
      phone: "08-1234-5680",
      email: "wichai@example.com",
      cropType: "อ้อย",
      farmSize: "25 ไร่",
      status: "inactive",
      registeredDate: "2024-02-01",
      province: "ขอนแก่น"
    },
    {
      id: "GR004",
      name: "นิรันดร์ ปลูกผัก",
      citizenId: "1-2345-67890-12-6",
      phone: "08-1234-5681",
      email: "niran@example.com",
      cropType: "ผัก",
      farmSize: "8 ไร่",
      status: "active",
      registeredDate: "2024-02-10",
      province: "นครราชสีมา"
    },
    {
      id: "GR005",
      name: "สุดา เกษตรกรรม",
      citizenId: "1-2345-67890-12-7",
      phone: "08-1234-5682",
      email: "suda@example.com",
      cropType: "ผลไม้",
      farmSize: "20 ไร่",
      status: "active",
      registeredDate: "2024-02-15",
      province: "ชลบุรี"
    }
  ]

  const filteredGrowers = growers.filter(grower => {
    const matchesSearch = grower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grower.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grower.cropType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || grower.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const handleExportData = () => {
    // Simulate data export
    const csvContent = [
      "Grower ID,Name,Citizen ID,Phone,Email,Crop Type,Farm Size,Status,Province,Registered Date",
      ...filteredGrowers.map(grower => 
        `${grower.id},"${grower.name}",${grower.citizenId},${grower.phone},${grower.email},${grower.cropType},${grower.farmSize},${grower.status},${grower.province},${grower.registeredDate}`
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'growers_data.csv'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bayer-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              รายชื่อเกษตรกร (Grower List)
            </h1>
            <p className="text-blue-700">
              จัดการข้อมูลเกษตรกรทั้งหมดในระบบ ({filteredGrowers.length} รายการ)
            </p>
          </div>
          <Link href="/growers/register">
            <Button className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มเกษตรกรใหม่
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
                placeholder="ค้นหาด้วยชื่อ, รหัสเกษตรกร, หรือประเภทพืช..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bayer-input"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bayer-input rounded-md text-sm"
              >
                <option value="all">ทั้งหมด</option>
                <option value="active">ใช้งาน</option>
                <option value="inactive">ไม่ใช้งาน</option>
              </select>
              <Button 
                variant="outline" 
                className="bayer-card border-gray-200"
                onClick={handleExportData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Growers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrowers.map((grower) => (
          <Card key={grower.id} className="bayer-card border-white/30 hover:bg-white/30 transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-900 group-hover:text-blue-900 transition-colors">
                  {grower.name}
                </CardTitle>
                <Badge className={getStatusColor(grower.status)}>
                  {grower.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                </Badge>
              </div>
              <CardDescription className="text-blue-700">
                รหัส: {grower.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">เลขบัตรประชาชน:</span>
                  <span className="font-medium text-xs">{grower.citizenId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">เบอร์โทร:</span>
                  <span className="font-medium">{grower.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">อีเมล:</span>
                  <span className="font-medium text-xs">{grower.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ประเภทพืช:</span>
                  <span className="font-medium">{grower.cropType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ขนาดฟาร์ม:</span>
                  <span className="font-medium">{grower.farmSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จังหวัด:</span>
                  <span className="font-medium text-xs">{grower.province}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">วันที่ลงทะเบียน:</span>
                  <span className="font-medium text-xs">{grower.registeredDate}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-3 border-t border-white/20">
                <Button size="sm" variant="outline" className="flex-1 bayer-card border-blue-200 text-blue-700 hover:bg-blue-50 transition-all">
                  <Eye className="h-4 w-4 mr-1" />
                  ดู
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bayer-card border-green-200 text-green-700 hover:bg-green-50 transition-all">
                  <Edit className="h-4 w-4 mr-1" />
                  แก้ไข
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bayer-card border-red-200 text-red-700 hover:bg-red-50 transition-all">
                  <Trash2 className="h-4 w-4 mr-1" />
                  ลบ
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredGrowers.length === 0 && (
        <Card className="bayer-card border-white/30">
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              ไม่พบข้อมูลเกษตรกร
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'ลองเปลี่ยนคำค้นหา' : 'ยังไม่มีเกษตรกรในระบบ'} หรือเพิ่มเกษตรกรใหม่
            </p>
            <Link href="/growers/register">
              <Button className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มเกษตรกรใหม่
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      {filteredGrowers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {filteredGrowers.filter(g => g.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Growers</div>
          </Card>
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(filteredGrowers.map(g => g.cropType)).size}
            </div>
            <div className="text-sm text-gray-600">Crop Types</div>
          </Card>
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(filteredGrowers.map(g => g.province)).size}
            </div>
            <div className="text-sm text-gray-600">Provinces</div>
          </Card>
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredGrowers.reduce((sum, g) => sum + parseFloat(g.farmSize.replace(' ไร่', '')), 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Total Farm Size (ไร่)</div>
          </Card>
        </div>
      )}
    </div>
  )
}
