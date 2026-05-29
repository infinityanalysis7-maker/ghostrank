import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cookies } from 'next/headers'
import { saveProfile, getProfile } from '../../actions/profile'
import { supabase } from '@/lib/supabase'

const categories = [
  'Restaurant',
  'Plumber',
  'Dentist',
  'Electrician',
  'Roofer',
  'HVAC',
  'Auto Repair',
  'Salon',
  'Gym',
  'Real Estate',
  'Other',
]

export default async function BusinessPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string }
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get('sb-session')?.value || ''

  // Get user email from Supabase auth instead of raw session token
  let userEmail = 'Welcome back'
  if (session) {
    const { data: { user } } = await supabase.auth.getUser(session)
    if (user?.email) {
      userEmail = user.email
    }
  }

  const profile = await getProfile(session)

  return (
    <DashboardLayout userEmail={userEmail}>
      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-2">My Business</h1>
          <p className="text-slate-400">Manage your Google Business Profile</p>
        </div>

        <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Business Profile</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your business information to get started with GhostRank
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchParams.error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
                <p className="text-sm text-red-400">{searchParams.error}</p>
              </div>
            )}
            {searchParams.success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <p className="text-sm text-green-400">{searchParams.success}</p>
              </div>
            )}

            <form action={saveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm font-medium text-slate-300">
                    Business Name
                  </label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Your Business Name"
                    defaultValue={profile?.business_name || ''}
                    required
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium text-slate-300">
                    Category
                  </label>
                  <Select name="category" defaultValue={profile?.category || ''} required>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white focus:border-slate-500">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-white">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium text-slate-300">
                    Address
                  </label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main St"
                    defaultValue={profile?.address || ''}
                    required
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium text-slate-300">
                    City
                  </label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="New York"
                    defaultValue={profile?.city || ''}
                    required
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-300">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    defaultValue={profile?.phone || ''}
                    required
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="website" className="text-sm font-medium text-slate-300">
                    Website
                  </label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    defaultValue={profile?.website || ''}
                    required
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="gbpLink" className="text-sm font-medium text-slate-300">
                    Google Business Profile Link
                  </label>
                  <Input
                    id="gbpLink"
                    name="gbpLink"
                    type="url"
                    placeholder="https://maps.google.com/..."
                    defaultValue={profile?.gbp_link || ''}
                    required
                    className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-slate-950 hover:bg-slate-200"
              >
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
