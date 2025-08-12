export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      emprestimos: {
        Row: {
          cliente_cnpj: string
          cliente_nome: string
          created_at: string
          danfe_emprestimo: string | null
          data_emprestimo: string
          data_saida: string | null
          desc_produto_emprestado: string | null
          id: string
          id_importacao_direta: string | null
          numero_processo: string
          observacoes: string | null
          ref_produto_emprestado: string
          updated_at: string
          valor_emprestimo_dolar: number
        }
        Insert: {
          cliente_cnpj: string
          cliente_nome: string
          created_at?: string
          danfe_emprestimo?: string | null
          data_emprestimo: string
          data_saida?: string | null
          desc_produto_emprestado?: string | null
          id?: string
          id_importacao_direta?: string | null
          numero_processo?: string
          observacoes?: string | null
          ref_produto_emprestado: string
          updated_at?: string
          valor_emprestimo_dolar: number
        }
        Update: {
          cliente_cnpj?: string
          cliente_nome?: string
          created_at?: string
          danfe_emprestimo?: string | null
          data_emprestimo?: string
          data_saida?: string | null
          desc_produto_emprestado?: string | null
          id?: string
          id_importacao_direta?: string | null
          numero_processo?: string
          observacoes?: string | null
          ref_produto_emprestado?: string
          updated_at?: string
          valor_emprestimo_dolar?: number
        }
        Relationships: []
      }
      emprestimos_devolucoes: {
        Row: {
          created_at: string
          danfe_retorno: string | null
          data_baixa: string | null
          data_retorno: string
          desc_produto_recebido: string | null
          emprestimo_id: string
          id: string
          observacoes: string | null
          ref_produto_recebido: string
          valor_retornado_dolar: number
        }
        Insert: {
          created_at?: string
          danfe_retorno?: string | null
          data_baixa?: string | null
          data_retorno: string
          desc_produto_recebido?: string | null
          emprestimo_id: string
          id?: string
          observacoes?: string | null
          ref_produto_recebido: string
          valor_retornado_dolar: number
        }
        Update: {
          created_at?: string
          danfe_retorno?: string | null
          data_baixa?: string | null
          data_retorno?: string
          desc_produto_recebido?: string | null
          emprestimo_id?: string
          id?: string
          observacoes?: string | null
          ref_produto_recebido?: string
          valor_retornado_dolar?: number
        }
        Relationships: [
          {
            foreignKeyName: "emprestimos_devolucoes_emprestimo_id_fkey"
            columns: ["emprestimo_id"]
            isOneToOne: false
            referencedRelation: "emprestimos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emprestimos_devolucoes_emprestimo_id_fkey"
            columns: ["emprestimo_id"]
            isOneToOne: false
            referencedRelation: "emprestimos_resumo"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      emprestimos_resumo: {
        Row: {
          cliente_cnpj: string | null
          cliente_nome: string | null
          created_at: string | null
          danfe_emprestimo: string | null
          data_emprestimo: string | null
          data_saida: string | null
          desc_produto_emprestado: string | null
          id: string | null
          id_importacao_direta: string | null
          numero_processo: string | null
          observacoes: string | null
          ref_produto_emprestado: string | null
          saldo: number | null
          status: string | null
          total_retornado: number | null
          valor_emprestimo_dolar: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_numero_processo: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
