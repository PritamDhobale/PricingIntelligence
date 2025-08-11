"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, Plus, Settings } from 'lucide-react'

export default function RoomTypeRules() {
  const roomTypeRules = [
    { id: 1, name: "Suite Premium", condition: "room_type = Suite AND utilization > 80%", action: "Increase ADR by 15%", status: "active" },
    { id: 2, name: "Studio Optimization", condition: "room_type = Studio AND utilization < 60%", action: "Decrease ADR by 8%", status: "active" },
    { id: 3, name: "Loft Adjustment", condition: "room_type = Loft AND peer_adr > our_adr + $30", action: "Increase ADR by 10%", status: "inactive" },
    { id: 4, name: "Penthouse Exclusive", condition: "room_type = Penthouse", action: "Maintain premium pricing", status: "active" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Room Type Rules</h1>
              <p className="text-muted-foreground">Pricing rules specific to room categories and types</p>
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
            <CardTitle>Room Type Pricing Rules</CardTitle>
            <CardDescription>Automated rules that adjust pricing based on room category performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomTypeRules.map((rule) => (
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
