import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cookies } from 'next/headers'
import { getProfile } from '../../actions/profile'
import Link from 'next/link'
import ReplyCard from './reply-card'

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: { error?: string; replies?: string }
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value || 'user@example.com'

  const profile = await getProfile(session)

  // Parse replies from URL params
  let replies: { label: string; text: string }[] = []
  if (searchParams.replies) {
    try {
      replies = JSON.parse(decodeURIComponent(searchParams.replies))
    } catch (e) {
      console.error('Failed to parse replies:', e)
    }
  }

  return (
    <DashboardLayout userEmail={session}>
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-2">Review Replies</h1>
          <p className="text-slate-400">Generate AI-powered replies to customer reviews</p>
        </div>

        {!profile || !profile.category || !profile.city ? (
          <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <p className="text-slate-300 mb-4">Please fill out your business profile first</p>
              <Link href="/dashboard/business">
                <Button className="bg-white text-slate-950 hover:bg-slate-200">
                  Go to Business Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {searchParams.error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-sm text-red-400">{searchParams.error}</p>
              </div>
            )}

            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Generate Review Replies</CardTitle>
                <CardDescription className="text-slate-400">
                  Paste a customer review and generate professional, empathetic responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action="/dashboard/reviews/generate" method="POST" className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="reviewText" className="text-sm font-medium text-slate-300">
                      Review Text
                    </label>
                    <Textarea
                      id="reviewText"
                      name="reviewText"
                      placeholder="Paste the customer's review here..."
                      required
                      rows={6}
                      className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="rating" className="text-sm font-medium text-slate-300">
                      Star Rating
                    </label>
                    <Select name="rating" required>
                      <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white focus:border-slate-500">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        <SelectItem value="1">1 Star</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-slate-950 hover:bg-slate-200"
                  >
                    Generate Replies
                  </Button>
                </form>
              </CardContent>
            </Card>

            {replies.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Generated Replies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {replies.map((reply, index) => (
                    <ReplyCard key={index} reply={reply} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
