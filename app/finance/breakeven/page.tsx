"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingDown, Target, Calculator, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function BreakevenDeepDive() {
  const breakevenScenarios = [
    { scenario: "Conservative", utilization: 60, adr: 220, breakeven: 195, profit: 8500 },
    { scenario: "Realistic", utilization: 75, adr: 245, breakeven: 184, profit: 24000 },
    { scenario: "Optimistic", utilization: 85, adr: 265, breakeven: 172, profit: 38500 },
  ]

  const costStructure = [
    { category: "Fixed Costs", amount: 45000, percentage: 68 },
    { category: "Variable Costs", amount: 21000, percentage: 32 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Breakeven Deep Dive</h1>
              <p className="text-muted-foreground">Advanced breakeven analysis and profitability insights</p>
            </div>
          </div>
          <Badge variant="secondary">Advanced Analytics</Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Breakeven</p>
                  <p className="text-2xl font-bold">184</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-600">rooms/month</span>
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
                  <p className="text-sm text-muted-foreground">Safety Margin</p>
                  <p className="text-2xl font-bold">52%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calculator className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Above breakeven</span>
                  </div>
                </div>
                <Calculator className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fixed Costs</p>
                  <p className="text-2xl font-bold">$45K</p>
                  <div className="flex items-center gap-1 mt-1">
                    <DollarSign className="w-3 h-3 text-orange-500" />
                    <span className="text-xs text-orange-600">Monthly</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Variable Rate</p>
                  <p className="text-2xl font-bold">32%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">Of revenue</span>
                  </div>
                </div>
                <TrendingDown className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Scenario Analysis</CardTitle>
            <CardDescription>Breakeven analysis under different market conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={breakevenScenarios}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scenario" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#10b981" name="Monthly Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Structure Analysis</CardTitle>
              <CardDescription>Fixed vs variable cost breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costStructure.map((cost, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{cost.category}</h4>
                      <p className="text-sm text-muted-foreground">{cost.percentage}% of total costs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${cost.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Breakeven Calculator</CardTitle>
              <CardDescription>Adjust parameters to see impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fixed-costs">Monthly Fixed Costs ($)</Label>
                <Input id="fixed-costs" defaultValue="45000" />
              </div>
              <div>
                <Label htmlFor="variable-rate">Variable Cost Rate (%)</Label>
                <Input id="variable-rate" defaultValue="32" />
              </div>
              <div>
                <Label htmlFor="target-adr">Target ADR ($)</Label>
                <Input id="target-adr" defaultValue="245" />
              </div>
              <Button className="w-full">Recalculate Breakeven</Button>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">New Breakeven: 184 rooms/month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
