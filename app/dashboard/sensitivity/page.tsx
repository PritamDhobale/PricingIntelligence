"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from "recharts"

export default function SensitivityAnalysis() {
  const [timeframe, setTimeframe] = useState("month")
  const [sensitivityThreshold, setSensitivityThreshold] = useState([7.5])

  const sensitivityData = [
    { date: "Jan 15", sensitivity: 6.8, adr: 245, utilization: 78, bookings: 12 },
    { date: "Jan 16", sensitivity: 8.9, adr: 265, utilization: 92, bookings: 18 },
    { date: "Jan 17", sensitivity: 4.2, adr: 310, utilization: 50, bookings: 6 },
    { date: "Jan 18", sensitivity: 7.5, adr: 248, utilization: 75, bookings: 14 },
    { date: "Jan 19", sensitivity: 9.1, adr: 275, utilization: 88, bookings: 16 },
    { date: "Jan 20", sensitivity: 5.8, adr: 235, utilization: 65, bookings: 10 },
  ]

  const priceElasticityData = [
    { priceChange: -20, demandChange: 35, revenue: 108 },
    { priceChange: -15, demandChange: 28, revenue: 109 },
    { priceChange: -10, demandChange: 18, revenue: 106 },
    { priceChange: -5, demandChange: 12, revenue: 107 },
    { priceChange: 0, demandChange: 0, revenue: 100 },
    { priceChange: 5, demandChange: -8, revenue: 97 },
    { priceChange: 10, demandChange: -15, revenue: 94 },
    { priceChange: 15, demandChange: -22, revenue: 90 },
    { priceChange: 20, demandChange: -28, revenue: 86 },
  ]

  const getSensitivityLevel = (score: number) => {
    if (score > 8) return { level: "High", color: "bg-red-100 text-red-800", icon: AlertTriangle }
    if (score > 6) return { level: "Medium", color: "bg-yellow-100 text-yellow-800", icon: Activity }
    return { level: "Low", color: "bg-green-100 text-green-800", icon: Target }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Price Sensitivity Analysis</h1>
            <p className="text-muted-foreground">Monitor demand elasticity and price sensitivity patterns</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Sensitivity</p>
                  <p className="text-2xl font-bold">7.2</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+0.3 vs last week</span>
                  </div>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Sensitivity Days</p>
                  <p className="text-2xl font-bold">3</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertTriangle className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">Above 8.0 threshold</span>
                  </div>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Price Elasticity</p>
                  <p className="text-2xl font-bold">-1.8</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-600">Elastic demand</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Optimal Price Point</p>
                  <p className="text-2xl font-bold">$252</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Revenue maximizing</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sensitivity Threshold Control */}
        <Card>
          <CardHeader>
            <CardTitle>Sensitivity Threshold Settings</CardTitle>
            <CardDescription>Adjust the sensitivity threshold for alerts and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium min-w-32">Alert Threshold:</label>
                <Slider
                  value={sensitivityThreshold}
                  onValueChange={setSensitivityThreshold}
                  max={10}
                  min={1}
                  step={0.1}
                  className="flex-1 max-w-md"
                />
                <span className="text-sm font-medium min-w-12">{sensitivityThreshold[0]}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Dates with sensitivity scores above {sensitivityThreshold[0]} will trigger high-sensitivity alerts
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sensitivity Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Sensitivity Trend</CardTitle>
              <CardDescription>Price sensitivity scores over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sensitivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sensitivity"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Sensitivity Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Price Elasticity */}
          <Card>
            <CardHeader>
              <CardTitle>Price Elasticity Curve</CardTitle>
              <CardDescription>Demand response to price changes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={priceElasticityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priceChange" name="Price Change %" />
                  <YAxis dataKey="demandChange" name="Demand Change %" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter dataKey="demandChange" fill="#ef4444" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sensitivity Analysis Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sensitivity Breakdown</CardTitle>
            <CardDescription>Detailed sensitivity analysis by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Sensitivity Score</th>
                    <th className="text-left p-2">Level</th>
                    <th className="text-left p-2">ADR</th>
                    <th className="text-left p-2">Utilization</th>
                    <th className="text-left p-2">Bookings</th>
                    <th className="text-left p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sensitivityData.map((row, index) => {
                    const sensitivity = getSensitivityLevel(row.sensitivity)
                    const SensitivityIcon = sensitivity.icon
                    return (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{row.date}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{row.sensitivity}</span>
                            <SensitivityIcon className="w-4 h-4" />
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge className={sensitivity.color}>{sensitivity.level}</Badge>
                        </td>
                        <td className="p-2">${row.adr}</td>
                        <td className="p-2">
                          <Badge variant={row.utilization > 80 ? "default" : "secondary"}>
                            {row.utilization}%
                          </Badge>
                        </td>
                        <td className="p-2">{row.bookings}</td>
                        <td className="p-2">
                          <Button variant="outline" size="sm">
                            Adjust Price
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Impact Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Impact Analysis</CardTitle>
            <CardDescription>How price changes affect total revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceElasticityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priceChange" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue Index" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
