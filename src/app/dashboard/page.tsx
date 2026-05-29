import { DashboardLayout } from '@/components/dashboard-layout'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { calculateScore } from '../actions/profile'
import { Card, CardContent } from '@/components/ui/card'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value || ''

  // Get user data
  const { data: { user } } = await supabase.auth.getUser(session)

  // Get score data
  const scoreData = await calculateScore(session)

  return (
    <DashboardLayout scoreData={scoreData}>
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-slate-400">Your GhostRank dashboard overview</p>
        </div>

        {/* Recent Activity */}
        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                <p className="text-slate-400 text-sm">Posts Generated</p>
                <p className="text-3xl font-bold text-white">{scoreData?.postCount ?? 0}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                <p className="text-slate-400 text-sm">Reviews Fixed</p>
                <p className="text-3xl font-bold text-white">{scoreData?.replyCount ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
