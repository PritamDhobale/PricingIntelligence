"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, TrendingUp, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function RoomTypeForecasting() {
  const roomTypeData = [
    { type: "Studio", forecast: 245, utilization: 78, rooms: 12 },
    { type: "Loft", forecast: 320, utilization: 65, rooms: 8 },
    { type: "Suite", forecast: 450, utilization: 55, rooms: 4 },
    { type: "Penthouse", forecast: 750, utilization: 40, rooms: 2 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Room Type Forecasting</h1>
              <p className="text-muted-foreground">Forecasting by room category and type</p>
            </div>
          </div>
          <Badge variant="secondary">4 Room Types</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Performer</p>
                  <p className="text-2xl font-bold">Studio</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">78% utilization</span>
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
                  <p className="text-sm text-muted-foreground">Highest ADR</p>
                  <p className="text-2xl font-bold">$750</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Home className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">Penthouse</span>
                  </div>
                </div>
                <Home className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Rooms</p>
                  <p className="text-2xl font-bold">26</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">All types</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Room Type Performance Forecast</CardTitle>
            <CardDescription>ADR predictions by room category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={roomTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="forecast" fill="#3b82f6" name="Forecast ADR" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Room Type Analysis</CardTitle>
            <CardDescription>Detailed breakdown by room category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Room Type</th>
                    <th className="text-left p-2">Forecast ADR</th>
                    <th className="text-left p-2">Utilization</th>
                    <th className="text-left p-2">Available Rooms</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {roomTypeData.map((room, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{room.type}</td>
                      <td className="p-2">${room.forecast}</td>
                      <td className="p-2">
                        <Badge variant={room.utilization > 70 ? "default" : "secondary"}>
                          {room.utilization}%
                        </Badge>
                      </td>
                      <td className="p-2">{room.rooms}</td>
                      <td className="p-2">
                        <Badge className="bg-green-100 text-green-800">Optimized</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
