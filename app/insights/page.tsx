"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { TrendingUp, TrendingDown, BarChart3, LineChartIcon, PieChart, Download, DollarSign, Users, Target, Lightbulb, Calendar, Layers } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  ComposedChart,
  Area,
} from "recharts"
import { toast } from "@/components/toast"

export default function InsightsForecast() {
  const [timeframe, setTimeframe] = useState("12months")
  const [showPreviousYear, setShowPreviousYear] = useState(true)
  const [showSeasonality, setShowSeasonality] = useState(true)
  const [showEvents, setShowEvents] = useState(true)
  const [insights, setInsights] = useState([
    {
      id: 1,
      title: "Peak Season Optimization",
      description: "Your summer pricing strategy outperformed peers by 12%, generating $45K additional revenue.",
      impact: "High",
      trend: "up",
    },
    {
      id: 2,
      title: "Year-over-Year Growth",
      description: "Current year revenue is 18% higher than last year, driven by improved pricing strategy.",
      impact: "High",
      trend: "up",
    },
    {
      id: 3,
      title: "Seasonal Pattern Analysis",
      description: "Spring shoulder season shows 25% better performance compared to last year's same period.",
      impact: "Medium",
      trend: "up",
    },
    {
      id: 4,
      title: "Event Impact Correlation",
      description: "Local events contribute to 35% revenue uplift during event periods, up from 28% last year.",
      impact: "High",
      trend: "up",
    },
  ])

  // Current year vs previous year data
  const yearComparisonData = [
    { month: "Jan", current: 220, previous: 195, seasonal: 0.85, events: 0 },
    { month: "Feb", current: 215, previous: 190, seasonal: 0.82, events: 0 },
    { month: "Mar", current: 235, previous: 210, seasonal: 0.95, events: 15 },
    { month: "Apr", current: 245, previous: 220, seasonal: 1.05, events: 0 },
    { month: "May", current: 255, previous: 230, seasonal: 1.15, events: 25 },
    { month: "Jun", current: 265, previous: 240, seasonal: 1.25, events: 0 },
    { month: "Jul", current: 275, previous: 250, seasonal: 1.35, events: 30 },
    { month: "Aug", current: 270, previous: 245, seasonal: 1.30, events: 20 },
    { month: "Sep", current: 250, previous: 225, seasonal: 1.10, events: 0 },
    { month: "Oct", current: 240, previous: 215, seasonal: 1.00, events: 10 },
    { month: "Nov", current: 230, previous: 205, seasonal: 0.90, events: 0 },
    { month: "Dec", current: 245, previous: 220, seasonal: 1.00, events: 35 },
  ]

  const seasonalityData = [
    { period: "Winter", factor: 0.85, description: "Low season - leisure travel down" },
    { period: "Spring", factor: 1.05, description: "Shoulder season - moderate demand" },
    { period: "Summer", factor: 1.30, description: "Peak season - high leisure demand" },
    { period: "Fall", factor: 0.95, description: "Shoulder season - business travel" },
  ]

  const eventImpactData = [
    { event: "Tech Conference", date: "Mar 15-18", impact: 25, revenue: 8500 },
    { event: "Music Festival", date: "May 20-22", impact: 35, revenue: 12000 },
    { event: "Food & Wine", date: "Jul 10-12", impact: 40, revenue: 15000 },
    { event: "Art Exhibition", date: "Aug 5-7", impact: 20, revenue: 6800 },
    { event: "Holiday Market", date: "Dec 15-31", impact: 45, revenue: 18000 },
  ]

  const strategyBreakdown = [
    { name: "Dynamic Pricing", value: 45, color: "#3b82f6" },
    { name: "Peer Matching", value: 25, color: "#ef4444" },
    { name: "Event-Based", value: 20, color: "#f59e0b" },
    { name: "Manual Override", value: 10, color: "#10b981" },
  ]

  const handleGenerateInsight = () => {
    const newInsight = {
      id: insights.length + 1,
      title: "New Market Opportunity",
      description: "AI detected a 20% increase in corporate bookings. Consider business traveler packages.",
      impact: "Medium",
      trend: "up",
    }
    setInsights([newInsight, ...insights])
    toast.success("New Insight Generated", "AI has identified a new market opportunity")
  }

  const handleExport = () => {
    toast.info("Export Started", "Insights report is being generated...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Insights & Forecast</h1>
            <p className="text-muted-foreground">Year-over-year analytics with seasonality and event impact analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="12months">12 Months</SelectItem>
                <SelectItem value="24months">24 Months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleGenerateInsight}>
              <Lightbulb className="w-4 h-4 mr-2" />
              Generate Insight
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">YoY Revenue Growth</p>
                  <p className="text-2xl font-bold">+18.5%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">vs last year</span>
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
                  <p className="text-sm text-muted-foreground">Seasonal Performance</p>
                  <p className="text-2xl font-bold">+25%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Peak season uplift</span>
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
                  <p className="text-sm text-muted-foreground">Event Impact</p>
                  <p className="text-2xl font-bold">35%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">Avg event uplift</span>
                  </div>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                  <p className="text-2xl font-bold">94.2%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <BarChart3 className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-600">Prediction quality</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Display Options</CardTitle>
            <CardDescription>Toggle data overlays for comprehensive analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <Switch id="previous-year" checked={showPreviousYear} onCheckedChange={setShowPreviousYear} />
                <Label htmlFor="previous-year">Show Previous Year</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="seasonality" checked={showSeasonality} onCheckedChange={setShowSeasonality} />
                <Label htmlFor="seasonality">Show Seasonality Patterns</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="events" checked={showEvents} onCheckedChange={setShowEvents} />
                <Label htmlFor="events">Show Event Impacts</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="comparison" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="comparison">Year Comparison</TabsTrigger>
            <TabsTrigger value="seasonality">Seasonality</TabsTrigger>
            <TabsTrigger value="events">Event Impact</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-6">
            {/* Current vs Previous Year */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5" />
                  Current Year vs Previous Year Performance
                </CardTitle>
                <CardDescription>Monthly ADR comparison with seasonal and event overlays</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={yearComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    
                    {showSeasonality && (
                      <Area
                        type="monotone"
                        dataKey="seasonal"
                        fill="#f59e0b"
                        fillOpacity={0.1}
                        stroke="none"
                        name="Seasonal Factor"
                      />
                    )}
                    
                    {showPreviousYear && (
                      <Line
                        type="monotone"
                        dataKey="previous"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Previous Year ADR"
                      />
                    )}
                    
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Current Year ADR"
                    />
                    
                    {showEvents && (
                      <Bar
                        dataKey="events"
                        fill="#ef4444"
                        fillOpacity={0.6}
                        name="Event Impact"
                      />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seasonality" className="space-y-6">
            {/* Seasonality Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Factors</CardTitle>
                  <CardDescription>Demand patterns throughout the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={seasonalityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="factor" fill="#f59e0b" name="Seasonal Factor" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Performance Summary</CardTitle>
                  <CardDescription>Key insights by season</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {seasonalityData.map((season, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{season.period}</h4>
                        <Badge variant={season.factor > 1 ? "default" : "secondary"}>
                          {season.factor}x factor
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{season.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {/* Event Impact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Event Impact Analysis</CardTitle>
                <CardDescription>Revenue uplift from local events and conferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Event</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Impact %</th>
                        <th className="text-left p-2">Revenue Uplift</th>
                        <th className="text-left p-2">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventImpactData.map((event, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{event.event}</td>
                          <td className="p-2">{event.date}</td>
                          <td className="p-2">
                            <Badge variant={event.impact > 30 ? "default" : "secondary"}>
                              +{event.impact}%
                            </Badge>
                          </td>
                          <td className="p-2 font-medium">${event.revenue.toLocaleString()}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-green-600">Strong</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            {/* Strategy Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Strategy Distribution</CardTitle>
                  <CardDescription>How your pricing decisions are allocated</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={strategyBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {strategyBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Strategy Performance Comparison</CardTitle>
                  <CardDescription>Current year vs previous year effectiveness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Dynamic Pricing (45%)</h4>
                    <p className="text-sm text-green-700 mb-2">
                      AI-driven adjustments based on demand patterns and market conditions.
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>This Year Performance:</span>
                      <span className="font-medium text-green-600">+22% vs last year</span>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Event-Based Pricing (20%)</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Premium pricing during high-impact local events and conferences.
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>This Year Performance:</span>
                      <span className="font-medium text-blue-600">+35% vs last year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Year-over-Year Insights & Recommendations</CardTitle>
            <CardDescription>AI-powered insights comparing current performance with previous year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <div key={insight.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          insight.impact === "High"
                            ? "bg-red-100 text-red-800"
                            : insight.impact === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {insight.impact} Impact
                      </Badge>
                      {insight.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {insight.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">{insight.description}</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
