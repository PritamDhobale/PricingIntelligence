"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Building2, CheckCircle, User, Shield, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function LoginPage() {
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [selectedRole, setSelectedRole] = useState("")
  const [onboardingStep, setOnboardingStep] = useState(0)
  const router = useRouter()

  const onboardingSteps = [
    { id: 1, title: "Connect your property data", completed: false },
    { id: 2, title: "Set up peer group benchmarks", completed: false },
    { id: 3, title: "Configure pricing rules", completed: false },
    { id: 4, title: "Import historical data", completed: false },
    { id: 5, title: "Review first pricing suggestions", completed: false },
  ]

  const roles = [
    { value: "admin", label: "Admin", icon: Shield, description: "Full access to all features and settings" },
    { value: "analyst", label: "Analyst", icon: User, description: "Access to analytics and reporting" },
    { value: "manager", label: "Manager", icon: Users, description: "Property management and pricing oversight" },
  ]

  const handleSignIn = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        {/* <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Pricing Intelligence</h1>
          <p className="text-gray-600">Smart Pricing Calculator</p>
        </div> */}
        <div className="text-center space-y-2">
  <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden">
    <Image
      src="images/logo2.png"
      alt="Pricing Intelligence logo"
      width={64}
      height={64}
      className="w-full h-full object-contain"
      priority
    />
  </div>
  <h1 className="text-2xl font-bold text-gray-900">Pricing Intelligence</h1>
  <p className="text-gray-600">Smart Pricing Calculator</p>
</div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            {/* <CardTitle className="text-xl">Welcome back</CardTitle> */}
            {/* <CardDescription>Sign in to your account to continue</CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label>Select your role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <role.icon className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-gray-500">{role.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleSignIn}>
              Sign In
            </Button>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <Checkbox />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Button variant="link" className="p-0 h-auto text-indigo-600">
                Forgot password?
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Checklist for First-time Users */}
        {/* {isFirstTime && (
          <Card className="shadow-lg border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                Getting Started Checklist
              </CardTitle>
              <CardDescription>Complete these steps to set up your pricing intelligence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {onboardingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        step.completed
                          ? "bg-green-100 text-green-700"
                          : index === 0
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {step.completed ? "✓" : step.id}
                    </div>
                    <span className={`text-sm ${step.completed ? "text-green-700 line-through" : "text-gray-700"}`}>
                      {step.title}
                    </span>
                    {index === 0 && !step.completed && (
                      <Badge variant="secondary" className="ml-auto">
                        Current
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )} */}

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 h-auto text-indigo-600">
            Contact sales
          </Button>
        </div>
      </div>
    </div>
  )
}
