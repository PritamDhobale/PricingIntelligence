"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Calendar, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DailyForecasting() {
  const dailyData = [
    { date: "Jan 20", forecast: 245, demand: 85, day: "Sat" },
    { date: "Jan 21", forecast: 265, demand: 92, day: "Sun" },
    { date: "Jan 22", forecast: 235, demand: 68, day: "Mon" },
    { date: "Jan 23", forecast: 240, demand: 72, day: "Tue" },
    { date: "Jan 24", forecast: 245, demand: 78, day: "Wed" },
    { date: "Jan 25", forecast: 250, demand: 82, day: "Thu" },
    { date: "Jan 26", forecast: 275, demand: 95, day: "Fri" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Daily Forecasting</h1>
              <p className="text-muted-foreground">Short-term daily pricing optimization</p>
            </div>
          </div>
          <Badge variant="secondary">7-Day Forecast</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tomorrow's ADR</p>
                  <p className="text-2xl font-bold">$265</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Weekend premium</span>
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
                  <p className="text-sm text-muted-foreground">Peak Day</p>
                  <p className="text-2xl font-bold">Friday</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">$275 ADR</span>
                  </div>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Demand</p>
                  <p className="text-2xl font-bold">82%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <BarChart3 className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">This week</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
            <CardDescription>Daily ADR predictions and demand levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="forecast" fill="#3b82f6" name="Forecast ADR" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
