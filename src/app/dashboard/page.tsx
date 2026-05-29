import { DashboardLayout } from '@/components/dashboard-layout'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value || ''


  return (
    <DashboardLayout>
      <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
        <p className="text-slate-400">Your GhostRank dashboard overview</p>
      </div>
    </DashboardLayout>
  )
}
