"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Calendar, TrendingUp, Users, DollarSign, Filter } from 'lucide-react'
import { toast } from "@/components/toast"
import { supabase } from "@/lib/supabase"

// // Sample data
// const bookingData = [
//   { date: "2024-01-01", bookings: 45, revenue: 12500, occupancy: 78 },
//   { date: "2024-01-02", bookings: 52, revenue: 14200, occupancy: 85 },
//   { date: "2024-01-03", bookings: 38, revenue: 10800, occupancy: 65 },
//   { date: "2024-01-04", bookings: 61, revenue: 16800, occupancy: 92 },
//   { date: "2024-01-05", bookings: 47, revenue: 13100, occupancy: 73 },
//   { date: "2024-01-06", bookings: 55, revenue: 15400, occupancy: 88 },
//   { date: "2024-01-07", bookings: 43, revenue: 12000, occupancy: 71 },
// ]

// const recentBookings = [
//   { id: "BK001", guest: "John Smith", room: "Deluxe Suite", checkIn: "2024-01-15", nights: 3, amount: 850, status: "confirmed" },
//   { id: "BK002", guest: "Sarah Johnson", room: "Standard Room", checkIn: "2024-01-16", nights: 2, amount: 320, status: "pending" },
//   { id: "BK003", guest: "Mike Wilson", room: "Premium Room", checkIn: "2024-01-17", nights: 4, amount: 720, status: "confirmed" },
//   { id: "BK004", guest: "Emma Davis", room: "Deluxe Suite", checkIn: "2024-01-18", nights: 1, amount: 280, status: "cancelled" },
//   { id: "BK005", guest: "David Brown", room: "Standard Room", checkIn: "2024-01-19", nights: 5, amount: 800, status: "confirmed" },
// ]

