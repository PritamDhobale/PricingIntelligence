"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChartIcon, TrendingUp, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function FutureMonthsForecasting() {
  const futureData = [
    { month: "Apr 2024", forecast: 275, confidence: 78 },
    { month: "May 2024", forecast: 285, confidence: 75 },
    { month: "Jun 2024", forecast: 295, confidence: 72 },
    { month: "Jul 2024", forecast: 310, confidence: 70 },
    { month: "Aug 2024", forecast: 305, confidence: 68 },
    { month: "Sep 2024", forecast: 280, confidence: 65 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <LineChartIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Future Months Forecasting</h1>
              <p className="text-muted-foreground">Extended forecasting for strategic planning (3+ months)</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Beta</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Peak Forecast</p>
                  <p className="text-2xl font-bold">$310</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">July 2024</span>
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
                  <p className="text-2xl font-bold">71%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-600">Long-term</span>
                  </div>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Forecast Range</p>
                  <p className="text-2xl font-bold">6 months</p>
                  <div className="flex items-center gap-1 mt-1">
                    <LineChartIcon className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">Strategic view</span>
                  </div>
                </div>
                <LineChartIcon className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Long-term ADR Forecast</CardTitle>
            <CardDescription>Strategic pricing outlook for the next 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={futureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={3} name="Forecast ADR" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800">Beta Feature Notice</CardTitle>
            <CardDescription className="text-yellow-700">
              Long-term forecasting is currently in beta. Confidence levels decrease for predictions beyond 3 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-yellow-700">
              <p>• Forecasts beyond 3 months have reduced accuracy</p>
              <p>• External factors (events, market changes) may impact predictions</p>
              <p>• Use for strategic planning rather than tactical pricing decisions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
