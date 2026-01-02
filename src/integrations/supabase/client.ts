// Local client replacement - no external dependencies
export const localClient = {
  auth: {
    signIn: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ error: null }),
    signUp: () => Promise.resolve({ error: null })
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: any) => ({
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
      }),
      then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null })
  }),
  rpc: (functionName: string, params?: any) => Promise.resolve({ data: 0, error: null }),
  channel: (channelName: string) => ({
    on: (event: string, filter: any, callback: Function) => ({
      subscribe: () => ({})
    }),
    subscribe: () => ({}),
    unsubscribe: () => ({})
  }),
  removeChannel: () => ({}),
  functions: {
    invoke: (functionName: string, options?: any) => Promise.resolve({ data: null, error: null })
  }
};

export const supabase = localClient;