// Shared type definitions for Pakistan Awareness Hub

export interface TrafficSign {
  id: string
  title: string
  category: 'warning' | 'regulatory' | 'mandatory' | 'information'
  meaning: string
  action: string
  shape: 'triangle' | 'circle' | 'rectangle' | 'diamond' | 'octagon' | 'inverted-triangle'
  color: string
  symbol: string
  imageUrl?: string
  purpose?: string
  explanation?: string
  safetyTips?: string[]
  locations?: string[]
  keywords?: string[]
}

export interface DisasterPhase {
  before: string[]
  during: string[]
  after: string[]
}

export interface Disaster {
  id: string
  name: string
  shortName: string
  icon: string
  color: string
  description: string
  severity: 'high' | 'medium' | 'low'
  seasons: string[]
  regions: string[]
  phases: DisasterPhase
  checklist: string[]
  kit: string[]
  timeline: { phase: string; timeframe: string; actions: string[] }[]
}

export interface FirstAidGuide {
  id: string
  title: string
  category: string
  icon: string
  color: string
  severity: 'critical' | 'serious' | 'moderate'
  summary: string
  steps: { title: string; detail: string; warning?: boolean }[]
  warning?: string
  doNot: string[]
}

export interface EmergencyContact {
  id: string
  name: string
  number: string
  category: 'national' | 'provincial' | 'specialized'
  icon: string
  color: string
  description: string
  available: string
}

export interface SafetyTip {
  id: string
  title: string
  category: string
  icon: string
  summary: string
  tips: string[]
}

export interface AwarenessItem {
  id: string
  title: string
  category: string
  date: string
  icon: string
  excerpt: string
  tag: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface TrafficRule {
  id: string
  title: string
  icon: string
  summary: string
  rules: string[]
  penalty?: string
  keywords?: string[]
}

export type FineCategory = 'moving' | 'parking'

export type VehiclePenalty = number | null

export interface TrafficFine {
  id: string
  srNo: number
  offence: string
  category: FineCategory
  motorcycle: VehiclePenalty
  motorcarJeep: VehiclePenalty
  ltv: VehiclePenalty
  htvPsv: VehiclePenalty
  note?: string
  keywords?: string[]
}

export type QuizDifficulty = 'easy' | 'medium' | 'hard'
export type QuizQuestionType =
  | 'sign-identify'
  | 'sign-meaning'
  | 'driver-action'
  | 'rule'
  | 'fine'

export interface QuizQuestion {
  id: string
  type: QuizQuestionType
  difficulty: QuizDifficulty
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  signId?: string
}
