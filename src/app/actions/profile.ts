'use server'

import { supabase } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function saveProfile(formData: FormData) {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value

  if (!session) {
    redirect('/login')
  }

  const businessName = formData.get('businessName') as string
  const category = formData.get('category') as string
  const address = formData.get('address') as string
  const city = formData.get('city') as string
  const phone = formData.get('phone') as string
  const website = formData.get('website') as string
  const gbpLink = formData.get('gbpLink') as string

  // Get user from session
  const { data: { user }, error: userError } = await supabase.auth.getUser(session)

  if (userError || !user) {
    redirect('/login')
  }

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const profileData = {
    user_id: user.id,
    business_name: businessName,
    category,
    address,
    city,
    phone,
    website,
    gbp_link: gbpLink,
    updated_at: new Date().toISOString(),
  }

  let error

  if (existingProfile) {
    // Update existing profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', existingProfile.id)
    error = updateError
  } else {
    // Insert new profile
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({ ...profileData, created_at: new Date().toISOString() })
    error = insertError
  }

  if (error) {
    redirect('/dashboard/business?error=' + encodeURIComponent(error.message))
  }

  redirect('/dashboard/business?success=' + encodeURIComponent('Profile saved! Your Ghost Score has been updated.'))
}

export async function getProfile(session: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser(session)

  if (userError || !user) {
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return profile
}

export async function calculateScore(session: string) {
  const { data: { user }, error: userError } = await supabase.auth.getUser(session)

  if (userError || !user) {
    return null
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Calculate profile completeness (25 points max)
  let profileScore = 0
  if (profile) {
    const fields = ['business_name', 'category', 'address', 'city', 'phone', 'website', 'gbp_link']
    const filledFields = fields.filter(field => profile[field]).length
    profileScore = (filledFields / fields.length) * 25
  }

  // Count posts (25 points max: 0 posts = 0, 1-2 posts = 10, 3+ posts = 25)
  const { count: postCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  let postScore = 0
  const actualPostCount = postCount || 0
  if (actualPostCount === 0) {
    postScore = 0
  } else if (actualPostCount >= 1 && actualPostCount <= 2) {
    postScore = 10
  } else {
    postScore = 25
  }

  // Review response rate (25 points max: 0 replies = 0, 1-2 replies = 10, 3+ replies = 25)
  // For now, we'll track replies in the posts table as a simple counter
  // In a real implementation, you'd have a separate replies table
  const { data: postsWithReplies } = await supabase
    .from('posts')
    .select('has_replies')
    .eq('user_id', user.id)

  const replyCount = postsWithReplies?.filter(p => p.has_replies)?.length || 0

  let reviewScore = 0
  if (replyCount === 0) {
    reviewScore = 0
  } else if (replyCount >= 1 && replyCount <= 2) {
    reviewScore = 10
  } else {
    reviewScore = 25
  }

  // Keyword power (25 points max: all 3 fields filled = 25, 2 filled = 15, 1 filled = 5)
  let keywordScore = 0
  if (profile) {
    const keywordFields = ['business_name', 'category', 'city']
    const filledKeywordFields = keywordFields.filter(field => profile[field]).length
    if (filledKeywordFields === 3) {
      keywordScore = 25
    } else if (filledKeywordFields === 2) {
      keywordScore = 15
    } else if (filledKeywordFields === 1) {
      keywordScore = 5
    }
  }

  const totalScore = Math.round(profileScore + postScore + reviewScore + keywordScore)

  return {
    totalScore,
    profileScore: Math.round(profileScore),
    postScore: Math.round(postScore),
    reviewScore: Math.round(reviewScore),
    keywordScore: Math.round(keywordScore),
    postCount: actualPostCount,
    replyCount,
  }
}
