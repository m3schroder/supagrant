export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      integeration: {
        Row: {
          id: string
          user_id: string | null
          created_at: string | null
          title: string | null
          integration: string | null
          status: string | null
          access_token: string | null
          refresh_token: string | null
          expires_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          created_at?: string | null
          title?: string | null
          integration?: string | null
          status?: string | null
          access_token?: string | null
          refresh_token?: string | null
          expires_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          created_at?: string | null
          title?: string | null
          integration?: string | null
          status?: string | null
          access_token?: string | null
          refresh_token?: string | null
          expires_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
