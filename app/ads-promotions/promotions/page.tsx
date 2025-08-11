"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, TrendingUp, Users, DollarSign } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function PromotionsManagement() {
  const promotionData = [
    { name: "Early Bird Special", bookings: 25, revenue: 8500, discount: 15, status: "active" },
    { name: "Weekend Getaway", bookings: 18, revenue: 6200, discount: 10, status: "active" },
    { name: "Extended Stay Deal", bookings: 12, revenue: 4800, discount: 20, status: "active" },
    { name: "Last Minute Offer", bookings: 8, revenue: 2400, discount: 25, status: "paused" },
  ]

  const performanceData = [
    { promo: "Early Bird", bookings: 25, revenue: 8500 },
    { promo: "Weekend", bookings: 18, revenue: 6200 },
    { promo: "Extended", bookings: 12, revenue: 4800 },
    { promo: "Last Minute", bookings: 8, revenue: 2400 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Promotions & Packages</h1>
              <p className="text-muted-foreground">Create and manage promotional offers and special packages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">4 Promotions</Badge>
            <Button>Create Promotion</Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Promo Bookings</p>
                  <p className="text-2xl font-bold">63</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">This month</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Promo Revenue</p>
                  <p className="text-2xl font-bold">$21.9K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+15% vs last month</span>
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
                  <p className="text-sm text-muted-foreground">Avg Discount</p>
                  <p className="text-2xl font-bold">17.5%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Gift className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">Across all promos</span>
                  </div>
                </div>
                <Gift className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">12.8%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Promo to booking</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Promotion Performance</CardTitle>
            <CardDescription>Bookings and revenue by promotion type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="promo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
            <CardDescription>Manage your current promotional offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Promotion</th>
                    <th className="text-left p-2">Discount</th>
                    <th className="text-left p-2">Bookings</th>
                    <th className="text-left p-2">Revenue</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {promotionData.map((promo, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{promo.name}</td>
                      <td className="p-2">
                        <Badge variant="outline">{promo.discount}% off</Badge>
                      </td>
                      <td className="p-2">{promo.bookings}</td>
                      <td className="p-2">${promo.revenue.toLocaleString()}</td>
                      <td className="p-2">
                        <Badge className={promo.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {promo.status}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">
                            {promo.status === "active" ? "Pause" : "Activate"}
                          </Button>
                        </div>
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
