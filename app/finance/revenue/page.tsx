"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChartIcon, DollarSign, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export default function RevenueAnalysis() {
  const revenueBreakdown = [
    { name: "Room Revenue", value: 75000, percentage: 75, color: "#3b82f6" },
    { name: "F&B Revenue", value: 15000, percentage: 15, color: "#ef4444" },
    { name: "Spa & Services", value: 8000, percentage: 8, color: "#f59e0b" },
    { name: "Other Revenue", value: 2000, percentage: 2, color: "#10b981" },
  ]

  const monthlyRevenue = [
    { month: "Oct", rooms: 72000, fb: 14000, services: 7500, other: 1800 },
    { month: "Nov", rooms: 68000, fb: 13500, services: 7000, other: 1700 },
    { month: "Dec", rooms: 78000, fb: 16000, services: 8500, other: 2200 },
    { month: "Jan", rooms: 75000, fb: 15000, services: 8000, other: 2000 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <PieChartIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Revenue Analysis</h1>
              <p className="text-muted-foreground">Comprehensive revenue breakdown and performance metrics</p>
            </div>
          </div>
          <Badge variant="secondary">Monthly View</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">$100K</p>
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
                  <p className="text-sm text-muted-foreground">Room Revenue</p>
                  <p className="text-2xl font-bold">$75K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <PieChartIcon className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">75% of total</span>
                  </div>
                </div>
                <PieChartIcon className="w-8 h-8 text-blue-500" />
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
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trends</CardTitle>
              <CardDescription>Revenue by category over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rooms" stackId="a" fill="#3b82f6" name="Rooms" />
                  <Bar dataKey="fb" stackId="a" fill="#ef4444" name="F&B" />
                  <Bar dataKey="services" stackId="a" fill="#f59e0b" name="Services" />
                  <Bar dataKey="other" stackId="a" fill="#10b981" name="Other" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Stream Analysis</CardTitle>
            <CardDescription>Detailed breakdown of revenue sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((stream, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: stream.color }} />
                    <div>
                      <h4 className="font-medium">{stream.name}</h4>
                      <p className="text-sm text-muted-foreground">{stream.percentage}% of total revenue</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${stream.value.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+5% vs last month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
