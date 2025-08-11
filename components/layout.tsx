"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Building2, BarChart3, Calendar, Users, Settings, TrendingUp, Upload, Zap, LogOut, Menu, User, ChevronDown, ChevronRight, DollarSign, Target, BookOpen, TrendingDown, Activity, PieChart, LineChart, Layers, Megaphone, Gift, CalendarIcon, Home, Lightbulb } from 'lucide-react'
import { cn } from "@/lib/utils"
import { toast } from "@/components/toast"
import Image from "next/image"

interface NavigationItem {
  name: string
  href?: string
  icon: any
  children?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard", // Add main route
    icon: BarChart3,
    children: [
      { name: "Sensitivity", href: "/dashboard/sensitivity", icon: Activity },
      { name: "Breakeven", href: "/dashboard/breakeven", icon: Target },
      { name: "Latest Bookings", href: "/dashboard/bookings", icon: BookOpen },
    ],
  },
  {
    name: "Price Forecasting",
    href: "/forecasting", // Add main route
    icon: TrendingUp,
    children: [
      { name: "Monthly", href: "/forecasting/monthly", icon: CalendarIcon },
      { name: "Daily", href: "/forecasting/daily", icon: Calendar },
      { name: "Room Type", href: "/forecasting/room-type", icon: Home },
      { name: "Future Months (3+)", href: "/forecasting/future", icon: LineChart },
      { name: "Pricing Recommendations", href: "/forecasting/recommendations", icon: Lightbulb },
    ],
  },
  { name: "Events", href: "/events", icon: Calendar },
  {
    name: "Finance",
    href: "/finance", // Add main route
    icon: DollarSign,
    children: [
      { name: "Revenue Analysis", href: "/finance/revenue", icon: PieChart },
      { name: "Breakeven Deep Dive", href: "/finance/breakeven", icon: TrendingDown },
    ],
  },
  { name: "Peer Group", href: "/peer-analysis", icon: Users },
  {
    name: "Ads & Promotions",
    href: "/ads-promotions", // Add main route
    icon: Megaphone,
    children: [
      { name: "Ads", href: "/ads-promotions/ads", icon: Megaphone },
      { name: "Promotions", href: "/ads-promotions/promotions", icon: Gift },
    ],
  },
  {
    name: "Rules Engine",
    href: "/rules", // Update main route
    icon: Zap,
    children: [
      { name: "Monthly Rules", href: "/rules/monthly", icon: CalendarIcon },
      { name: "Daily Rules", href: "/rules/daily", icon: Calendar },
      { name: "Room Type Rules", href: "/rules/room-type", icon: Home },
      { name: "Ads Rules", href: "/rules/ads", icon: Megaphone },
    ],
  },
  { name: "Insights", href: "/insights", icon: Layers },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard", "Price Forecasting"])
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    toast.success("Logged Out", "You have been successfully logged out")
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const isItemActive = (item: NavigationItem): boolean => {
    if (item.href && pathname === item.href) return true
    if (item.children) {
      return item.children.some(child => pathname === child.href)
    }
    return false
  }

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = isItemActive(item)
        const isExpanded = expandedItems.includes(item.name)
        
        if (item.children) {
          return (
            <div key={item.name}>
              <div className="flex items-center">
                {/* Main navigation link */}
                <Link
                  href={item.href!}
                  onClick={() => mobile && setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors flex-1",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
                
                {/* Expand/collapse button */}
                <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(item.name)}>
                  <CollapsibleTrigger asChild>
                    <button className="p-1 hover:bg-accent rounded">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
              
              <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(item.name)}>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Link
                        key={child.name}
                        href={child.href!}
                        onClick={() => mobile && setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                          isChildActive
                            ? "bg-primary/20 text-primary font-medium border-r-2 border-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <child.icon className="w-4 h-4" />
                        {child.name}
                      </Link>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>
          )
        }

        return (
          <Link
            key={item.name}
            href={item.href!}
            onClick={() => mobile && setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
                ? "bg-primary/10 text-primary border-r-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-card border-r border-border pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4">
            {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div> */}
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
            <span className="ml-2 text-lg font-semibold text-foreground">Hotel Pricing</span>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex-grow flex flex-col">
            <div className="flex-1 px-4 space-y-1">
              <NavItems />
            </div>

            {/* User Profile & Logout */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@hotel.com</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full bg-card">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 px-4 py-5 border-b border-border">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="ml-2 text-lg font-semibold text-foreground">Hotel Pricing</span>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-4">
              <NavItems mobile />
            </div>

            {/* User Profile & Logout */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@hotel.com</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Hotel Pricing</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
