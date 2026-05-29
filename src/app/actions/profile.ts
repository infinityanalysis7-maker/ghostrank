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

  redirect('/dashboard/business?success=' + encodeURIComponent('Profile saved successfully'))
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

  // Count posts (25 points max - assume 10+ posts = full points)
  const { count: postCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const postScore = Math.min((postCount || 0) / 10 * 25, 25)

  // Review response rate (25 points max - placeholder for now)
  const reviewScore = 0 // Will be calculated from reviews table later

  // Keyword power (25 points max - placeholder for now)
  const keywordScore = 0 // Will be calculated from keywords table later

  const totalScore = Math.round(profileScore + postScore + reviewScore + keywordScore)

  return {
    totalScore,
    profileScore: Math.round(profileScore),
    postScore: Math.round(postScore),
    reviewScore: Math.round(reviewScore),
    keywordScore: Math.round(keywordScore),
  }
}
