"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Plus, Settings } from 'lucide-react'

export default function DailyRules() {
  const dailyRules = [
    { id: 1, name: "Weekend Premium", condition: "day_of_week IN (Friday, Saturday)", action: "Increase ADR by 20%", status: "active" },
    { id: 2, name: "Sunday Special", condition: "day_of_week = Sunday", action: "Decrease ADR by 10%", status: "active" },
    { id: 3, name: "Midweek Boost", condition: "day_of_week IN (Tuesday, Wednesday)", action: "Increase ADR by 5%", status: "inactive" },
    { id: 4, name: "Monday Recovery", condition: "day_of_week = Monday", action: "Decrease ADR by 5%", status: "active" },
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
              <h1 className="text-2xl font-bold text-foreground">Daily Rules</h1>
              <p className="text-muted-foreground">Day-of-week pricing rules and daily adjustments</p>
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
            <CardTitle>Daily Pricing Rules</CardTitle>
            <CardDescription>Automated rules that adjust pricing based on day of the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyRules.map((rule) => (
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
