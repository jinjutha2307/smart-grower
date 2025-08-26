"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  MapPin,
  TrendingUp,
  Clock,
  Bell,
  Activity,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    // Simulate last login time
    setLastLogin(
      new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Total Growers",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-700",
      bgColor: "bayer-blue-gradient",
    },
    {
      title: "Active Contracts",
      value: "856",
      change: "+8%",
      icon: FileText,
      color: "text-green-700",
      bgColor: "bayer-green-gradient",
    },
    {
      title: "Total Revenue",
      value: "฿2.4M",
      change: "+15%",
      icon: DollarSign,
      color: "text-teal-700",
      bgColor: "bg-gradient-to-r from-teal-500 to-teal-600",
    },
    {
      title: "Growth Rate",
      value: "15.3%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-orange-700",
      bgColor: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
  ];

  const quickActions = [
    {
      title: "Register New Grower",
      description: "Add a new grower to the system",
      href: "/growers/register",
      icon: Users,
      color: "bayer-blue-gradient",
    },
    {
      title: "Create Pre-contract",
      description: "Generate a new pre-contract form",
      href: "/contracts/pre-contract",
      icon: FileText,
      color: "bayer-green-gradient",
    },
    {
      title: "View Reports",
      description: "Access analytics and reports",
      href: "/reports",
      icon: Activity,
      color: "bg-gradient-to-r from-teal-500 to-teal-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New grower registered",
      grower: "สมชาย ใจดี",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      action: "Contract signed",
      grower: "สมหญิง รักษ์ดิน",
      time: "4 hours ago",
      type: "info",
    },
    {
      id: 3,
      action: "Location updated",
      grower: "วิชัย เกษตรกร",
      time: "6 hours ago",
      type: "warning",
    },
    {
      id: 4,
      action: "Payment received",
      grower: "นิรันดร์ ปลูกผัก",
      time: "1 day ago",
      type: "success",
    },
    {
      id: 5,
      action: "Contract renewal",
      grower: "สุดา เกษตรกรรม",
      time: "2 days ago",
      type: "info",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bayer-card rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Welcome to Smart Grower
            </h1>
            <p className="text-blue-700 text-lg mb-4">
              Your comprehensive agriculture management platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Current time: {currentTime}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="h-24 w-24 rounded-full bayer-gradient flex items-center justify-center shadow-lg">
              <Users className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
