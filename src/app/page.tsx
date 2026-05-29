import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PenTool, MessageSquare, TrendingUp, Check } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Stop Being a Google Ghost
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8">
            AI software that helps local businesses rank higher on Google Maps and get more customers.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-200 text-lg px-8 py-6">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            The Problem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Bad Reviews Kill Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Angry, defensive replies chase customers away. One bad response can cost you dozens of potential customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Google Forgets You Exist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Inactive profiles become invisible. If you don't post regularly, Google stops showing your business to local customers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Posting is a Full-Time Job</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Busy business owners never have time to write posts. Your Google Business Profile sits empty while competitors dominate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            The Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <PenTool className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-white">AI Post Generator</CardTitle>
                <CardDescription className="text-slate-400">
                  Writes Google posts for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Our AI generates professional, engaging posts tailored to your business and location. Just click and publish.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-white">Review Reply Writer</CardTitle>
                <CardDescription className="text-slate-400">
                  Fixes bad reviews with professional replies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Turn angry customers into loyal ones with AI-generated empathetic responses that show you care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-white mb-4" />
                <CardTitle className="text-white">Ghost Score Tracker</CardTitle>
                <CardDescription className="text-slate-400">
                  Shows exactly how invisible you are
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Get a clear score of your local SEO visibility. Track your progress and watch your ranking improve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Simple Pricing
          </h2>
          <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-4xl mb-2">$49/month</CardTitle>
              <CardDescription className="text-slate-400">
                Everything you need to dominate local search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="h-5 w-5 text-green-500" />
                  Unlimited AI posts
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="h-5 w-5 text-green-500" />
                  Unlimited review replies
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="h-5 w-5 text-green-500" />
                  Ghost Score tracking
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Check className="h-5 w-5 text-green-500" />
                  Google Business Profile optimization
                </li>
              </ul>
              <Link href="/signup" className="block">
                <Button className="w-full bg-white text-slate-950 hover:bg-slate-200">
                  Start Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white font-bold text-lg mb-2">GhostRank</p>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} GhostRank. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