function BookingsContent() {
  const searchParams = useSearchParams()
  const [dateRange, setDateRange] = useState("7d")
  const [roomType, setRoomType] = useState("all")
  const [status, setStatus] = useState("all")

  // property to show (same one we used elsewhere)
  const PROPERTY_CODE = "grand-boutique"

  // chart/table data
  const [bookingData, setBookingData] = useState<
    Array<{ date: string; bookings: number; revenue: number; occupancy: number }>
  >([])

  const [recent, setRecent] = useState<
    Array<{ id: string; guest?: string; room?: string; checkIn: string; nights: number; amount: number; status: string }>
  >([])

  // KPIs
  const [totalBookings, setTotalBookings] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [avgOccupancy, setAvgOccupancy] = useState(0)
  const [conversionRate, setConversionRate] = useState(0)


  const handleExport = () => {
    const header = "date,bookings,revenue,occupancy\n"
    const rows = bookingData
      .map(d => `${d.date},${d.bookings},${d.revenue},${d.occupancy}`)
      .join("\n")
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `bookings_${dateRange}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Exported", "CSV downloaded")
  }

  const handleFilterChange = (type: string, value: string) => {
    if (type === "date") setDateRange(value)
    if (type === "room") setRoomType(value)
    if (type === "status") setStatus(value)
    toast.info("Filters Updated", "Booking data has been filtered")
  }

  async function getPropertyIdByCode(code: string) {
    const { data, error } = await supabase.from("properties").select("id").eq("code", code).single()
    if (error) throw error
    return data.id as string
  }

  function getRange() {
    const end = new Date()
    const start = new Date(end)
    if (dateRange === "7d") start.setDate(end.getDate() - 6)
    else if (dateRange === "30d") start.setDate(end.getDate() - 29)
    else start.setDate(end.getDate() - 89)
    const iso = (d: Date) => d.toISOString().slice(0, 10)
    return { start: iso(start), end: iso(end), startDate: start, endDate: end }
  }

  useEffect(() => {
    (async () => {
      try {
        const propertyId = await getPropertyIdByCode(PROPERTY_CODE)
        const { start, end, startDate, endDate } = getRange()

        // 1) Total rooms for occupancy denominator
        const { data: rtypes } = await supabase
          .from("room_types")
          .select("id, name, rooms_count")
          .eq("property_id", propertyId)

        const totalRooms =
          (rtypes ?? []).reduce((s, r: any) => s + Number(r.rooms_count ?? 0), 0) || 0

        // Optional room filter: map "standard/deluxe/suite" to ids via name match
        let roomTypeIds: string[] | null = null
        if (roomType !== "all") {
          const needle =
            roomType === "standard" ? "standard" :
            roomType === "deluxe"   ? "deluxe"   :
            roomType === "suite"    ? "suite"    : ""
          const { data: rtf } = await supabase
            .from("room_types")
            .select("id")
            .eq("property_id", propertyId)
            .ilike("name", `%${needle}%`)
          roomTypeIds = (rtf ?? []).map((x: any) => String(x.id))
        }

        // 2) Bookings for the selected range
        let q = supabase
          .from("bookings")
          .select("id, guest_name, room_type_id, check_in, nights, rooms, status, price_per_night")
          .eq("property_id", propertyId)
          .gte("check_in", start)
          .lte("check_in", end)

        if (status !== "all") q = q.eq("status", status)
        if (roomTypeIds && roomTypeIds.length) q = q.in("room_type_id", roomTypeIds)

        const { data: rows, error } = await q.order("check_in", { ascending: true })
        if (error) throw error

        // 3) Build per-day map for charts
        const dayKey = (d: Date) => d.toISOString().slice(0, 10)
        const map: Record<string, { bookings: number; revenue: number; roomsSold: number }> = {}

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
          map[dayKey(d)] = { bookings: 0, revenue: 0, roomsSold: 0 }
        }

        let totalBookingsC = 0
        let totalRevenueC = 0
        let confirmedC = 0

        ;(rows ?? []).forEach((b: any) => {
          totalBookingsC += 1
          if (b.status === "confirmed") confirmedC += 1

          const checkIn = dayKey(new Date(b.check_in))
          if (map[checkIn]) map[checkIn].bookings += 1

          const nights = Number(b.nights ?? 0)
          const rooms = Number(b.rooms ?? 0)
          const rate = Number(b.price_per_night ?? 0)

          for (let i = 0; i < nights; i++) {
            const d = new Date(b.check_in)
            d.setDate(d.getDate() + i)
            const k = dayKey(d)
            if (!map[k]) map[k] = { bookings: 0, revenue: 0, roomsSold: 0 }
            map[k].revenue += rate * rooms
            map[k].roomsSold += rooms
            totalRevenueC += rate * rooms
          }
        })

        const series = Object.keys(map).sort().map((date) => {
          const m = map[date]
          const occupancy = totalRooms > 0 ? Math.round((m.roomsSold / totalRooms) * 100) : 0
          return { date, bookings: m.bookings, revenue: m.revenue, occupancy }
        })

        setBookingData(series)
        setTotalBookings(totalBookingsC)
        setTotalRevenue(totalRevenueC)
        setAvgOccupancy(series.length ? Math.round(series.reduce((s, d) => s + d.occupancy, 0) / series.length) : 0)

        // 4) Conversion = confirmed / total (1 decimal)
        const denominator = (rows ?? []).length || 1
        setConversionRate(Math.round((confirmedC / denominator) * 1000) / 10)

        // 5) Recent bookings list (latest 5)
        const rtNameById = Object.fromEntries((rtypes ?? []).map((r: any) => [String(r.id), r.name ?? "Room"]))
        const { data: rb } = await supabase
          .from("bookings")
          .select("id, guest_name, room_type_id, check_in, nights, rooms, price_per_night, status")
          .eq("property_id", propertyId)
          .order("check_in", { ascending: false })
          .limit(5)

        const recentList = (rb ?? []).map((b: any) => ({
          id: String(b.id),
          guest: b.guest_name ?? "Guest",
          room: rtNameById[String(b.room_type_id)] ?? "Room",
          checkIn: String(b.check_in).slice(0, 10),
          nights: Number(b.nights ?? 0),
          amount: Number(b.price_per_night ?? 0) * Number(b.rooms ?? 1),
          status: b.status ?? "confirmed",
        }))
        setRecent(recentList)
      } catch (e) {
        console.error(e)
        toast.error("Failed to load", "Could not load bookings from Supabase")
      }
    })()
  }, [dateRange, roomType, status])


  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookings Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track booking performance, occupancy rates, and revenue trends
          </p>
        </div>
        <Button onClick={handleExport} className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Filter className="w-5 h-5 text-gray-500" />
        <Select value={dateRange} onValueChange={(value) => handleFilterChange("date", value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        <Select value={roomType} onValueChange={(value) => handleFilterChange("room", value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rooms</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="deluxe">Deluxe</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Occupancy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOccupancy}%</div>
            <p className="text-xs text-muted-foreground">
              +3% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Booking Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="occupancy" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue by Day */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recent.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{booking.guest}</p>
                    <p className="text-sm text-gray-500">{booking.id}</p>
                  </div>
                  <div>
                    <p className="text-sm">{booking.room}</p>
                    <p className="text-xs text-gray-500">{booking.nights} nights</p>
                  </div>
                  <div>
                    <p className="text-sm">Check-in: {booking.checkIn}</p>
                    <p className="text-sm font-medium">${booking.amount}</p>
                  </div>
                </div>
                <Badge 
                  variant={
                    booking.status === "confirmed" ? "default" : 
                    booking.status === "pending" ? "secondary" : 
                    "destructive"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingsContent />
    </Suspense>
  )
}
