import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email?: string;
}

interface Session {
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Local auth - no external services
    setIsLoading(false);
  }, []);

  const checkAdminRole = async (userId: string) => {
    // Local admin check - always false for local mode
    setIsAdmin(false);
  };

  const signIn = async (email: string, password: string) => {
    // Local sign in - simulate success
    console.log('Local Auth: Sign in attempt for', email);
    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    // Local sign up - simulate success
    console.log('Local Auth: Sign up attempt for', email);
    return { error: null };
  };

  const signOut = async () => {
    // Local sign out
    console.log('Local Auth: Sign out');
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, isAdmin, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};