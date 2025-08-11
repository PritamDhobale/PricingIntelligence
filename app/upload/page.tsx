"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Database,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Settings,
  Key,
  Trash2,
} from "lucide-react"
import { toast } from "@/components/toast"

interface UploadedFile {
  id: number
  filename: string
  type: string
  size: string
  uploadDate: string
  status: string
  records: number
}

export default function DocumentUploadExport() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const [recentUploads, setRecentUploads] = useState<UploadedFile[]>([
    {
      id: 1,
      filename: "historical_data_2023.xlsx",
      type: "Excel",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "processed",
      records: 1250,
    },
    {
      id: 2,
      filename: "booking_data_q4.csv",
      type: "CSV",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "processing",
      records: 890,
    },
    {
      id: 3,
      filename: "peer_comparison.xlsx",
      type: "Excel",
      size: "3.1 MB",
      uploadDate: "2024-01-13",
      status: "error",
      records: 0,
    },
  ])

  const exportTemplates = [
    {
      name: "Daily Pricing Report",
      description: "Complete daily pricing data with recommendations",
      formats: ["Excel", "CSV", "PDF"],
      lastGenerated: "2024-01-15",
    },
    {
      name: "Peer Analysis Summary",
      description: "Competitive analysis and benchmarking data",
      formats: ["Excel", "PDF"],
      lastGenerated: "2024-01-14",
    },
    {
      name: "Revenue Forecast",
      description: "Monthly revenue projections and scenarios",
      formats: ["Excel", "PDF"],
      lastGenerated: "2024-01-13",
    },
    {
      name: "Rule Performance Report",
      description: "Pricing rule effectiveness and trigger analysis",
      formats: ["Excel", "CSV"],
      lastGenerated: "2024-01-12",
    },
  ]

  const apiConnections = [
    {
      name: "Key Data Dashboard",
      status: "connected",
      lastSync: "2024-01-15 09:30",
      description: "Primary data source for booking and pricing information",
    },
    {
      name: "Expedia Partner Central",
      status: "disconnected",
      lastSync: "Never",
      description: "Direct integration with Expedia booking platform",
    },
    {
      name: "Booking.com Connectivity",
      status: "pending",
      lastSync: "Setup in progress",
      description: "Real-time rate and availability management",
    },
  ]

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Add to recent uploads
          const newUpload: UploadedFile = {
            id: recentUploads.length + 1,
            filename: file.name,
            type: file.name.endsWith(".xlsx") ? "Excel" : "CSV",
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
            uploadDate: new Date().toISOString().split("T")[0],
            status: "processing",
            records: Math.floor(Math.random() * 1000) + 100,
          }

          setRecentUploads([newUpload, ...recentUploads])
          toast.success("File Uploaded", `${file.name} has been uploaded successfully`)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const handleExport = (templateName: string, format: string) => {
    toast.info("Export Started", `Generating ${templateName} in ${format} format...`)
  }

  const handleQuickExport = (format: string) => {
    toast.info("Export Triggered", `Current pricing data is being exported as ${format}`)
  }

  const handleDeleteUpload = (id: number) => {
    setRecentUploads(recentUploads.filter((upload) => upload.id !== id))
    toast.success("File Deleted", "Upload has been removed")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "processing":
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
            <p className="text-gray-600">Upload historical data and export pricing reports</p>
          </div>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="export">Export Reports</TabsTrigger>
            <TabsTrigger value="integrations">API Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {/* File Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Historical Data
                </CardTitle>
                <CardDescription>
                  Import your existing booking and pricing data to improve AI recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
                  <p className="text-gray-600 mb-4">Supports Excel (.xlsx), CSV (.csv) files up to 10MB</p>
                  <Input
                    type="file"
                    accept=".xlsx,.csv"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Choose Files
                    </Button>
                  </Label>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uploading...</span>
                      <span className="text-sm text-gray-600">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <FileSpreadsheet className="w-8 h-8 text-blue-600 mb-2" />
                    <h4 className="font-medium mb-1">Booking Data</h4>
                    <p className="text-sm text-gray-600">Historical reservations, ADR, occupancy rates</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Database className="w-8 h-8 text-green-600 mb-2" />
                    <h4 className="font-medium mb-1">Pricing History</h4>
                    <p className="text-sm text-gray-600">Past pricing decisions and performance</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <FileText className="w-8 h-8 text-purple-600 mb-2" />
                    <h4 className="font-medium mb-1">Market Data</h4>
                    <p className="text-sm text-gray-600">Competitor pricing and market trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Uploads */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
                <CardDescription>Track your uploaded files and processing status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filename</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUploads.map((upload) => (
                      <TableRow key={upload.id}>
                        <TableCell className="font-medium">{upload.filename}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{upload.type}</Badge>
                        </TableCell>
                        <TableCell>{upload.size}</TableCell>
                        <TableCell>{upload.uploadDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(upload.status)}
                            <span className="capitalize">{upload.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{upload.records.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteUpload(upload.id)}>
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
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            {/* Export Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Reports
                </CardTitle>
                <CardDescription>Generate and download pricing reports in various formats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {exportTemplates.map((template, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </div>
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {template.formats.map((format) => (
                            <Badge
                              key={format}
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-gray-100"
                              onClick={() => handleExport(template.name, format)}
                            >
                              {format}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" onClick={() => handleExport(template.name, template.formats[0])}>
                          <Download className="w-3 h-3 mr-1" />
                          Export
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Last generated: {template.lastGenerated}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Export */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Export</CardTitle>
                <CardDescription>Export current pricing data instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickExport("Excel")}>
                    <FileSpreadsheet className="w-6 h-6 mb-2 text-green-600" />
                    <span>Excel Format</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickExport("CSV")}>
                    <FileText className="w-6 h-6 mb-2 text-blue-600" />
                    <span>CSV Format</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col" onClick={() => handleQuickExport("PDF")}>
                    <FileText className="w-6 h-6 mb-2 text-red-600" />
                    <span>PDF Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            {/* API Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Integrations
                </CardTitle>
                <CardDescription>Connect external platforms for automated data synchronization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiConnections.map((connection, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Database className="w-6 h-6 text-blue-600" />
                          <div>
                            <h4 className="font-medium">{connection.name}</h4>
                            <p className="text-sm text-gray-600">{connection.description}</p>
                          </div>
                        </div>
                        {getStatusBadge(connection.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">Last sync: {connection.lastSync}</p>
                        <div className="flex gap-2">
                          {connection.status === "connected" ? (
                            <>
                              <Button variant="outline" size="sm">
                                Configure
                              </Button>
                              <Button variant="outline" size="sm">
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => toast.info("Connection", `Connecting to ${connection.name}...`)}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Integration Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Integration Setup Guide</CardTitle>
                <CardDescription>Step-by-step instructions for connecting your platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">1. Key Data Dashboard</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Connect your existing Key Data account for seamless data import.
                    </p>
                    <Button variant="outline" size="sm">
                      View Setup Guide
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">2. Channel Manager APIs</h4>
                    <p className="text-sm text-green-700 mb-2">
                      Direct integration with Expedia, Booking.com, and other OTAs.
                    </p>
                    <Button variant="outline" size="sm">
                      Request Access
                    </Button>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">3. Custom API</h4>
                    <p className="text-sm text-purple-700 mb-2">
                      Use our REST API to build custom integrations with your systems.
                    </p>
                    <Button variant="outline" size="sm">
                      API Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
