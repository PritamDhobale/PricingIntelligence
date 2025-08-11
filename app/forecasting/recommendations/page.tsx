"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, TrendingUp, TrendingDown, Target, Calendar, DollarSign, Users, AlertTriangle } from 'lucide-react'
import { toast } from "@/components/toast"

export default function PricingRecommendations() {
  const [timeframe, setTimeframe] = useState("month")
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      type: "price-up",
      title: "Increase Weekend Rates",
      description: "Your weekend ADR is 12% below peer average. Consider increasing by $25-30.",
      impact: "High",
      confidence: 85,
      potentialRevenue: 4500,
      category: "Weekend Pricing",
      priority: 1,
      applied: false,
    },
    {
      id: 2,
      type: "undercut",
      title: "Competitive Weekday Pricing",
      description: "Undercut Riverside Boutique by 5% on weekdays to capture price-sensitive guests.",
      impact: "Medium",
      confidence: 72,
      potentialRevenue: 2800,
      category: "Competitive Strategy",
      priority: 2,
      applied: false,
    },
    {
      id: 3,
      type: "optimize",
      title: "Optimize Shoulder Season",
      description: "Your utilization drops more than peers in shoulder season. Adjust pricing strategy.",
      impact: "Medium",
      confidence: 68,
      potentialRevenue: 3200,
      category: "Seasonal Adjustment",
      priority: 3,
      applied: false,
    },
    {
      id: 4,
      type: "event-pricing",
      title: "Event-Based Premium",
      description: "Upcoming conference in March. Implement 20% premium for March 15-18.",
      impact: "High",
      confidence: 92,
      potentialRevenue: 6800,
      category: "Event Pricing",
      priority: 1,
      applied: false,
    },
    {
      id: 5,
      type: "room-type",
      title: "Suite Pricing Adjustment",
      description: "Suite occupancy is consistently high. Consider 10% rate increase.",
      impact: "Medium",
      confidence: 78,
      potentialRevenue: 2100,
      category: "Room Type",
      priority: 2,
      applied: false,
    },
  ])

  const handleApplyRecommendation = (id: number) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === id ? { ...rec, applied: true } : rec
      )
    )
    const recommendation = recommendations.find(r => r.id === id)
    toast.success("Recommendation Applied", `${recommendation?.title} has been implemented`)
  }

  const handleDismissRecommendation = (id: number) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id))
    toast.info("Recommendation Dismissed", "This suggestion has been removed")
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Weekend Pricing":
        return Calendar
      case "Competitive Strategy":
        return Target
      case "Seasonal Adjustment":
        return TrendingDown
      case "Event Pricing":
        return AlertTriangle
      case "Room Type":
        return Users
      default:
        return Lightbulb
    }
  }

  const totalPotentialRevenue = recommendations
    .filter(rec => !rec.applied)
    .reduce((sum, rec) => sum + rec.potentialRevenue, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pricing Recommendations</h1>
            <p className="text-muted-foreground">AI-powered pricing suggestions to optimize revenue</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Recommendations</p>
                  <p className="text-2xl font-bold">{recommendations.filter(r => !r.applied).length}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Lightbulb className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">Pending review</span>
                  </div>
                </div>
                <Lightbulb className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Potential Revenue</p>
                  <p className="text-2xl font-bold">${totalPotentialRevenue.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Monthly uplift</span>
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
                  <p className="text-sm text-muted-foreground">High Impact</p>
                  <p className="text-2xl font-bold">{recommendations.filter(r => r.impact === "High" && !r.applied).length}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">Priority actions</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applied Today</p>
                  <p className="text-2xl font-bold">{recommendations.filter(r => r.applied).length}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">Implemented</span>
                  </div>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations List */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Recommendations</CardTitle>
            <CardDescription>Prioritized pricing suggestions based on market analysis and performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec) => {
                const CategoryIcon = getCategoryIcon(rec.category)
                return (
                  <div
                    key={rec.id}
                    className={`p-4 border rounded-lg transition-all ${
                      rec.applied
                        ? "bg-green-50 border-green-200 opacity-75"
                        : "hover:shadow-md bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <CategoryIcon className="w-5 h-5 mt-1 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getImpactColor(rec.impact)}>{rec.impact} Impact</Badge>
                        <Badge variant="outline">{rec.confidence}% confidence</Badge>
                        {rec.applied && <Badge className="bg-green-100 text-green-800">Applied</Badge>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          +${rec.potentialRevenue.toLocaleString()} potential
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {rec.category}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          Priority {rec.priority}
                        </Badge>
                      </div>

                      {!rec.applied && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDismissRecommendation(rec.id)}
                          >
                            Dismiss
                          </Button>
                          <Button size="sm" onClick={() => handleApplyRecommendation(rec.id)}>
                            Apply Recommendation
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recommendation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Weekend Optimization</CardTitle>
              <CardDescription>Maximize weekend revenue potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Weekend ADR:</span>
                  <span className="font-medium">$245</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Peer Average:</span>
                  <span className="font-medium">$275</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Recommended ADR:</span>
                  <span className="font-medium text-green-600">$270</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Potential monthly uplift: $4,500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seasonal Adjustments</CardTitle>
              <CardDescription>Optimize for seasonal demand patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Shoulder Season Util:</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Target Utilization:</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Price Adjustment:</span>
                  <span className="font-medium text-orange-600">-8%</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Estimated volume increase: 15%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event-Based Pricing</CardTitle>
              <CardDescription>Capitalize on local events and conferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Upcoming Events:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg Event Premium:</span>
                  <span className="font-medium">+22%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next Event:</span>
                  <span className="font-medium">Mar 15-18</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Projected event revenue: $6,800</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
