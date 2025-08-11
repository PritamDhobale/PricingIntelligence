"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus, Settings } from 'lucide-react'

export default function AdsRules() {
  const adsRules = [
    { id: 1, name: "High ROAS Boost", condition: "campaign_roas > 5.0", action: "Increase ad spend by 20%", status: "active" },
    { id: 2, name: "Low Performance Pause", condition: "campaign_roas < 2.0 FOR 3 days", action: "Pause campaign", status: "active" },
    { id: 3, name: "Weekend Ad Push", condition: "day_of_week IN (Friday, Saturday) AND utilization < 70%", action: "Increase ad spend by 30%", status: "inactive" },
    { id: 4, name: "Budget Cap Protection", condition: "monthly_ad_spend > $8000", action: "Reduce all campaigns by 50%", status: "active" },
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
              <h1 className="text-2xl font-bold text-foreground">Ads Rules</h1>
              <p className="text-muted-foreground">Automated rules for advertising campaign optimization</p>
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
            <CardTitle>Advertising Automation Rules</CardTitle>
            <CardDescription>Automated rules that optimize ad spend and campaign performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adsRules.map((rule) => (
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
