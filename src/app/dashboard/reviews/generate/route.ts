import { generateReplies } from '../../../actions/posts'
import { redirect } from 'next/navigation'

export async function POST(request: Request) {
  const formData = await request.formData()
  const result = await generateReplies(formData)

  if (result.success) {
    // Store replies in a way that can be retrieved by the page
    // For now, we'll use a simple approach with URL params
    const repliesParam = encodeURIComponent(JSON.stringify(result.replies))
    redirect(`/dashboard/reviews?replies=${repliesParam}`)
  }

  redirect('/dashboard/reviews')
}
