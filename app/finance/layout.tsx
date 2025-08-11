import type React from "react"
import Layout from "@/components/layout"

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Layout>{children}</Layout>
}
