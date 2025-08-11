"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Plus, MapPin, TrendingUp, Music, Trophy, Utensils, Building2 } from "lucide-react"
import { toast } from "@/components/toast"

interface Event {
  id: number
  name: string
  type: string
  location: string
  startDate: string
  endDate: string
  impact: number
  status: string
  description: string
}

export default function EventManagement() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showEventsInPricing, setShowEventsInPricing] = useState(true)
  const [newEvent, setNewEvent] = useState({
    name: "",
    type: "",
    location: "",
    startDate: "",
    endDate: "",
    impact: "",
    description: "",
  })

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Jazz Festival",
      type: "music",
      location: "Downtown Park",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      impact: 85,
      status: "active",
      description: "Annual jazz festival attracting visitors from across the region",
    },
    {
      id: 2,
      name: "Food & Wine Expo",
      type: "food",
      location: "Convention Center",
      startDate: "2024-02-15",
      endDate: "2024-02-17",
      impact: 70,
      status: "active",
      description: "Premium culinary event with wine tastings",
    },
    {
      id: 3,
      name: "Tech Conference",
      type: "business",
      location: "Hotel District",
      startDate: "2024-03-10",
      endDate: "2024-03-12",
      impact: 90,
      status: "active",
      description: "Major technology conference with 5000+ attendees",
    },
  ])

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.type || !newEvent.startDate || !newEvent.endDate) {
      toast.error("Missing Fields", "Please fill in all required fields")
      return
    }

    const event: Event = {
      id: events.length + 1,
      name: newEvent.name,
      type: newEvent.type,
      location: newEvent.location,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      impact: Number.parseInt(newEvent.impact) || 50,
      status: "active",
      description: newEvent.description,
    }

    setEvents([...events, event])
    setNewEvent({
      name: "",
      type: "",
      location: "",
      startDate: "",
      endDate: "",
      impact: "",
      description: "",
    })
    setIsDialogOpen(false)
    toast.success("Event Added", `${event.name} has been added to your calendar`)
  }

  const handleToggleEventsInPricing = (checked: boolean) => {
    setShowEventsInPricing(checked)
    toast.info(
      "Pricing Logic Updated",
      checked ? "Events are now included in pricing calculations" : "Events are excluded from pricing calculations",
    )
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "music":
        return <Music className="w-4 h-4" />
      case "food":
        return <Utensils className="w-4 h-4" />
      case "business":
        return <Building2 className="w-4 h-4" />
      case "sports":
        return <Trophy className="w-4 h-4" />
      default:
        return <CalendarIcon className="w-4 h-4" />
    }
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 80) return "bg-red-100 text-red-800 border-red-200"
    if (impact >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-green-100 text-green-800 border-green-200"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
            <p className="text-gray-600">Track events that impact your pricing strategy</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="events-in-pricing"
                checked={showEventsInPricing}
                onCheckedChange={handleToggleEventsInPricing}
              />
              <Label htmlFor="events-in-pricing" className="text-sm font-medium">
                Include in Pricing
              </Label>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>Create a new event that may impact your hotel pricing</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-name">Event Name *</Label>
                    <Input
                      id="event-name"
                      placeholder="Enter event name"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-type">Event Type *</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="music">Music Festival</SelectItem>
                        <SelectItem value="food">Food & Dining</SelectItem>
                        <SelectItem value="business">Business Conference</SelectItem>
                        <SelectItem value="sports">Sports Event</SelectItem>
                        <SelectItem value="cultural">Cultural Event</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Event location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date *</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={newEvent.startDate}
                        onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date *</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={newEvent.endDate}
                        onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="impact">Expected Impact (%)</Label>
                    <Input
                      id="impact"
                      type="number"
                      placeholder="0-100"
                      min="0"
                      max="100"
                      value={newEvent.impact}
                      onChange={(e) => setNewEvent({ ...newEvent, impact: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Event description and notes"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEvent}>Create Event</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
                <CardDescription>View events by date and their impact on pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />

                {/* Event badges for selected date */}
                {selectedDate && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium">Events on {selectedDate.toDateString()}</h4>
                    <div className="space-y-2">
                      {events
                        .filter((event) => {
                          const eventStart = new Date(event.startDate)
                          const eventEnd = new Date(event.endDate)
                          return selectedDate >= eventStart && selectedDate <= eventEnd
                        })
                        .map((event) => (
                          <div key={event.id} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                            {getEventIcon(event.type)}
                            <span className="font-medium">{event.name}</span>
                            <Badge className={getImpactColor(event.impact)}>{event.impact}% impact</Badge>
                          </div>
                        ))}
                      {events.filter((event) => {
                        const eventStart = new Date(event.startDate)
                        const eventEnd = new Date(event.endDate)
                        return selectedDate >= eventStart && selectedDate <= eventEnd
                      }).length === 0 && <p className="text-gray-500 text-sm">No events on this date</p>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Event List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events affecting your pricing strategy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getEventIcon(event.type)}
                        <h4 className="font-medium">{event.name}</h4>
                      </div>
                      <Badge className={getImpactColor(event.impact)}>{event.impact}%</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {event.startDate} - {event.endDate}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600">
                          {showEventsInPricing ? "Active in pricing" : "Excluded from pricing"}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Impact Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Event Impact Analysis</CardTitle>
            <CardDescription>How events are affecting your pricing and bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-800">High Impact Events</h4>
                </div>
                <p className="text-2xl font-bold text-green-700">{events.filter((e) => e.impact >= 80).length}</p>
                <p className="text-sm text-green-600">Events with 80%+ impact</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">This Month</h4>
                </div>
                <p className="text-2xl font-bold text-yellow-700">{events.length}</p>
                <p className="text-sm text-yellow-600">Total events scheduled</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Avg. Impact</h4>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {Math.round(events.reduce((sum, e) => sum + e.impact, 0) / events.length)}%
                </p>
                <p className="text-sm text-blue-600">Average pricing impact</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
