"use client"

import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase"
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

  // property we’re analyzing (same as dashboard)
  const PROPERTY_CODE = "grand-boutique"

  // derived data
  const [trendData, setTrendData] = useState<{month:string; revenue:number; costs:number; breakeven:number; rooms:number}[]>([])
  const [roomTypeRows, setRoomTypeRows] = useState<{type:string; breakeven:number; current:number; margin:number; rooms:number}[]>([])

  const [avgAdr, setAvgAdr] = useState<number>(245)
  const [totalRooms, setTotalRooms] = useState<number>(0)
  const [actualRooms, setActualRooms] = useState<number>(0)
  const [daysInRange, setDaysInRange] = useState<number>(30)
  const [rangeRevenue, setRangeRevenue] = useState<number>(0)


  // Derive a pie breakdown from fixedCosts (simple heuristic %s for now)
  const costBreakdown = useMemo(() => {
    const fixed = parseFloat(fixedCosts || "0")
    // Adjust these percentages any time; they should sum to ~100%
    const pct = {
      staff: 0.40,
      utilities: 0.18,
      maintenance: 0.13,
      marketing: 0.09,
      insurance: 0.07,
      other: 0.13,
    }
    return [
      { name: "Staff",       value: Math.round(fixed * pct.staff),       color: "#3b82f6" },
      { name: "Utilities",   value: Math.round(fixed * pct.utilities),   color: "#ef4444" },
      { name: "Maintenance", value: Math.round(fixed * pct.maintenance), color: "#f59e0b" },
      { name: "Marketing",   value: Math.round(fixed * pct.marketing),   color: "#10b981" },
      { name: "Insurance",   value: Math.round(fixed * pct.insurance),   color: "#8b5cf6" },
      { name: "Other",       value: Math.round(fixed * pct.other),       color: "#6b7280" },
    ]
  }, [fixedCosts])



  // const breakevenData = [
  //   { month: "Jan", revenue: 78000, costs: 52000, breakeven: 45000, rooms: 320 },
  //   { month: "Feb", revenue: 72000, costs: 48000, breakeven: 45000, rooms: 290 },
  //   { month: "Mar", revenue: 85000, costs: 55000, breakeven: 45000, rooms: 350 },
  //   { month: "Apr", revenue: 92000, costs: 58000, breakeven: 45000, rooms: 380 },
  //   { month: "May", revenue: 98000, costs: 62000, breakeven: 45000, rooms: 400 },
  //   { month: "Jun", revenue: 105000, costs: 68000, breakeven: 45000, rooms: 420 },
  // ]

  // const roomTypeBreakeven = [
  //   { type: "Studio", breakeven: 180, current: 245, margin: 36, rooms: 12 },
  //   { type: "Loft", breakeven: 250, current: 320, margin: 28, rooms: 8 },
  //   { type: "Suite", breakeven: 320, current: 450, margin: 41, rooms: 4 },
  //   { type: "Penthouse", breakeven: 500, current: 750, margin: 50, rooms: 2 },
  // ]

  // const costBreakdown = [
  //   { name: "Staff", value: 18000, color: "#3b82f6" },
  //   { name: "Utilities", value: 8000, color: "#ef4444" },
  //   { name: "Maintenance", value: 6000, color: "#f59e0b" },
  //   { name: "Marketing", value: 4000, color: "#10b981" },
  //   { name: "Insurance", value: 3000, color: "#8b5cf6" },
  //   { name: "Other", value: 6000, color: "#6b7280" },
  // ]

  const calculateBreakeven = () => {
    const fixed = parseFloat(fixedCosts || "0")
    const variableRate = parseFloat(variableCostRate || "0") / 100
    return Math.ceil(fixed / (Math.max(1, avgAdr) * (1 - variableRate)))
  }

  async function getPropertyIdByCode(code: string) {
    const { data, error } = await supabase.from("properties").select("id").eq("code", code).single()
    if (error) throw error
    return data.id as string
  }

  function monthKey(d: Date) {
    return d.toLocaleString("en-US", { month: "short" })
  }

  function getRange() {
    const end = new Date()
    const start = new Date(end)
    if (timeframe === "quarter") start.setMonth(end.getMonth() - 2, 1)
    else if (timeframe === "year") start.setMonth(end.getMonth() - 11, 1)
    else start.setMonth(end.getMonth(), 1) // this month
    const iso = (x: Date) => x.toISOString().slice(0, 10)
    // store number of days for utilization calc
    setDaysInRange(Math.max(1, Math.round((+end - +start) / (1000*60*60*24)) + 1))
    return { start: iso(start), end: iso(end), startDate: start, endDate: end }
  }

  useEffect(() => {
    (async () => {
      try {
        const propertyId = await getPropertyIdByCode(PROPERTY_CODE)
        const { start, end, startDate } = getRange()

        // SETTINGS: fixed + variable
        const { data: bs } = await supabase
          .from("breakeven_settings")
          .select("fixed_costs, variable_cost_rate")
          .eq("property_id", propertyId)
          .maybeSingle()
        if (bs) {
          if (bs.fixed_costs != null) setFixedCosts(String(bs.fixed_costs))
          if (bs.variable_cost_rate != null) setVariableCostRate(String(bs.variable_cost_rate))
        }

        // TOTAL ROOMS by property
        const { data: rtypes } = await supabase
          .from("room_types")
          .select("id, name, rooms_count")
          .eq("property_id", propertyId)
        const totalRoomsCount = (rtypes ?? []).reduce((s, r) => s + (r.rooms_count ?? 0), 0)
        setTotalRooms(totalRoomsCount)

        // AVG ADR for range (all room types)
        const { data: rates } = await supabase
          .from("published_rates")
          .select("room_type_id, rate_date, adr")
          .eq("property_id", propertyId)
          .gte("rate_date", start)
          .lte("rate_date", end)

        const allAdrs = (rates ?? []).map(r => Number(r.adr ?? 0)).filter(n => Number.isFinite(n) && n > 0)
        const propertyAvgAdr = allAdrs.length ? allAdrs.reduce((s, n) => s + n, 0) / allAdrs.length : 245
        setAvgAdr(Number(propertyAvgAdr.toFixed(2)))

        // CURRENT PERFORMANCE: actual rooms sold (rooms * nights) in range
        const { data: bk } = await supabase
          .from("bookings")
          .select("check_in, nights, rooms, status, price_per_night")
          .eq("status", "confirmed")
          .eq("property_id", propertyId)
          .gte("check_in", start)
          .lte("check_in", end)

        let roomsSold = 0
        let revenue = 0
        ;(bk ?? []).forEach(b => {
          const nights = b.nights ?? 0
          const rooms = b.rooms ?? 0
          roomsSold += rooms * nights
          revenue += (b.price_per_night ?? 0) * rooms * nights
        })
        setActualRooms(roomsSold)
        setRangeRevenue(revenue)

        // TREND (last 6 months): group bookings by month
        const sixMonthsAgo = new Date(startDate)
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5, 1)
        const { data: bk6 } = await supabase
          .from("bookings")
          .select("check_in, nights, rooms, price_per_night, status")
          .eq("status", "confirmed")
          .eq("property_id", propertyId)
          .gte("check_in", sixMonthsAgo.toISOString().slice(0,10))
          .lte("check_in", end)

        const months: Record<string, { revenue:number }> = {}
        ;(bk6 ?? []).forEach(b => {
          for (let i=0; i<(b.nights ?? 0); i++) {
            const d = new Date(b.check_in as string)
            d.setDate(d.getDate() + i)
            const label = monthKey(d)
            const add = (b.price_per_night ?? 0) * (b.rooms ?? 0)
            months[label] = { revenue: (months[label]?.revenue ?? 0) + add }
          }
        })

        const fixed = parseFloat((bs?.fixed_costs ?? fixedCosts) as any) || 0
        const vr = (parseFloat((bs?.variable_cost_rate ?? variableCostRate) as any) || 0) / 100

        const trend = Object.keys(months).sort((a,b) =>
          new Date(`${a} 1, 2024`).getMonth() - new Date(`${b} 1, 2024`).getMonth()
        ).map(m => {
          const rev = months[m].revenue
          const costs = fixed + vr * rev
          return { month: m, revenue: Math.round(rev), costs: Math.round(costs), breakeven: fixed, rooms: 0 }
        })
        setTrendData(trend)

        // ROOM-TYPE BREAK-EVEN table
        const byType: Record<string, {sum:number; cnt:number; name:string; rooms:number}> = {}
        ;(rates ?? []).forEach(r => {
          const id = String(r.room_type_id)
          const adr = Number(r.adr ?? 0)
          if (!byType[id]) {
            const rt = (rtypes ?? []).find(x => String(x.id) === id)
            byType[id] = { sum:0, cnt:0, name: rt?.name ?? "Room", rooms: rt?.rooms_count ?? 0 }
          }
          if (adr > 0) { byType[id].sum += adr; byType[id].cnt += 1 }
        })

        const perNightFixed = (fixed / Math.max(1, totalRoomsCount)) / Math.max(1, daysInRange) // fixed per room-night
        const rows = Object.values(byType).map(t => {
          const current = t.cnt ? t.sum / t.cnt : propertyAvgAdr
          const breakevenAdr = perNightFixed / (1 - vr)
          const margin = current > 0 ? Math.round(((current - breakevenAdr) / current) * 100) : 0
          return {
            type: t.name,
            breakeven: Math.round(breakevenAdr),
            current: Math.round(current),
            margin,
            rooms: t.rooms,
          }
        })
        setRoomTypeRows(rows)
      } catch (e) {
        console.error(e)
      }
    })()
    // re-load when timeframe or settings change
  }, [timeframe, fixedCosts, variableCostRate])

  async function saveSettings() {
    try {
      const propertyId = await getPropertyIdByCode(PROPERTY_CODE)
      await supabase.from("breakeven_settings").upsert({
        property_id: propertyId,
        fixed_costs: Number(fixedCosts || 0),
        variable_cost_rate: Number(variableCostRate || 0),
      })
    } catch (e) { console.error(e) }
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
                  <p className="text-2xl font-bold">
                    {rangeRevenue > 0
                      ? `${Math.round(
                          ((rangeRevenue - (parseFloat(fixedCosts || "0") +
                            (parseFloat(variableCostRate || "0") / 100) * rangeRevenue)) / rangeRevenue) * 100
                        )}%`
                      : "—"}
                  </p>
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
                  <p className="text-2xl font-bold">
                    {Math.round(((actualRooms - calculateBreakeven()) / Math.max(1, calculateBreakeven())) * 100)}%
                  </p>
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
                  <Input onBlur={saveSettings}
                    id="fixed-costs"
                    value={fixedCosts}
                    onChange={(e) => setFixedCosts(e.target.value)}
                    placeholder="45000"
                  />
                </div>
                <div>
                  <Label htmlFor="variable-rate">Variable Cost Rate (%)</Label>
                  <Input onBlur={saveSettings}
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
                    <span className="font-medium">{Math.ceil(calculateBreakeven() / Math.max(1, daysInRange))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">
                      {Math.round((calculateBreakeven() / Math.max(1, totalRooms * daysInRange)) * 100)}%
                    </span>
                    </div>
                </div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">Current Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Actual rooms/month:</span>
                    <span className="font-medium">{actualRooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Above breakeven:</span>
                    <span className="font-medium text-green-600">+{Math.max(0, actualRooms - calculateBreakeven())} rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Safety margin:</span>
                    <span className="font-medium text-green-600">
                      {Math.round(((actualRooms - calculateBreakeven()) / Math.max(1, calculateBreakeven())) * 100)}%
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
                <LineChart data={trendData}>
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
                    label={(p: any) => `${p.name}: $${Number(p.value).toLocaleString()}`}
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
                  {roomTypeRows.map((room, index) => (
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
