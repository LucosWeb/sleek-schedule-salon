export interface Database {
  public: {
    Tables: {
      barbeiros: {
        Row: {
          id: string
          nome: string
          diasDisponiveis: string[]
          horarios: {
            inicio: string
            fim: string
            tipo: 'trabalho' | 'almoco'
            diaSemana: string
          }[]
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          diasDisponiveis: string[]
          horarios: {
            inicio: string
            fim: string
            tipo: 'trabalho' | 'almoco'
            diaSemana: string
          }[]
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          diasDisponiveis?: string[]
          horarios?: {
            inicio: string
            fim: string
            tipo: 'trabalho' | 'almoco'
            diaSemana: string
          }[]
          created_at?: string
        }
      }
      servicos: {
        Row: {
          id: string
          nome: string
          preco: string
          duracao: string
          descricao: string
          created_at: string
        }
        Insert: {
          id?: string
          nome: string
          preco: string
          duracao: string
          descricao?: string
          created_at?: string
        }
        Update: {
          id?: string
          nome?: string
          preco?: string
          duracao?: string
          descricao?: string
          created_at?: string
        }
      }
      agendamentos: {
        Row: {
          id: string
          clientName: string
          clientEmail: string
          service: string
          barberId: string
          date: string
          status: 'Pendente' | 'Confirmado' | 'Cancelado'
          created_at: string
        }
        Insert: {
          id?: string
          clientName: string
          clientEmail: string
          service: string
          barberId: string
          date: string
          status?: 'Pendente' | 'Confirmado' | 'Cancelado'
          created_at?: string
        }
        Update: {
          id?: string
          clientName?: string
          clientEmail?: string
          service?: string
          barberId?: string
          date?: string
          status?: 'Pendente' | 'Confirmado' | 'Cancelado'
          created_at?: string
        }
      }
    }
  }
}