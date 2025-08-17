import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client when environment variables are missing
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client that throws helpful errors when methods are called
    return {
      auth: {
        signUp: () => Promise.reject(new Error('Supabase not configured. Please click "Connect to Supabase" in the top right corner.')),
        signInWithPassword: () => Promise.reject(new Error('Supabase not configured. Please click "Connect to Supabase" in the top right corner.')),
        signOut: () => Promise.reject(new Error('Supabase not configured. Please click "Connect to Supabase" in the top right corner.')),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      },
      from: () => ({
        select: () => Promise.reject(new Error('Supabase not configured. Please click "Connect to Supabase" in the top right corner.')),
        insert: () => Promise.reject(new Error('Supabase not configured. Please click "Connect to Supabase" in the top right corner.')),
        update: () => Promise.reject(new Error('Supabase not configured. Please click "Connect to Supabase" in the top right corner.')),
        delete: () => Promise.reject(new Error('Supabase not configured. Please click "Connect to Supabase" in the top right corner.'))
      })
    } as any
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export const supabase = createSupabaseClient()