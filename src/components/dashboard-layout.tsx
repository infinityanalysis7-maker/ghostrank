'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Menu, X, TrendingUp, FileText, MessageSquare, BarChart3 } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/dashboard/business', label: 'My Business', icon: FileText },
  { href: '/dashboard/posts', label: 'Post Generator', icon: FileText },
  { href: '/dashboard/reviews', label: 'Review Replies', icon: MessageSquare },
  { href: '/dashboard/score', label: 'Ghost Score', icon: TrendingUp },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-slate-900/50 border-slate-700 text-white backdrop-blur-sm"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 border-r border-slate-800/50 bg-slate-950/90 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GhostRank
            </h1>
            <p className="text-sm text-slate-400 mt-1">Local SEO Platform</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-6 border-t border-slate-800/50">
            <p className="text-xs text-slate-500">GhostRank</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8 p-6 rounded-2xl border border-slate-800/50 bg-slate-950/50 backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Welcome back</h2>
              </div>
              <div className="hidden md:block">
                <Link href="/dashboard/score">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                    View Your Score
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-slate-800/50 bg-slate-950/50 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Ghost Score</p>
                    <p className="text-4xl font-bold text-white mt-2">--</p>
                  </div>
                  <TrendingUp className="h-10 w-10 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-950/50 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Posts Generated</p>
                    <p className="text-4xl font-bold text-white mt-2">--</p>
                  </div>
                  <FileText className="h-10 w-10 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-950/50 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">Reviews Fixed</p>
                    <p className="text-4xl font-bold text-white mt-2">--</p>
                  </div>
                  <MessageSquare className="h-10 w-10 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/posts">
                <Button className="w-full h-20 bg-slate-900/50 border border-slate-700 hover:bg-slate-800/50 hover:border-slate-600 text-white flex flex-col items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">Generate Post</span>
                </Button>
              </Link>
              <Link href="/dashboard/reviews">
                <Button className="w-full h-20 bg-slate-900/50 border border-slate-700 hover:bg-slate-800/50 hover:border-slate-600 text-white flex flex-col items-center justify-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">Fix Review</span>
                </Button>
              </Link>
              <Link href="/dashboard/score">
                <Button className="w-full h-20 bg-slate-900/50 border border-slate-700 hover:bg-slate-800/50 hover:border-slate-600 text-white flex flex-col items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">View Score</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Page content */}
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
