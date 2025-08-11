"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, TrendingUp, Target, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function AdsManagement() {
  const campaignData = [
    { name: "Google Ads", spend: 2500, clicks: 1250, bookings: 45, roas: 5.2 },
    { name: "Facebook Ads", spend: 1800, clicks: 980, bookings: 32, roas: 4.8 },
    { name: "Instagram Ads", spend: 1200, clicks: 650, bookings: 18, roas: 3.9 },
  ]

  const performanceData = [
    { week: "Week 1", spend: 1200, revenue: 6200, bookings: 22 },
    { week: "Week 2", spend: 1350, revenue: 7100, bookings: 26 },
    { week: "Week 3", spend: 1400, revenue: 7800, bookings: 28 },
    { week: "Week 4", spend: 1550, revenue: 8900, bookings: 32 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Advertising Campaigns</h1>
              <p className="text-muted-foreground">Manage digital marketing campaigns and ad spend optimization</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">3 Active Campaigns</Badge>
            <Button>Create Campaign</Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Ad Spend</p>
                  <p className="text-2xl font-bold">$5.5K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Megaphone className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">This month</span>
                  </div>
                </div>
                <Megaphone className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">2.9K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">All campaigns</span>
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
                  <p className="text-sm text-muted-foreground">Bookings</p>
                  <p className="text-2xl font-bold">95</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">From ads</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg ROAS</p>
                  <p className="text-2xl font-bold">4.6x</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Return on ad spend</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Weekly ad spend vs revenue generated</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spend" stroke="#ef4444" strokeWidth={2} name="Ad Spend" />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Performance breakdown by advertising platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Campaign</th>
                    <th className="text-left p-2">Spend</th>
                    <th className="text-left p-2">Clicks</th>
                    <th className="text-left p-2">Bookings</th>
                    <th className="text-left p-2">ROAS</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignData.map((campaign, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{campaign.name}</td>
                      <td className="p-2">${campaign.spend.toLocaleString()}</td>
                      <td className="p-2">{campaign.clicks.toLocaleString()}</td>
                      <td className="p-2">{campaign.bookings}</td>
                      <td className="p-2">
                        <Badge variant={campaign.roas > 4 ? "default" : "secondary"}>
                          {campaign.roas}x
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Pause</Button>
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
