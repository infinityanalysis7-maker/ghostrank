'use server'

import { supabase } from '@/lib/supabase'
import { callGemini } from '@/lib/gemini'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getProfile } from './profile'

export async function generatePosts() {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value

  if (!session) {
    redirect('/login')
  }

  const profile = await getProfile(session)

  if (!profile || !profile.category || !profile.city) {
    redirect('/dashboard/business?error=' + encodeURIComponent('Please complete your business profile first'))
  }

  const prompt = `Generate 3 Google Business Profile post ideas for a ${profile.category} in ${profile.city}. Each should be 2-3 sentences, include a call to action, and mention the city. Return as a numbered list.`

  try {
    const generatedText = await callGemini(prompt)

    // Parse the generated text into individual posts
    const posts = generatedText
      .split('\n')
      .filter(line => line.trim() && /^\d+\./.test(line.trim()))
      .map(line => line.replace(/^\d+\.\s*/, '').trim())

    // Save posts to Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser(session)

    if (userError || !user) {
      redirect('/login')
    }

    const savedPosts = []
    for (const post of posts) {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content: post,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (!error && data) {
        savedPosts.push(data)
      }
    }

    redirect('/dashboard/posts?success=' + encodeURIComponent('Posts generated successfully'))
  } catch (error) {
    redirect('/dashboard/posts?error=' + encodeURIComponent(error instanceof Error ? error.message : 'Failed to generate posts'))
  }
}

export async function getPosts(session: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser(session)

  if (userError || !user) {
    return []
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return posts || []
}

export async function generateReplies(formData: FormData) {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value

  if (!session) {
    redirect('/login')
  }

  const profile = await getProfile(session)

  if (!profile || !profile.category || !profile.city) {
    redirect('/dashboard/business?error=' + encodeURIComponent('Please complete your business profile first'))
  }

  const reviewText = formData.get('reviewText') as string
  const rating = formData.get('rating') as string

  if (!reviewText || !rating) {
    redirect('/dashboard/reviews?error=' + encodeURIComponent('Please provide review text and rating'))
  }

  const prompt = `A customer left this ${rating}-star review for a ${profile.category} in ${profile.city}: ${reviewText}. Write 3 professional, empathetic owner replies. Do not argue. Do not make excuses. Apologize for their bad experience. Offer to make it right. Keep each reply under 80 words. Label them: 1. Friendly & Warm, 2. Professional & Formal, 3. Short & Simple. Return as a numbered list with labels.`

  try {
    const generatedText = await callGemini(prompt)

    // Parse the generated text into individual replies
    const replies = generatedText
      .split('\n')
      .filter(line => line.trim() && /^\d+\./.test(line.trim()))
      .map(line => {
        const labelMatch = line.match(/^\d+\.\s*(.+?):\s*(.+)/)
        if (labelMatch) {
          return {
            label: labelMatch[1],
            text: labelMatch[2]
          }
        }
        // Fallback if label format doesn't match
        const text = line.replace(/^\d+\.\s*/, '').trim()
        return { label: 'Reply', text }
      })

    return { success: true, replies }
  } catch (error) {
    redirect('/dashboard/reviews?error=' + encodeURIComponent(error instanceof Error ? error.message : 'Failed to generate replies'))
  }
}
