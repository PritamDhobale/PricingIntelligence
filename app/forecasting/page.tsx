"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Home, LineChart, Lightbulb, BarChart3, Target, DollarSign } from 'lucide-react'
import Link from "next/link"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function PriceForecastingOverview() {
  const forecastData = [
    { month: "Jan", forecast: 245, actual: 245, confidence: 85 },
    { month: "Feb", forecast: 238, actual: 240, confidence: 82 },
    { month: "Mar", forecast: 265, actual: null, confidence: 88 },
    { month: "Apr", forecast: 275, actual: null, confidence: 90 },
    { month: "May", forecast: 285, actual: null, confidence: 87 },
    { month: "Jun", forecast: 295, actual: null, confidence: 85 },
  ]

  const forecastModules = [
    {
      title: "Monthly Forecasting",
      description: "Long-term monthly pricing predictions and trends",
      href: "/forecasting/monthly",
      icon: Calendar,
      status: "Active",
      accuracy: "94.2%",
    },
    {
      title: "Daily Forecasting", 
      description: "Short-term daily pricing optimization",
      href: "/forecasting/daily",
      icon: BarChart3,
      status: "Active",
      accuracy: "91.8%",
    },
    {
      title: "Room Type Analysis",
      description: "Forecasting by room category and type",
      href: "/forecasting/room-type", 
      icon: Home,
      status: "Active",
      accuracy: "89.5%",
    },
    {
      title: "Future Months (3+)",
      description: "Extended forecasting for strategic planning",
      href: "/forecasting/future",
      icon: LineChart,
      status: "Beta",
      accuracy: "78.3%",
    },
    {
      title: "Pricing Recommendations",
      description: "AI-powered pricing suggestions and insights",
      href: "/forecasting/recommendations",
      icon: Lightbulb,
      status: "Active", 
      accuracy: "96.1%",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Price Forecasting</h1>
              <p className="text-muted-foreground">AI-powered pricing predictions and optimization</p>
            </div>
          </div>
          <Badge variant="secondary">5 Active Models</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                  <p className="text-2xl font-bold">92.4%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Above target</span>
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
                  <p className="text-sm text-muted-foreground">Next Month ADR</p>
                  <p className="text-2xl font-bold">$265</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+8% vs current</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Forecast</p>
                  <p className="text-2xl font-bold">$98K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Next month</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Confidence Level</p>
                  <p className="text-2xl font-bold">88%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Lightbulb className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-600">High confidence</span>
                  </div>
                </div>
                <Lightbulb className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forecast Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle>6-Month Forecast Overview</CardTitle>
            <CardDescription>Predicted vs actual ADR performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={2} name="Forecast" />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Forecasting Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Forecasting Modules</CardTitle>
            <CardDescription>Access different forecasting tools and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forecastModules.map((module, index) => {
                const Icon = module.icon
                return (
                  <Link key={index} href={module.href}>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <Icon className="w-8 h-8 text-primary" />
                        <Badge variant={module.status === "Beta" ? "secondary" : "default"}>
                          {module.status}
                        </Badge>
                      </div>
                      <h3 className="font-medium mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Accuracy:</span>
                        <span className="text-sm font-medium">{module.accuracy}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
