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
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Last login: {lastLogin}</span>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bayer-card hover:bg-white/35 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor} shadow-md`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {stat.value}
              </div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Card className="bayer-card hover:bg-white/35 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${action.color} shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">
                      {action.title}
                    </h3>
                    <p className="text-sm text-blue-700">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activities & System Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bayer-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Bell className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription className="text-blue-700">
              Latest updates from your platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-blue-700">{activity.grower}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      activity.type === "success"
                        ? "default"
                        : activity.type === "info"
                        ? "secondary"
                        : "outline"
                    }
                    className="mb-1"
                  >
                    {activity.type}
                  </Badge>
                  <p className="text-xs text-blue-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Announcements */}
        <Card className="bayer-card">
          <CardHeader>
            <CardTitle className="text-blue-900">
              System Announcements
            </CardTitle>
            <CardDescription className="text-blue-700">
              Important updates and notices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-100/70 border border-blue-200/70 hover:bg-blue-100/90 transition-all">
              <h4 className="font-semibold text-blue-900 mb-2">
                System Maintenance
              </h4>
              <p className="text-sm text-blue-800">
                Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM
              </p>
              <p className="text-xs text-blue-700 mt-2">Posted 2 days ago</p>
            </div>
            <div className="p-4 rounded-lg bg-green-100/70 border border-green-200/70 hover:bg-green-100/90 transition-all">
              <h4 className="font-semibold text-green-900 mb-2">New Feature</h4>
              <p className="text-sm text-green-800">
                Enhanced PDF export functionality now available
              </p>
              <p className="text-xs text-green-700 mt-2">Posted 1 week ago</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-100/70 border border-orange-200/70 hover:bg-orange-100/90 transition-all">
              <h4 className="font-semibold text-orange-900 mb-2">
                Training Session
              </h4>
              <p className="text-sm text-orange-800">
                Join our training session next Friday at 10:00 AM
              </p>
              <p className="text-xs text-orange-700 mt-2">Posted 3 days ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
