"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Settings } from 'lucide-react'

export default function MonthlyRules() {
  const monthlyRules = [
    { id: 1, name: "Summer Peak Pricing", condition: "month IN (June, July, August)", action: "Increase ADR by 25%", status: "active" },
    { id: 2, name: "Winter Discount", condition: "month IN (January, February)", action: "Decrease ADR by 15%", status: "active" },
    { id: 3, name: "Spring Shoulder", condition: "month IN (March, April, May)", action: "Increase ADR by 10%", status: "active" },
    { id: 4, name: "Fall Adjustment", condition: "month IN (September, October, November)", action: "Maintain base ADR", status: "inactive" },
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
              <h1 className="text-2xl font-bold text-foreground">Monthly Rules</h1>
              <p className="text-muted-foreground">Seasonal pricing rules and monthly adjustments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">3 Active Rules</Badge>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Rule
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Pricing Rules</CardTitle>
            <CardDescription>Automated rules that adjust pricing based on seasonal patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyRules.map((rule) => (
                <div key={rule.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{rule.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={rule.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {rule.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Condition:</strong> {rule.condition}</p>
                    <p><strong>Action:</strong> {rule.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
