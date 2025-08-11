"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Users, DollarSign, TrendingUp, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { toast } from "@/components/toast"

export default function DetailsPage() {
  const params = useParams()
  const slug = params.slug as string

  const [currentADR, setCurrentADR] = useState(245)
  const [customPriceModal, setCustomPriceModal] = useState(false)
  const [customPrice, setCustomPrice] = useState("")
  const [showSimilarDates, setShowSimilarDates] = useState(false)

  // Parse the slug to extract date and room type
  const [date, roomType] = slug
    ? slug.split("-").slice(0, -1).join("-").split("-").concat(slug.split("-").slice(-1))
    : ["", ""]
  const parsedDate = date || "2024-01-16"
  const parsedRoomType = roomType || "studio"

  // Mock data based on the parameters
  const detailsData = {
    date: parsedDate,
    roomType: parsedRoomType.charAt(0).toUpperCase() + parsedRoomType.slice(1),
    utilization: 92,
    currentADR: currentADR,
    suggestedADR: 265,
    peerADR: 242,
    bookedRooms: 11,
    totalRooms: 12,
    sensitivity: 8.9,
    isEvent: true,
    eventName: "Jazz Festival",
    revenue: currentADR * 11,
    potentialRevenue: 265 * 11,
  }

  const historicalData = [
    { date: "2024-01-10", adr: 235, utilization: 75 },
    { date: "2024-01-11", adr: 240, utilization: 78 },
    { date: "2024-01-12", adr: 238, utilization: 72 },
    { date: "2024-01-13", adr: 245, utilization: 85 },
    { date: "2024-01-14", adr: 250, utilization: 88 },
    { date: "2024-01-15", adr: 245, utilization: 82 },
    { date: "2024-01-16", adr: currentADR, utilization: 92 },
  ]

  const competitorData = [
    { name: "Your Property", adr: detailsData.currentADR, utilization: detailsData.utilization },
    { name: "Luxury Boutique", adr: 285, utilization: 85 },
    { name: "Historic Inn", adr: 265, utilization: 82 },
    { name: "Riverside Hotel", adr: 235, utilization: 75 },
  ]

  const similarDatesData = [
    { date: "2023-01-16", roomType: "Studio", adr: 235, utilization: 88, event: "Jazz Festival" },
    { date: "2023-07-15", roomType: "Studio", adr: 255, utilization: 90, event: "Summer Festival" },
    { date: "2023-12-31", roomType: "Studio", adr: 275, utilization: 95, event: "New Year's Eve" },
    { date: "2022-01-16", roomType: "Studio", adr: 220, utilization: 85, event: "Jazz Festival" },
  ]

  const handleApplySuggestedADR = () => {
    setCurrentADR(detailsData.suggestedADR)
    toast.success("ADR Updated", `Price updated to $${detailsData.suggestedADR} as suggested`)
  }

  const handleSetCustomPrice = () => {
    if (customPrice && !isNaN(Number(customPrice))) {
      setCurrentADR(Number(customPrice))
      setCustomPriceModal(false)
      toast.success("Custom Price Set", `ADR updated to $${customPrice}`)
      setCustomPrice("")
    } else {
      toast.error("Invalid Price", "Please enter a valid price")
    }
  }

  const handleViewSimilarDates = () => {
    setShowSimilarDates(!showSimilarDates)
    if (!showSimilarDates) {
      toast.info("Similar Dates", "Showing historical data for similar events")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pricing Details</h1>
              <p className="text-gray-600">
                {detailsData.date} - {detailsData.roomType} Room
              </p>
            </div>
          </div>
          {detailsData.isEvent && (
            <Badge className="bg-amber-100 text-amber-800">Event Day: {detailsData.eventName}</Badge>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilization</p>
                  <p className="text-2xl font-bold">{detailsData.utilization}%</p>
                  <p className="text-xs text-gray-500">
                    {detailsData.bookedRooms}/{detailsData.totalRooms} rooms
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current ADR</p>
                  <p className="text-2xl font-bold">${detailsData.currentADR}</p>
                  <p className="text-xs text-gray-500">vs ${detailsData.peerADR} peer avg</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Suggested ADR</p>
                  <p className="text-2xl font-bold">${detailsData.suggestedADR}</p>
                  <p className="text-xs text-green-600">
                    +${detailsData.suggestedADR - detailsData.currentADR} potential
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sensitivity Score</p>
                  <p className="text-2xl font-bold">{detailsData.sensitivity}</p>
                  <p className="text-xs text-red-600">High sensitivity</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Historical Performance */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Performance Trend</CardTitle>
              <CardDescription>ADR and utilization over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="adr" stroke="#3b82f6" strokeWidth={2} name="ADR" />
                  <Line type="monotone" dataKey="utilization" stroke="#ef4444" strokeWidth={2} name="Utilization %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Competitor Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Competitor Comparison</CardTitle>
              <CardDescription>How you stack up against similar properties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="adr" fill="#3b82f6" name="ADR ($)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Analysis & Recommendations</CardTitle>
            <CardDescription>AI-powered insights for this specific date and room type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Current Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue Generated:</span>
                    <span className="font-medium">${detailsData.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potential Revenue:</span>
                    <span className="font-medium text-green-600">${detailsData.potentialRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue Gap:</span>
                    <span className="font-medium text-red-600">
                      -${detailsData.potentialRevenue - detailsData.revenue}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Recommendations</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Increase ADR to ${detailsData.suggestedADR}</strong> - High demand detected due to{" "}
                      {detailsData.eventName}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Monitor booking pace</strong> - High sensitivity score indicates price-conscious guests
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Consider last-minute premium</strong> - Only 1 room remaining, apply urgency pricing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <Button onClick={handleApplySuggestedADR}>Apply Suggested ADR</Button>
              <Button variant="outline" onClick={() => setCustomPriceModal(true)}>
                Set Custom Price
              </Button>
              <Button variant="outline" onClick={handleViewSimilarDates}>
                {showSimilarDates ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                View Similar Dates
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Similar Dates Section */}
        {showSimilarDates && (
          <Card>
            <CardHeader>
              <CardTitle>Similar Historical Dates</CardTitle>
              <CardDescription>Performance data from similar events and dates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>ADR</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Event</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {similarDatesData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.date}</TableCell>
                      <TableCell>{row.roomType}</TableCell>
                      <TableCell>${row.adr}</TableCell>
                      <TableCell>
                        <Badge variant={row.utilization > 85 ? "default" : "secondary"}>{row.utilization}%</Badge>
                      </TableCell>
                      <TableCell>{row.event}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Custom Price Modal */}
        <Dialog open={customPriceModal} onOpenChange={setCustomPriceModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Custom Price</DialogTitle>
              <DialogDescription>
                Enter a custom ADR for {detailsData.date} - {detailsData.roomType} Room
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-price">Custom ADR ($)</Label>
                <Input
                  id="custom-price"
                  type="number"
                  placeholder="Enter price"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-600">
                Current ADR: ${detailsData.currentADR} | Suggested ADR: ${detailsData.suggestedADR}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCustomPriceModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSetCustomPrice}>Set Price</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
