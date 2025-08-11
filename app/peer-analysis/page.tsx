"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Target, Users, DollarSign, BarChart3, Download, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { toast } from "@/components/toast"

export default function PeerGroupAnalysis() {
  const [timeframe, setTimeframe] = useState("month")
  const [compareModal, setCompareModal] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  const [peerData, setPeerData] = useState([
    {
      property: "Your Property",
      adr: 245,
      utilization: 78,
      sensitivity: 7.2,
      rank: 3,
      change: "+5%",
      isYours: true,
    },
    {
      property: "Luxury Boutique Downtown",
      adr: 285,
      utilization: 85,
      sensitivity: 6.8,
      rank: 1,
      change: "+8%",
      isYours: false,
    },
    {
      property: "Historic Inn & Suites",
      adr: 265,
      utilization: 82,
      sensitivity: 7.0,
      rank: 2,
      change: "+3%",
      isYours: false,
    },
    {
      property: "Riverside Boutique",
      adr: 235,
      utilization: 75,
      sensitivity: 7.5,
      rank: 4,
      change: "+2%",
      isYours: false,
    },
    {
      property: "Garden View Hotel",
      adr: 220,
      utilization: 70,
      sensitivity: 8.1,
      rank: 5,
      change: "-1%",
      isYours: false,
    },
  ])

  const trendData = [
    { month: "Oct", yourADR: 235, peerAvg: 240, yourUtil: 72, peerUtil: 75 },
    { month: "Nov", yourADR: 240, peerAvg: 245, yourUtil: 75, peerUtil: 78 },
    { month: "Dec", yourADR: 245, peerAvg: 250, yourUtil: 78, peerUtil: 80 },
    { month: "Jan", yourADR: 245, peerAvg: 252, yourUtil: 78, peerUtil: 82 },
  ]

  const handleCompare = (propertyName: string) => {
    setSelectedProperty(propertyName)
    setCompareModal(true)
  }

  const handleExport = () => {
    toast.info("Export Started", "Peer analysis report is being generated...")
  }

  const getRankIcon = (rank: number, prevRank: number = rank) => {
    if (rank < prevRank) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (rank > prevRank) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <div className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Peer Group Analysis</h1>
            <p className="text-muted-foreground">Compare your performance against similar properties</p>
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
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Important Notice */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> Utilization on ADR cannot be derived from peer group data. 
            Peer analysis focuses on rate comparison and market positioning only.
          </AlertDescription>
        </Alert>

        {/* Performance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                  <p className="text-2xl font-bold">3rd</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">+1 position</span>
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
                  <p className="text-sm text-muted-foreground">ADR vs Peers</p>
                  <p className="text-2xl font-bold">-$7</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-red-600">2.8% below avg</span>
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
                  <p className="text-sm text-muted-foreground">Market Position</p>
                  <p className="text-2xl font-bold">Mid-tier</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600">Competitive segment</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sensitivity Score</p>
                  <p className="text-2xl font-bold">7.2</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600">Improving</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Peer Comparison Table */}
        <Card>
          <CardHeader>
            <CardTitle>Peer Group Comparison</CardTitle>
            <CardDescription>Your property performance vs similar boutique hotels</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>ADR</TableHead>
                  <TableHead>Sensitivity</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {peerData.map((property, index) => (
                  <TableRow key={index} className={property.isYours ? "bg-primary/5 border-primary/20" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {property.property}
                        {property.isYours && <Badge variant="secondary">You</Badge>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">#{property.rank}</span>
                        {getRankIcon(property.rank, property.rank + (Math.random() > 0.5 ? 1 : -1))}
                      </div>
                    </TableCell>
                    <TableCell>${property.adr}</TableCell>
                    <TableCell>{property.sensitivity}</TableCell>
                    <TableCell>
                      <span className={property.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {property.change}
                      </span>
                    </TableCell>
                    <TableCell>
                      {!property.isYours && (
                        <Button variant="outline" size="sm" onClick={() => handleCompare(property.property)}>
                          Compare
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Charts */}
          <Card>
            <CardHeader>
              <CardTitle>ADR Trend Comparison</CardTitle>
              <CardDescription>Your ADR vs peer group average over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="yourADR" stroke="#3b82f6" strokeWidth={2} name="Your ADR" />
                  <Line type="monotone" dataKey="peerAvg" stroke="#ef4444" strokeWidth={2} name="Peer Average" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Market Positioning */}
          <Card>
            <CardHeader>
              <CardTitle>Market Positioning</CardTitle>
              <CardDescription>Rate positioning within peer group</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={peerData.filter(p => !p.isYours).concat(peerData.filter(p => p.isYours))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="property" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="adr" fill="#3b82f6" name="ADR" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Compare Modal */}
        <Dialog open={compareModal} onOpenChange={setCompareModal}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Property Comparison: {selectedProperty}</DialogTitle>
              <DialogDescription>Detailed comparison between your property and {selectedProperty}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-medium text-primary">Your Property</h4>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>ADR:</span>
                      <span className="font-medium">$245</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rank:</span>
                      <span className="font-medium">#3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sensitivity:</span>
                      <span className="font-medium">7.2</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground">{selectedProperty}</h4>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>ADR:</span>
                      <span className="font-medium">$285</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rank:</span>
                      <span className="font-medium">#1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sensitivity:</span>
                      <span className="font-medium">6.8</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Key Insights</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• {selectedProperty} charges $40 more per night on average</li>
                  <li>• Their market position is stronger in the luxury segment</li>
                  <li>• Consider premium amenities or services to justify higher rates</li>
                  <li>• Note: Utilization data not available for peer comparison</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
