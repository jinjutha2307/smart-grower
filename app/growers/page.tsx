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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getGrowersListPage, Grower } from "@/lib/api";
import { Avatar } from "@/components/ui/avatar";

export default function GrowersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [growers, setGrowers] = useState<Grower[]>([]);

  async function getGrowersList() {
    const res: Grower[] = await getGrowersListPage();
    setGrowers(res);
  }

  useEffect(() => {
    getGrowersList();
  }, []);

  // const filteredGrowers = growers.filter((grower) => {
  //   const matchesSearch =
  //     grower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     grower.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     grower.cropType.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesFilter =
  //     filterStatus === "all" || grower.status === filterStatus;

  //   return matchesSearch && matchesFilter;
  // });

  // const handleExportData = () => {
  //   // Simulate data export
  //   const csvContent = [
  //     "Grower ID,Name,Citizen ID,Phone,Email,Crop Type,Farm Size,Status,Province,Registered Date",
  //     ...filteredGrowers.map(
  //       (grower) =>
  //         `${grower.id},"${grower.name}",${grower.citizenId},${grower.phone},${grower.email},${grower.cropType},${grower.farmSize},${grower.status},${grower.province},${grower.registeredDate}`
  //     ),
  //   ].join("\n");

  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "growers_data.csv";
  //   link.click();
  //   window.URL.revokeObjectURL(url);
  // };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200";
  };

  const tableHeaders = [
    "Grower ID",
    "Name",
    "Gender",
    "Phone",
    "Email",
    "Address",
    "Actions",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bayer-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-900 mb-2">
              Grower List
            </h1>
            <p className="text-blue-700">
              {/* จัดการข้อมูลเกษตรกรทั้งหมดในระบบ ({filteredGrowers.length} รายการ) */}
              จัดการข้อมูลเกษตรกรทั้งหมดในระบบ ({growers.length} รายการ)
            </p>
          </div>
          <Link href="/growers/register">
            <Button className="bayer-green-gradient hover:from-green-600 hover:to-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Register New Grower
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
                // onClick={handleExportData}
                onClick={() => {}}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full overflow-y-scroll overflow-x-hidden rounded-lg border border-stone-200 backdrop-blur-lg shadow-xl ">
        <table className="w-full">
          <thead className="border-b border-stone-200 bayer-gradient text-sm font-medium text-stone-200 dark:bg-surface-dark">
            <tr>
              {tableHeaders.map((header) => (
                <th className="px-2.5 py-2 text-start font-medium">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="group text-sm text-stone-800 dark:text-white">
            {growers.map((grower) => (
              <tr className="even:bg-stone-200 border-b border-stone-200 last:border-0">
                <td className="p-3">{grower.growerId}</td>
                <td className="relative inline-flex w-max items-center border rounded-full text-sm p-0.5 shadow-sm  border-stone-300">
                  <span className="grid place-items-start shrink-0 rounded-full translate-x-1 w-5 h-5">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${grower.photo}`}
                      alt={`${grower.firstName}'s profile photo`}
                      className="inline-block object-cover object-center rounded-full w-5 h-5"
                    />
                  </span>
                  <span className="text-current leading-none my-1 mx-2.5">
                    {grower.firstName} {grower.lastName}
                  </span>
                </td>
                <td className="p-3">{grower.gender}</td>
                <td className="p-3">{grower.phone}</td>
                <td className="p-3">{grower.email}</td>
                <td className="p-3">
                  {grower.address}, {grower.city}, {grower.state}{" "}
                  {grower.zipcode}
                </td>
                <td className="flex gap-2 pr-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-0.5 bayer-card border-green-200 text-green-700 hover:text-blue-700 hover:bg-green-50 transition-all"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-0.5 bayer-card border-red-200 text-red-700 hover:text-rose-500 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {growers.length === 0 && (
        <Card className="bayer-card border-white/30">
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              ไม่พบข้อมูลเกษตรกร
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? "ลองเปลี่ยนคำค้นหา" : "ยังไม่มีเกษตรกรในระบบ"}{" "}
              หรือเพิ่มเกษตรกรใหม่
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
      {/* {filteredGrowers.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-green-600">
              {filteredGrowers.filter((g) => g.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active Growers</div>
          </Card>
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(filteredGrowers.map((g) => g.cropType)).size}
            </div>
            <div className="text-sm text-gray-600">Crop Types</div>
          </Card>
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(filteredGrowers.map((g) => g.province)).size}
            </div>
            <div className="text-sm text-gray-600">Provinces</div>
          </Card>
          <Card className="bayer-card border-white/30 text-center p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredGrowers
                .reduce(
                  (sum, g) => sum + parseFloat(g.farmSize.replace(" ไร่", "")),
                  0
                )
                .toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Total Farm Size (ไร่)</div>
          </Card>
        </div>
      )} */}
    </div>
  );
}
