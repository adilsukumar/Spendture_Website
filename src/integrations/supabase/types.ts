// Local types - no external dependencies
export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
        };
        Update: {
          email?: string;
        };
      };
    };
  };
}