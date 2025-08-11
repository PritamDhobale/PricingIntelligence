"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Calendar, TrendingUp, Users, DollarSign, Filter } from 'lucide-react'
import { toast } from "@/components/toast"

// Sample data
const bookingData = [
  { date: "2024-01-01", bookings: 45, revenue: 12500, occupancy: 78 },
  { date: "2024-01-02", bookings: 52, revenue: 14200, occupancy: 85 },
  { date: "2024-01-03", bookings: 38, revenue: 10800, occupancy: 65 },
  { date: "2024-01-04", bookings: 61, revenue: 16800, occupancy: 92 },
  { date: "2024-01-05", bookings: 47, revenue: 13100, occupancy: 73 },
  { date: "2024-01-06", bookings: 55, revenue: 15400, occupancy: 88 },
  { date: "2024-01-07", bookings: 43, revenue: 12000, occupancy: 71 },
]

const recentBookings = [
  { id: "BK001", guest: "John Smith", room: "Deluxe Suite", checkIn: "2024-01-15", nights: 3, amount: 850, status: "confirmed" },
  { id: "BK002", guest: "Sarah Johnson", room: "Standard Room", checkIn: "2024-01-16", nights: 2, amount: 320, status: "pending" },
  { id: "BK003", guest: "Mike Wilson", room: "Premium Room", checkIn: "2024-01-17", nights: 4, amount: 720, status: "confirmed" },
  { id: "BK004", guest: "Emma Davis", room: "Deluxe Suite", checkIn: "2024-01-18", nights: 1, amount: 280, status: "cancelled" },
  { id: "BK005", guest: "David Brown", room: "Standard Room", checkIn: "2024-01-19", nights: 5, amount: 800, status: "confirmed" },
]

function BookingsContent() {
  const searchParams = useSearchParams()
  const [dateRange, setDateRange] = useState("7d")
  const [roomType, setRoomType] = useState("all")
  const [status, setStatus] = useState("all")

  const handleExport = () => {
    toast.success("Export Started", "Booking data is being exported to CSV")
  }

  const handleFilterChange = (type: string, value: string) => {
    if (type === "date") setDateRange(value)
    if (type === "room") setRoomType(value)
    if (type === "status") setStatus(value)
    toast.info("Filters Updated", "Booking data has been filtered")
  }

  const totalBookings = bookingData.reduce((sum, day) => sum + day.bookings, 0)
  const totalRevenue = bookingData.reduce((sum, day) => sum + day.revenue, 0)
  const avgOccupancy = Math.round(bookingData.reduce((sum, day) => sum + day.occupancy, 0) / bookingData.length)
  const conversionRate = 78.5

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
            {recentBookings.map((booking) => (
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
