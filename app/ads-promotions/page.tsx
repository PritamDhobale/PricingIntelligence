"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Gift, TrendingUp, Target, Users, DollarSign } from 'lucide-react'
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function AdsPromotionsOverview() {
  const campaignData = [
    { month: "Oct", adSpend: 5000, revenue: 25000, bookings: 45 },
    { month: "Nov", adSpend: 4500, revenue: 22000, bookings: 38 },
    { month: "Dec", adSpend: 6000, revenue: 32000, bookings: 58 },
    { month: "Jan", adSpend: 5500, revenue: 28000, bookings: 52 },
  ]

  const promotionData = [
    { name: "Early Bird", bookings: 25, revenue: 8500 },
    { name: "Weekend Special", bookings: 18, revenue: 6200 },
    { name: "Extended Stay", bookings: 12, revenue: 4800 },
    { name: "Last Minute", bookings: 8, revenue: 2400 },
  ]

  const modules = [
    {
      title: "Advertising Campaigns",
      description: "Manage digital marketing campaigns and ad spend optimization",
      href: "/ads-promotions/ads",
      icon: Megaphone,
      value: "$5.5K",
      metric: "Monthly spend",
      change: "+8%",
    },
    {
      title: "Promotions & Packages",
      description: "Create and manage promotional offers and special packages",
      href: "/ads-promotions/promotions",
      icon: Gift,
      value: "63",
      metric: "Active bookings",
      change: "+15%",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Ads & Promotions</h1>
              <p className="text-muted-foreground">Marketing campaigns and promotional strategies</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">4 Active Campaigns</Badge>
            <Button>Create Campaign</Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Marketing Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ad Spend (MTD)</p>
                  <p className="text-2xl font-bold">$5.5K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+8% vs last month</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Campaign Revenue</p>
                  <p className="text-2xl font-bold">$28K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">5.1x ROAS</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Promo Bookings</p>
                  <p className="text-2xl font-bold">63</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">+15% vs last month</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.8%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">Above target</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Ad spend vs revenue generated</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="adSpend" stroke="#ef4444" strokeWidth={2} name="Ad Spend" />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Promotion Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Promotion Performance</CardTitle>
              <CardDescription>Bookings by promotion type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={promotionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Marketing Tools</CardTitle>
            <CardDescription>Manage your advertising and promotional campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon
                return (
                  <Link key={index} href={module.href}>
                    <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                        <div className="text-right">
                          <p className="text-2xl font-bold">{module.value}</p>
                          <p className="text-xs text-muted-foreground">{module.metric}</p>
                          <span className="text-xs text-green-600">{module.change}</span>
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
