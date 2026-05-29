import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cookies } from 'next/headers'
import { generatePosts, getPosts } from '../../actions/posts'
import { getProfile } from '../../actions/profile'
import Link from 'next/link'
import PostCard from './post-card'

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string }
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value || 'user@example.com'

  const profile = await getProfile(session)
  const posts = await getPosts(session)

  return (
    <DashboardLayout userEmail={session}>
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-2">Post Generator</h1>
          <p className="text-slate-400">Generate AI-powered posts for your business</p>
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
            {searchParams.success && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-sm text-green-400">{searchParams.success}</p>
              </div>
            )}

            <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Generate Posts</CardTitle>
                <CardDescription className="text-slate-400">
                  Create AI-powered Google Business Profile posts tailored to your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={generatePosts}>
                  <Button
                    type="submit"
                    className="w-full bg-white text-slate-950 hover:bg-slate-200"
                  >
                    Generate 3 Posts
                  </Button>
                </form>
              </CardContent>
            </Card>

            {posts && posts.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Your Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
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
