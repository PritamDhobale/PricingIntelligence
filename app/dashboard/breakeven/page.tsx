"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, TrendingUp, TrendingDown, DollarSign, Percent, Calculator } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"

export default function BreakevenAnalysis() {
  const [timeframe, setTimeframe] = useState("month")
  const [fixedCosts, setFixedCosts] = useState("45000")
  const [variableCostRate, setVariableCostRate] = useState("35")

  const breakevenData = [
    { month: "Jan", revenue: 78000, costs: 52000, breakeven: 45000, rooms: 320 },
    { month: "Feb", revenue: 72000, costs: 48000, breakeven: 45000, rooms: 290 },
    { month: "Mar", revenue: 85000, costs: 55000, breakeven: 45000, rooms: 350 },
    { month: "Apr", revenue: 92000, costs: 58000, breakeven: 45000, rooms: 380 },
    { month: "May", revenue: 98000, costs: 62000, breakeven: 45000, rooms: 400 },
    { month: "Jun", revenue: 105000, costs: 68000, breakeven: 45000, rooms: 420 },
  ]

  const roomTypeBreakeven = [
    { type: "Studio", breakeven: 180, current: 245, margin: 36, rooms: 12 },
    { type: "Loft", breakeven: 250, current: 320, margin: 28, rooms: 8 },
    { type: "Suite", breakeven: 320, current: 450, margin: 41, rooms: 4 },
    { type: "Penthouse", breakeven: 500, current: 750, margin: 50, rooms: 2 },
  ]

  const costBreakdown = [
    { name: "Staff", value: 18000, color: "#3b82f6" },
    { name: "Utilities", value: 8000, color: "#ef4444" },
    { name: "Maintenance", value: 6000, color: "#f59e0b" },
    { name: "Marketing", value: 4000, color: "#10b981" },
    { name: "Insurance", value: 3000, color: "#8b5cf6" },
    { name: "Other", value: 6000, color: "#6b7280" },
  ]

  const calculateBreakeven = () => {
    const fixed = parseFloat(fixedCosts)
    const variableRate = parseFloat(variableCostRate) / 100
    const avgADR = 245 // Current average ADR
    const breakevenRooms = Math.ceil(fixed / (avgADR * (1 - variableRate)))
    return breakevenRooms
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Breakeven Analysis</h1>
            <p className="text-muted-foreground">Monitor profitability thresholds and cost structures</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
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
                  <p className="text-sm text-muted-foreground">Breakeven Rooms/Month</p>
                  <p className="text-2xl font-bold">{calculateBreakeven()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">Current target</span>
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
                  <p className="text-sm text-muted-foreground">Current Margin</p>
                  <p className="text-2xl font-bold">34%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+2% vs last month</span>
                  </div>
                </div>
                <Percent className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fixed Costs</p>
                  <p className="text-2xl font-bold">${parseInt(fixedCosts).toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-600">Monthly</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Safety Margin</p>
                  <p className="text-2xl font-bold">45%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Above breakeven</span>
                  </div>
                </div>
                <Calculator className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakeven Calculator */}
        <Card>
          <CardHeader>
            <CardTitle>Breakeven Calculator</CardTitle>
            <CardDescription>Adjust cost parameters to see breakeven point changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fixed-costs">Monthly Fixed Costs ($)</Label>
                  <Input
                    id="fixed-costs"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(e.target.value)}
                    placeholder="45000"
                  />
                </div>
                <div>
                  <Label htmlFor="variable-rate">Variable Cost Rate (%)</Label>
                  <Input
                    id="variable-rate"
                    value={variableCostRate}
                    onChange={(e) => setVariableCostRate(e.target.value)}
                    placeholder="35"
                  />
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Breakeven Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Rooms needed/month:</span>
                    <span className="font-medium">{calculateBreakeven()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rooms needed/day:</span>
                    <span className="font-medium">{Math.ceil(calculateBreakeven() / 30)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilization needed:</span>
                    <span className="font-medium">{Math.round((calculateBreakeven() / (26 * 30)) * 100)}%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">Current Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Actual rooms/month:</span>
                    <span className="font-medium">380</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Above breakeven:</span>
                    <span className="font-medium text-green-600">+{380 - calculateBreakeven()} rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety margin:</span>
                    <span className="font-medium text-green-600">
                      {Math.round(((380 - calculateBreakeven()) / calculateBreakeven()) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue vs Costs Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Costs Trend</CardTitle>
              <CardDescription>Monthly performance against breakeven</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={breakevenData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="costs" stroke="#ef4444" strokeWidth={2} name="Total Costs" />
                  <Line type="monotone" dataKey="breakeven" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Breakeven" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Structure Breakdown</CardTitle>
              <CardDescription>Monthly fixed cost distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Room Type Breakeven Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Room Type Breakeven Analysis</CardTitle>
            <CardDescription>Profitability analysis by room category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Room Type</th>
                    <th className="text-left p-2">Breakeven ADR</th>
                    <th className="text-left p-2">Current ADR</th>
                    <th className="text-left p-2">Margin</th>
                    <th className="text-left p-2">Available Rooms</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roomTypeBreakeven.map((room, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{room.type}</td>
                      <td className="p-2">${room.breakeven}</td>
                      <td className="p-2 font-medium">${room.current}</td>
                      <td className="p-2">
                        <Badge variant={room.margin > 30 ? "default" : "secondary"}>
                          {room.margin}%
                        </Badge>
                      </td>
                      <td className="p-2">{room.rooms}</td>
                      <td className="p-2">
                        <Badge className={room.current > room.breakeven ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {room.current > room.breakeven ? "Profitable" : "At Risk"}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Button variant="outline" size="sm">
                          Optimize
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Scenario Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Scenario Analysis</CardTitle>
            <CardDescription>Impact of different occupancy rates on profitability</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { scenario: "50% Occupancy", revenue: 58500, profit: 6500, margin: 11 },
                { scenario: "60% Occupancy", revenue: 70200, profit: 18200, margin: 26 },
                { scenario: "70% Occupancy", revenue: 81900, profit: 29900, margin: 37 },
                { scenario: "80% Occupancy", revenue: 93600, profit: 41600, margin: 44 },
                { scenario: "90% Occupancy", revenue: 105300, profit: 53300, margin: 51 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scenario" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                <Bar dataKey="profit" fill="#10b981" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
