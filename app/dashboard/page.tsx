"use client"

import { useState } from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { supabase } from '@/lib/supabase'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Edit3,
  Save,
  Star,
  BarChart3,
  Settings,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

  type PricingRow = {
  date: string
  roomType: string
  bookedMax: string
  utilization: number
  adr: number
  peerAdr: number | null
  changePct: number | null
  sensitivity: number
  suggestedAdr: number
  override: number | null
  isEvent: boolean
}

const [kpiData, setKpiData] = useState([
  { title: "Utilization", value: "—", change: "—", trend: "neutral", color: "green" },
  { title: "ADR", value: "—", change: "—", trend: "neutral", color: "green" },
  { title: "Peer Group ADR", value: "—", change: "—", trend: "blue", color: "blue" },
  { title: "Sensitivity Score", value: "—", change: "—", trend: "neutral", color: "yellow" },
  { title: "Suggested ADR", value: "—", change: "—", trend: "neutral", color: "purple" },
  { title: "Manual Overrides", value: "—", change: "—", trend: "neutral", color: "gray" },
  { title: "Delta vs Last Year", value: "—", change: "—", trend: "neutral", color: "green" },
])

const [pricingRows, setPricingRows] = useState<PricingRow[]>([])

const colorMap: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  gray: "bg-gray-500",
}


