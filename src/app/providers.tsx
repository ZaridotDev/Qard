import { PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuth';

export function AppProviders({ children }: PropsWithChildren) {
  const auth = useAuth();

  if (auth.loading) {
    return null; // splash después
  }

  return children;
}
