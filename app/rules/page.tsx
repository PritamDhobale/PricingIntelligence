"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit3, Trash2, Play, Settings, AlertTriangle, CheckCircle, ArrowUp, ArrowDown } from "lucide-react"
import { toast } from "@/components/toast"

interface Rule {
  id: number
  name: string
  condition: string
  action: string
  priority: number
  status: "active" | "inactive"
  lastTriggered: string
  triggerCount: number
}

export default function RuleEngineEditor() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<Rule | null>(null)
  const [newRule, setNewRule] = useState({
    name: "",
    condition: "",
    action: "",
    priority: 1,
    status: "active" as "active" | "inactive",
  })

  const [rules, setRules] = useState<Rule[]>([
    {
      id: 1,
      name: "High Utilization Premium",
      condition: "utilization > 80% AND day_of_week IN (Friday, Saturday)",
      action: "Increase ADR by 15%",
      priority: 1,
      status: "active",
      lastTriggered: "2024-01-14",
      triggerCount: 23,
    },
    {
      id: 2,
      name: "Peer Undercut Strategy",
      condition: "peer_adr > our_adr + $20 AND utilization < 60%",
      action: "Match peer ADR - $5",
      priority: 2,
      status: "active",
      lastTriggered: "2024-01-12",
      triggerCount: 8,
    },
    {
      id: 3,
      name: "Event Day Surge",
      condition: "event_impact > 70% AND booking_window < 7 days",
      action: "Increase ADR by 25%",
      priority: 3,
      status: "active",
      lastTriggered: "2024-01-10",
      triggerCount: 15,
    },
    {
      id: 4,
      name: "Low Season Adjustment",
      condition: "month IN (January, February) AND utilization < 50%",
      action: "Decrease ADR by 10%",
      priority: 4,
      status: "inactive",
      lastTriggered: "2024-01-05",
      triggerCount: 3,
    },
    {
      id: 5,
      name: "Last Minute Booking",
      condition: "booking_window < 2 days AND utilization > 70%",
      action: "Increase ADR by 20%",
      priority: 5,
      status: "active",
      lastTriggered: "2024-01-13",
      triggerCount: 12,
    },
  ])

  const conditions = [
    "utilization > X%",
    "utilization < X%",
    "peer_adr > our_adr + $X",
    "peer_adr < our_adr - $X",
    "event_impact > X%",
    "booking_window < X days",
    "day_of_week IN (days)",
    "month IN (months)",
    "room_type = X",
  ]

  const actions = [
    "Increase ADR by X%",
    "Decrease ADR by X%",
    "Set ADR to $X",
    "Match peer ADR",
    "Match peer ADR + $X",
    "Match peer ADR - $X",
    "Apply seasonal factor X%",
  ]

  const handleAddRule = () => {
    if (!newRule.name || !newRule.condition || !newRule.action) {
      toast.error("Missing Fields", "Please fill in all required fields")
      return
    }

    const rule: Rule = {
      id: rules.length + 1,
      name: newRule.name,
      condition: newRule.condition,
      action: newRule.action,
      priority: newRule.priority,
      status: newRule.status,
      lastTriggered: "Never",
      triggerCount: 0,
    }

    setRules([...rules, rule])
    setNewRule({
      name: "",
      condition: "",
      action: "",
      priority: 1,
      status: "active",
    })
    setIsDialogOpen(false)
    toast.success("Rule Added", `${rule.name} has been created successfully`)
  }

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule)
    setNewRule({
      name: rule.name,
      condition: rule.condition,
      action: rule.action,
      priority: rule.priority,
      status: rule.status,
    })
    setIsDialogOpen(true)
  }

  const handleUpdateRule = () => {
    if (!editingRule || !newRule.name || !newRule.condition || !newRule.action) {
      toast.error("Missing Fields", "Please fill in all required fields")
      return
    }

    const updatedRules = rules.map((rule) => (rule.id === editingRule.id ? { ...rule, ...newRule } : rule))

    setRules(updatedRules)
    setEditingRule(null)
    setNewRule({
      name: "",
      condition: "",
      action: "",
      priority: 1,
      status: "active",
    })
    setIsDialogOpen(false)
    toast.success("Rule Updated", "Rule has been updated successfully")
  }

  const toggleRuleStatus = (ruleId: number) => {
    const updatedRules = rules.map((rule) =>
      rule.id === ruleId
        ? { ...rule, status: rule.status === "active" ? ("inactive" as const) : ("active" as const) }
        : rule,
    )
    setRules(updatedRules)
    const rule = rules.find((r) => r.id === ruleId)
    toast.info("Rule Status Changed", `${rule?.name} is now ${rule?.status === "active" ? "inactive" : "active"}`)
  }

  const deleteRule = (ruleId: number) => {
    const rule = rules.find((r) => r.id === ruleId)
    setRules(rules.filter((r) => r.id !== ruleId))
    toast.success("Rule Deleted", `${rule?.name} has been removed`)
  }

  const handleTestRules = () => {
    toast.info("Testing Rules", "Running test scenario against all active rules...")
    setTimeout(() => {
      toast.success("Test Complete", "2 rules would trigger with current test data")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rule Engine Editor</h1>
            <p className="text-gray-600">Configure automated pricing rules and logic</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {rules.filter((r) => r.status === "active").length} Active Rules
            </Badge>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingRule(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingRule ? "Edit Rule" : "Create New Rule"}</DialogTitle>
                  <DialogDescription>Define conditions and actions for automated pricing decisions</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <Input
                      id="rule-name"
                      placeholder="Enter descriptive rule name"
                      value={newRule.name}
                      onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newRule.priority.toString()}
                        onValueChange={(value) => setNewRule({ ...newRule, priority: Number.parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 (Highest)</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5 (Lowest)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        id="active"
                        checked={newRule.status === "active"}
                        onCheckedChange={(checked) =>
                          setNewRule({ ...newRule, status: checked ? "active" : "inactive" })
                        }
                      />
                      <Label htmlFor="active">Active</Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Textarea
                      id="condition"
                      placeholder="e.g., utilization > 80% AND day_of_week IN (Friday, Saturday)"
                      value={newRule.condition}
                      onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                      className="min-h-20"
                    />
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 mb-1">Common conditions:</p>
                      <div className="flex flex-wrap gap-1">
                        {conditions.slice(0, 4).map((condition, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-gray-100"
                            onClick={() =>
                              setNewRule({
                                ...newRule,
                                condition: newRule.condition + (newRule.condition ? " AND " : "") + condition,
                              })
                            }
                          >
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="action">Action</Label>
                    <Textarea
                      id="action"
                      placeholder="e.g., Increase ADR by 15%"
                      value={newRule.action}
                      onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                      className="min-h-20"
                    />
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 mb-1">Common actions:</p>
                      <div className="flex flex-wrap gap-1">
                        {actions.slice(0, 4).map((action, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-gray-100"
                            onClick={() => setNewRule({ ...newRule, action: action })}
                          >
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" placeholder="Explain when and why this rule should trigger" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={editingRule ? handleUpdateRule : handleAddRule}>
                    {editingRule ? "Update Rule" : "Create Rule"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Rule Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Rules</p>
                  <p className="text-2xl font-bold">{rules.filter((r) => r.status === "active").length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rules Triggered Today</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Play className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold">1.2s</p>
                </div>
                <Settings className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold">98.5%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rules Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Rules</CardTitle>
            <CardDescription>Manage your automated pricing logic and conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead>Triggers</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell className="max-w-xs">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {rule.condition.length > 50 ? `${rule.condition.substring(0, 50)}...` : rule.condition}
                      </code>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <code className="text-xs bg-blue-100 px-2 py-1 rounded">{rule.action}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{rule.priority}</span>
                        {rule.priority <= 2 && <ArrowUp className="w-3 h-3 text-red-500" />}
                        {rule.priority >= 4 && <ArrowDown className="w-3 h-3 text-gray-400" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={rule.status === "active" ? "default" : "secondary"}>{rule.status}</Badge>
                        <Switch
                          checked={rule.status === "active"}
                          onCheckedChange={() => toggleRuleStatus(rule.id)}
                          size="sm"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{rule.lastTriggered}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{rule.triggerCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEditRule(rule)}>
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteRule(rule.id)}>
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Rule Testing */}
        <Card>
          <CardHeader>
            <CardTitle>Rule Testing & Validation</CardTitle>
            <CardDescription>Test your rules against sample data before activation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Test Scenario</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Utilization %</Label>
                      <Input placeholder="85" />
                    </div>
                    <div>
                      <Label className="text-xs">Current ADR</Label>
                      <Input placeholder="245" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Peer ADR</Label>
                      <Input placeholder="250" />
                    </div>
                    <div>
                      <Label className="text-xs">Event Impact %</Label>
                      <Input placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Day of Week</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monday">Monday</SelectItem>
                        <SelectItem value="tuesday">Tuesday</SelectItem>
                        <SelectItem value="wednesday">Wednesday</SelectItem>
                        <SelectItem value="thursday">Thursday</SelectItem>
                        <SelectItem value="friday">Friday</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleTestRules}>
                    <Play className="w-4 h-4 mr-2" />
                    Test Rules
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Test Results</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Rule #1 Triggered</span>
                    </div>
                    <p className="text-sm text-green-700">High Utilization Premium: ADR increased to $281.75 (+15%)</p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">Rule #2 Not Triggered</span>
                    </div>
                    <p className="text-sm text-gray-700">Peer Undercut Strategy: Condition not met</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-1">Final Recommendation</h5>
                    <p className="text-sm text-blue-700">
                      Suggested ADR: <strong>$281.75</strong>
                    </p>
                    <p className="text-xs text-blue-600 mt-1">Based on 1 active rule trigger</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* External Data Integration */}
        <Card>
          <CardHeader>
            <CardTitle>External Data Integration</CardTitle>
            <CardDescription>Connect external data sources for enhanced rule conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Weather Data</h4>
                  <Switch />
                </div>
                <p className="text-sm text-gray-600">Include weather conditions in pricing rules</p>
                <Badge variant="outline" className="mt-2">
                  Coming Soon
                </Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Local Events API</h4>
                  <Switch />
                </div>
                <p className="text-sm text-gray-600">Automatically detect local events</p>
                <Badge variant="outline" className="mt-2">
                  Beta
                </Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Market Trends</h4>
                  <Switch />
                </div>
                <p className="text-sm text-gray-600">Real-time market demand indicators</p>
                <Badge variant="outline" className="mt-2">
                  Coming Soon
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