useEffect(() => {
  loadDashboard().catch(console.error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedProperty, dateRange, applyPeerPricing, sensitivity])

  // const kpiData = [
  //   { title: "Utilization", value: "78%", change: "+5%", trend: "up", color: "green" },
  //   { title: "ADR", value: "$245", change: "+$12", trend: "up", color: "green" },
  //   { title: "Peer Group ADR", value: "$238", change: "+$8", trend: "up", color: "blue" },
  //   { title: "Sensitivity Score", value: "7.2", change: "-0.3", trend: "down", color: "yellow" },
  //   { title: "Suggested ADR", value: "$252", change: "+$7", trend: "up", color: "purple" },
  //   { title: "Manual Overrides", value: "3", change: "0", trend: "neutral", color: "gray" },
  //   { title: "Delta vs Last Year", value: "+12%", change: "+2%", trend: "up", color: "green" },
  // ]

  // const pricingData = [
  //   {
  //     date: "2024-01-15",
  //     roomType: "Studio",
  //     booked: 8,
  //     max: 12,
  //     utilization: 67,
  //     adr: 245,
  //     peerAdr: 238,
  //     change: 2.9,
  //     sensitivity: 6.8,
  //     suggested: 252,
  //     override: "",
  //     isEvent: false,
  //     sensitivityLevel: "medium",
  //   },
  //   {
  //     date: "2024-01-16",
  //     roomType: "Studio",
  //     booked: 11,
  //     max: 12,
  //     utilization: 92,
  //     adr: 245,
  //     peerAdr: 242,
  //     change: 1.2,
  //     sensitivity: 8.9,
  //     suggested: 265,
  //     override: "",
  //     isEvent: true,
  //     sensitivityLevel: "high",
  //   },
  //   {
  //     date: "2024-01-17",
  //     roomType: "Loft",
  //     booked: 4,
  //     max: 8,
  //     utilization: 50,
  //     adr: 320,
  //     peerAdr: 315,
  //     change: 1.6,
  //     sensitivity: 4.2,
  //     suggested: 310,
  //     override: "325",
  //     isEvent: false,
  //     sensitivityLevel: "low",
  //   },
  //   {
  //     date: "2024-01-18",
  //     roomType: "Studio",
  //     booked: 9,
  //     max: 12,
  //     utilization: 75,
  //     adr: 245,
  //     peerAdr: 240,
  //     change: 2.1,
  //     sensitivity: 7.5,
  //     suggested: 248,
  //     override: "",
  //     isEvent: false,
  //     sensitivityLevel: "medium",
  //   },
  // ]

  // + add inside component
async function getPropertyIdByCode(code: string) {
  const { data, error } = await supabase
    .from("properties")
    .select("id")
    .eq("code", code)
    .single()
  if (error) throw error
  return data.id as string
}

function rangeFromUI() {
  const today = new Date()
  const start = new Date()
  if (dateRange === "week") start.setDate(today.getDate() - 6)
  else if (dateRange === "month") start.setDate(today.getDate() - 29)
  else start.setDate(today.getDate() - 6) // fallback
  const iso = (d: Date) => d.toISOString().slice(0,10)
  return { start: iso(start), end: iso(today) }
}

async function loadDashboard() {
  const propertyCode = selectedProperty // e.g., 'grand-boutique'
  // const propertyId = await getPropertyIdByCode(propertyCode)
  let propertyId: string
  try {
    propertyId = await getPropertyIdByCode(propertyCode)
  } catch (e) {
    console.error(e)
    // Fallback to the default property and bail out gracefully
    if (selectedProperty !== "grand-boutique") setSelectedProperty("grand-boutique")
    return
  }
  const { start, end } = rangeFromUI()

  // Pricing table
  const pt = await supabase.rpc("get_pricing_table", {
    p_property: propertyId,
    p_start: start,
    p_end: end,
  })

  if (pt.error) throw pt.error

  const mapped: PricingRow[] = (pt.data ?? []).map((r: any) => ({
    date: r.date,
    roomType: r.room_type,
    bookedMax: r.booked_max,
    utilization: Number(r.utilization ?? 0),
    adr: Number(r.adr ?? 0),
    peerAdr: r.peer_adr !== null ? Number(r.peer_adr) : null,
    changePct: r.change_pct !== null ? Number(r.change_pct) : null,
    sensitivity: Number(r.sensitivity ?? 0),
    suggestedAdr: r.suggested_adr != null ? Number(r.suggested_adr) : Number(r.adr ?? 0),
    override: r.override !== null ? Number(r.override) : null,
    isEvent: !!r.event,
  }))

  const tweak = applyPeerPricing
  ? mapped.map(r => {
      if (r.peerAdr) {
        // nudge by slider (75 -> +0.5%, 25 -> -0.5% around neutral 50)
        const nudge = (sensitivity[0] - 50) / 100; // -0.5 .. +0.5
        return { ...r, suggestedAdr: Number((r.peerAdr * (1 + nudge)).toFixed(2)) }
      }
      return r
    })
  : mapped
  setPricingRows(tweak)

  // average Suggested ADR from the rows we’re actually using in the table
const usedRows = applyPeerPricing ? tweak : mapped
const suggestedAvg = usedRows.length
  ? Number(
      (usedRows.reduce((sum, r) => sum + (r.suggestedAdr ?? 0), 0) / usedRows.length).toFixed(2)
    )
  : 0



  // Summary cards
  const sum = await supabase.rpc("get_dashboard_summary", {
    p_property: propertyId,
    p_start: start,
    p_end: end,
  })
  if (sum.error) throw sum.error
  const s = sum.data?.[0] ?? {}

  setKpiData([
    { title: "Utilization", value: `${s.utilization ?? 0}%`, change: "+0%", trend: "up", color: "green" },
    { title: "ADR", value: `$${s.adr ?? 0}`, change: "+$0", trend: "up", color: "green" },
    { title: "Peer Group ADR", value: s.peer_adr ? `$${s.peer_adr}` : "—", change: "", trend: "neutral", color: "blue" },
    { title: "Sensitivity Score", value: `${s.avg_sensitivity ?? 0}`, change: "", trend: "neutral", color: "yellow" },
    { title: "Suggested ADR", value: `$${suggestedAvg}`, change: "", trend: "neutral", color: "purple" },
    { title: "Manual Overrides", value: `${s.manual_overrides ?? 0}`, change: "", trend: "neutral", color: "gray" },
    { title: "Delta vs Last Year", value: `${s.delta_vs_last_year ?? 0}%`, change: "", trend: "up", color: "green" },
  ])
}

  // + add inside component
async function saveOverride(dateStr: string, roomTypeName: string, value: number) {
  const propertyId = await getPropertyIdByCode(selectedProperty)
  const { data: rt, error: rtErr } = await supabase
    .from("room_types")
    .select("id")
    .eq("property_id", propertyId)
    .eq("name", roomTypeName)
    .single()
  if (rtErr) throw rtErr

  const { error } = await supabase
    .from("manual_overrides")
    .upsert({
      property_id: propertyId,
      room_type_id: rt.id,
      rate_date: dateStr,
      override_rate: value,
      note: "UI override",
    })
  if (error) throw error
}

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
    const r = pricingRows[index]
    setOverrideValues((prev) => ({
      ...prev,
      [index]: (r.override ?? r.suggestedAdr).toString(),
    }))
  }

  const handleSave = async (index: number) => {
    const r = pricingRows[index]
    const value = Number(overrideValues[index])
    if (Number.isNaN(value)) return
    await saveOverride(r.date, r.roomType, value)
    setEditingRow(null)
    await loadDashboard()
  }

  // const handleEdit = (index: number) => {
  //   setEditingRow(index)
  //   setOverrideValues({
  //     ...overrideValues,
  //     [index]: pricingData[index].override || pricingData[index].suggested.toString(),
  //   })
  // }

  // const handleSave = (index: number) => {
  //   setEditingRow(null)
  //   // Here you would save the override value
  // }
  
  // decide which rows to render based on the switch
  const displayedRows = showEvents ? pricingRows : pricingRows.filter(r => !r.isEvent)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div> */}
            <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden">
                <Image
                  src="/images/logo2.png"
                  alt="Pricing Intelligence logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  priority
                />
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
                  <div className={`w-2 h-8 rounded-full ${colorMap[kpi.color]}`}></div>
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
                  {displayedRows.map((row, index) => (
                    <TableRow key={`${row.date}-${row.roomType}-${index}`} className={getSensitivityColor(
                      row.sensitivity >= 8 ? "high" : row.sensitivity >= 6 ? "medium" : "low"
                    )}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell>{row.roomType}</TableCell>
                      <TableCell>{row.bookedMax}</TableCell>
                      <TableCell>
                        <Badge variant={row.utilization > 80 ? "default" : row.utilization > 60 ? "secondary" : "outline"}>
                          {row.utilization}%
                        </Badge>
                      </TableCell>
                      <TableCell>${row.adr}</TableCell>
                      <TableCell className="text-blue-600">{row.peerAdr ? `$${row.peerAdr}` : "—"}</TableCell>
                      <TableCell>
                        {(() => {
                          const change = row.changePct
                          const cls =
                            change == null ? "text-gray-500"
                            : change > 0 ? "text-green-600"
                            : "text-red-600"
                          return (
                            <span className={cls}>
                              {change == null ? "—" : `${change > 0 ? "+" : ""}${change}%`}
                            </span>
                          )
                        })()}
                      </TableCell>
                      <TableCell>{row.sensitivity}</TableCell>
                      <TableCell className="font-medium text-purple-600">${row.suggestedAdr}</TableCell>
                      <TableCell>
                        {editingRow === index ? (
                          <div className="flex items-center gap-1">
                            <Input
                              value={overrideValues[index] ?? ""}
                              onChange={(e) =>
                                setOverrideValues((prev) => ({ ...prev, [index]: e.target.value }))
                              }
                              className="w-24 h-8"
                              placeholder="$"
                            />
                            <Button size="sm" variant="ghost" onClick={() => handleSave(index)}>
                              <Save className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            {row.override !== null && (
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
                      <TableCell>{row.isEvent ? <Star className="w-4 h-4 text-amber-500" /> : null}</TableCell>
                      <TableCell>
                        <Link href={`/details/${row.date}-${row.roomType.toLowerCase()}`}>
                          <Button size="sm" variant="outline">Details</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* {pricingData.map((row, index) => (
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
                  ))} */}
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
