"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Target } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function MonthlyForecasting() {
  const monthlyData = [
    { month: "Feb 2024", forecast: 238, confidence: 85, actual: null },
    { month: "Mar 2024", forecast: 265, confidence: 88, actual: null },
    { month: "Apr 2024", forecast: 275, confidence: 90, actual: null },
    { month: "May 2024", forecast: 285, confidence: 87, actual: null },
    { month: "Jun 2024", forecast: 295, confidence: 85, actual: null },
    { month: "Jul 2024", forecast: 310, confidence: 89, actual: null },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Monthly Forecasting</h1>
              <p className="text-muted-foreground">Long-term monthly pricing predictions and trends</p>
            </div>
          </div>
          <Badge variant="secondary">6-Month Outlook</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Month ADR</p>
                  <p className="text-2xl font-bold">$265</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+8% vs current</span>
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
                  <p className="text-sm text-muted-foreground">Avg Confidence</p>
                  <p className="text-2xl font-bold">87%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">High accuracy</span>
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
                  <p className="text-sm text-muted-foreground">Peak Month</p>
                  <p className="text-2xl font-bold">July</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">$310 ADR</span>
                  </div>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>6-Month ADR Forecast</CardTitle>
            <CardDescription>Monthly average daily rate predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={3} name="Forecast ADR" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
