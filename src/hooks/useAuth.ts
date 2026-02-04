import { useEffect, useState } from 'react';
import { Session } from '../../node_modules/@supabase/supabase-js';
import { authService } from '../services/auth.service';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = authService.onAuthStateChange(setSession);

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user ?? null,
    loading,
    isAuthenticated: !!session,
  };
}
