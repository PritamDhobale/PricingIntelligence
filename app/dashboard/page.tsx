"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Edit3,
  Save,
  Star,
  BarChart3,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function PropertyDashboard() {
  const [selectedProperty, setSelectedProperty] = useState("grand-boutique")
  const [dateRange, setDateRange] = useState("week")
  const [showEvents, setShowEvents] = useState(true)
  const [applyPeerPricing, setApplyPeerPricing] = useState(false)
  const [sensitivity, setSensitivity] = useState([75])
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const [overrideValues, setOverrideValues] = useState<{ [key: number]: string }>({})

  const properties = [
    { value: "grand-boutique", label: "Grand Boutique Hotel" },
    { value: "riverside-inn", label: "Riverside Inn" },
    { value: "downtown-suites", label: "Downtown Suites" },
  ]

  const kpiData = [
    { title: "Utilization", value: "78%", change: "+5%", trend: "up", color: "green" },
    { title: "ADR", value: "$245", change: "+$12", trend: "up", color: "green" },
    { title: "Peer Group ADR", value: "$238", change: "+$8", trend: "up", color: "blue" },
    { title: "Sensitivity Score", value: "7.2", change: "-0.3", trend: "down", color: "yellow" },
    { title: "Suggested ADR", value: "$252", change: "+$7", trend: "up", color: "purple" },
    { title: "Manual Overrides", value: "3", change: "0", trend: "neutral", color: "gray" },
    { title: "Delta vs Last Year", value: "+12%", change: "+2%", trend: "up", color: "green" },
  ]

  const pricingData = [
    {
      date: "2024-01-15",
      roomType: "Studio",
      booked: 8,
      max: 12,
      utilization: 67,
      adr: 245,
      peerAdr: 238,
      change: 2.9,
      sensitivity: 6.8,
      suggested: 252,
      override: "",
      isEvent: false,
      sensitivityLevel: "medium",
    },
    {
      date: "2024-01-16",
      roomType: "Studio",
      booked: 11,
      max: 12,
      utilization: 92,
      adr: 245,
      peerAdr: 242,
      change: 1.2,
      sensitivity: 8.9,
      suggested: 265,
      override: "",
      isEvent: true,
      sensitivityLevel: "high",
    },
    {
      date: "2024-01-17",
      roomType: "Loft",
      booked: 4,
      max: 8,
      utilization: 50,
      adr: 320,
      peerAdr: 315,
      change: 1.6,
      sensitivity: 4.2,
      suggested: 310,
      override: "325",
      isEvent: false,
      sensitivityLevel: "low",
    },
    {
      date: "2024-01-18",
      roomType: "Studio",
      booked: 9,
      max: 12,
      utilization: 75,
      adr: 245,
      peerAdr: 240,
      change: 2.1,
      sensitivity: 7.5,
      suggested: 248,
      override: "",
      isEvent: false,
      sensitivityLevel: "medium",
    },
  ]

  const getSensitivityColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-50 border-green-200"
      case "medium":
        return "bg-yellow-50 border-yellow-200"
      case "high":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const handleEdit = (index: number) => {
    setEditingRow(index)
    setOverrideValues({
      ...overrideValues,
      [index]: pricingData[index].override || pricingData[index].suggested.toString(),
    })
  }

  const handleSave = (index: number) => {
    setEditingRow(null)
    // Here you would save the override value
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pricing Intelligence</h1>
              <p className="text-gray-600">Property Dashboard</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filter Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Property:</label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.value} value={property.value}>
                        {property.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Date Range:</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Switch id="show-events" checked={showEvents} onCheckedChange={setShowEvents} />
                <label htmlFor="show-events" className="text-sm font-medium">
                  Show Events
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Switch id="peer-pricing" checked={applyPeerPricing} onCheckedChange={setApplyPeerPricing} />
                <label htmlFor="peer-pricing" className="text-sm font-medium">
                  Apply Peer Pricing
                </label>
              </div>

              <div className="flex items-center gap-2 min-w-48">
                <label className="text-sm font-medium">Sensitivity:</label>
                <Slider value={sensitivity} onValueChange={setSensitivity} max={100} step={1} className="flex-1" />
                <span className="text-sm text-gray-600 w-8">{sensitivity[0]}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : kpi.trend === "down" ? (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      ) : null}
                      <span
                        className={`text-xs ${
                          kpi.trend === "up"
                            ? "text-green-600"
                            : kpi.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-2 h-8 rounded-full bg-${kpi.color}-500`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Pricing Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Interactive Pricing Table
            </CardTitle>
            <CardDescription>Real-time pricing data with inline editing capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Booked/Max</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>ADR</TableHead>
                    <TableHead>Peer ADR</TableHead>
                    <TableHead>Change %</TableHead>
                    <TableHead>Sensitivity</TableHead>
                    <TableHead>Suggested ADR</TableHead>
                    <TableHead>Override</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingData.map((row, index) => (
                    <TableRow key={index} className={getSensitivityColor(row.sensitivityLevel)}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell>{row.roomType}</TableCell>
                      <TableCell>
                        <span className="font-medium">{row.booked}</span>
                        <span className="text-gray-500">/{row.max}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={row.utilization > 80 ? "default" : row.utilization > 60 ? "secondary" : "outline"}
                        >
                          {row.utilization}%
                        </Badge>
                      </TableCell>
                      <TableCell>${row.adr}</TableCell>
                      <TableCell className="text-blue-600">${row.peerAdr}</TableCell>
                      <TableCell>
                        <span className={row.change > 0 ? "text-green-600" : "text-red-600"}>
                          {row.change > 0 ? "+" : ""}
                          {row.change}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{row.sensitivity}</span>
                          {row.sensitivity > 8 && <AlertTriangle className="w-3 h-3 text-red-500" />}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-purple-600">${row.suggested}</TableCell>
                      <TableCell>
                        {editingRow === index ? (
                          <div className="flex items-center gap-1">
                            <Input
                              value={overrideValues[index] || ""}
                              onChange={(e) => setOverrideValues({ ...overrideValues, [index]: e.target.value })}
                              className="w-20 h-8"
                              placeholder="$"
                            />
                            <Button size="sm" variant="ghost" onClick={() => handleSave(index)}>
                              <Save className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            {row.override && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                ${row.override}
                              </Badge>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => handleEdit(index)}>
                              <Edit3 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{row.isEvent && <Star className="w-4 h-4 text-amber-500" />}</TableCell>
                      <TableCell>
                        <Link href={`/details/${row.date}-${row.roomType.toLowerCase()}`}>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Strategy Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Strategy Panel</CardTitle>
            <CardDescription>Configure monthly targets and seasonal adjustments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["January 2024", "February 2024", "March 2024"].map((month, index) => (
                <div
                  key={month}
                  className={`p-4 rounded-lg border-2 ${
                    index === 0
                      ? "bg-red-50 border-red-200"
                      : index === 1
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-green-50 border-green-200"
                  }`}
                >
                  <h4 className="font-medium mb-2">{month}</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-600">Target Utilization</label>
                      <Input defaultValue={`${70 + index * 10}%`} className="h-8" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Factor Modifier</label>
                      <Input defaultValue={`${100 + index * 5}%`} className="h-8" />
                    </div>
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
