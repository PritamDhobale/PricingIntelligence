"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, PieChart, TrendingDown, TrendingUp, Target, BarChart3 } from 'lucide-react'
import Link from "next/link"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export default function FinanceOverview() {
  const revenueData = [
    { name: "Room Revenue", value: 75000, color: "#3b82f6" },
    { name: "F&B", value: 15000, color: "#ef4444" },
    { name: "Services", value: 8000, color: "#f59e0b" },
    { name: "Other", value: 2000, color: "#10b981" },
  ]

  const monthlyData = [
    { month: "Oct", revenue: 95000, costs: 65000, profit: 30000 },
    { month: "Nov", revenue: 88000, costs: 62000, profit: 26000 },
    { month: "Dec", revenue: 105000, costs: 68000, profit: 37000 },
    { month: "Jan", revenue: 98000, costs: 66000, profit: 32000 },
  ]

  const financeModules = [
    {
      title: "Revenue Analysis",
      description: "Comprehensive revenue breakdown and performance metrics",
      href: "/finance/revenue",
      icon: PieChart,
      value: "$98K",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Breakeven Deep Dive",
      description: "Advanced breakeven analysis and profitability insights",
      href: "/finance/breakeven",
      icon: TrendingDown,
      value: "184 rooms",
      change: "-8 rooms",
      trend: "down",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finance Overview</h1>
              <p className="text-muted-foreground">Revenue analysis and financial performance metrics</p>
            </div>
          </div>
          <Badge variant="secondary">Financial Dashboard</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">$98K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+12% vs last month</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold">$32K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">32.7% margin</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Operating Costs</p>
                  <p className="text-2xl font-bold">$66K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">67.3% of revenue</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">RevPAR</p>
                  <p className="text-2xl font-bold">$191</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+8% vs last month</span>
                  </div>
                </div>
                <PieChart className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${(value/1000).toFixed(0)}K`}
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Revenue, costs, and profit trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="costs" fill="#ef4444" name="Costs" />
                  <Bar dataKey="profit" fill="#10b981" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Finance Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Analysis Tools</CardTitle>
            <CardDescription>Access detailed financial analysis and reporting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financeModules.map((module, index) => {
                const Icon = module.icon
                return (
                  <Link key={index} href={module.href}>
                    <div className="p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                        <div className="text-right">
                          <p className="text-2xl font-bold">{module.value}</p>
                          <div className="flex items-center gap-1">
                            {module.trend === "up" ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-green-500" />
                            )}
                            <span className="text-xs text-green-600">{module.change}</span>
                          </div>
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
