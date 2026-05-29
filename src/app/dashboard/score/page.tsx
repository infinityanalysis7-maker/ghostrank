import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cookies } from 'next/headers'
import { calculateScore } from '../../actions/profile'

export default async function ScorePage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value || ''

  const scoreData = await calculateScore(session)
  const score = scoreData?.totalScore || 0

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score < 50) return '#ef4444' // red
    if (score < 75) return '#eab308' // yellow
    return '#22c55e' // green
  }

  const scoreColor = getScoreColor(score)
  const circumference = 2 * Math.PI * 120 // radius = 120
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getMessage = (score: number) => {
    if (score < 50) {
      return {
        title: "You are a Google Ghost.",
        subtitle: "Customers can't find you.",
        description: "Your business is invisible to local search. Complete your profile and start posting to improve your visibility."
      }
    } else if (score < 75) {
      return {
        title: "You're getting noticed.",
        subtitle: "Keep improving!",
        description: "Your business has some visibility, but there's room for growth. Focus on responding to reviews and posting regularly."
      }
    } else {
      return {
        title: "You're a Local SEO Star!",
        subtitle: "Great work!",
        description: "Your business is highly visible in local search. Keep up the excellent work to maintain your ranking."
      }
    }
  }

  const message = getMessage(score)

  return (
    <DashboardLayout scoreData={scoreData}>
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-2">Ghost Score</h1>
          <p className="text-slate-400">Track your local SEO performance score</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Circular Score Gauge */}
          <Card className="lg:col-span-1 border-slate-800 bg-slate-950/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-64 h-64">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="#1e293b"
                      strokeWidth="12"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke={scoreColor}
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold text-white">{score}</span>
                    <span className="text-sm text-slate-400">out of 100</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-white">{message.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{message.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card className="lg:col-span-2 border-slate-800 bg-slate-950/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Score Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">Profile Completeness</span>
                  <span className="text-sm text-slate-400">{scoreData?.profileScore || 0}/25</span>
                </div>
                <Progress value={(scoreData?.profileScore || 0) / 25 * 100} className="h-2" />
                <p className="text-xs text-slate-500">Complete your business profile information</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">Post Frequency</span>
                  <span className="text-sm text-slate-400">{scoreData?.postScore || 0}/25</span>
                </div>
                <Progress value={(scoreData?.postScore || 0) / 25 * 100} className="h-2" />
                <p className="text-xs text-slate-500">Generate and post regular updates</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">Review Response Rate</span>
                  <span className="text-sm text-slate-400">{scoreData?.reviewScore || 0}/25</span>
                </div>
                <Progress value={(scoreData?.reviewScore || 0) / 25 * 100} className="h-2" />
                <p className="text-xs text-slate-500">Respond to customer reviews promptly</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-300">Keyword Power</span>
                  <span className="text-sm text-slate-400">{scoreData?.keywordScore || 0}/25</span>
                </div>
                <Progress value={(scoreData?.keywordScore || 0) / 25 * 100} className="h-2" />
                <p className="text-xs text-slate-500">Optimize your content with relevant keywords</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Card */}
        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <p className="text-slate-300">{message.description}</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
