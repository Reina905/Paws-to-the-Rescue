import { create } from 'zustand';
import { supabase } from '../services/supabaseAuth';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: true,
  role: null,
  // Flag to prevent GuestRoute redirect during signup flow
  isSigningUp: false,

  setIsSigningUp: (value) => set({ isSigningUp: value }),

  setSession: (session) => {
    const user = session?.user ?? null;
    const role = user?.user_metadata?.role ?? user?.app_metadata?.role ?? null;
    set({
      session,
      user,
      isAuthenticated: !!session,
      role,
      isLoading: false,
    });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, isAuthenticated: false, role: null, isLoading: false });
  },

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;
    const role = user?.user_metadata?.role ?? user?.app_metadata?.role ?? null;
    set({
      session,
      user,
      isAuthenticated: !!session,
      role,
      isLoading: false,
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      // Don't update auth state during signup to prevent premature redirect
      if (get().isSigningUp) return;

      const user = session?.user ?? null;
      const newRole = user?.user_metadata?.role ?? user?.app_metadata?.role ?? null;
      set({
        session,
        user,
        isAuthenticated: !!session,
        role: newRole || get().role, // preserve existing role if new session doesn't include it
        isLoading: false,
      });
    });
  },
}));
