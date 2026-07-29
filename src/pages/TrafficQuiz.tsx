import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, RotateCcw, Brain, Trophy, CheckCircle2, XCircle,
  Clock, ChevronRight, Award, Sparkles, Gauge,
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { TrafficSignIllustration } from '@/components/TrafficSignIllustration'
import { quizQuestions } from '@/data/trafficQuiz'
import { trafficSigns } from '@/data/trafficSigns'
import type { QuizDifficulty, QuizQuestion } from '@/types'
import { cn } from '@/utils/cn'

type Phase = 'start' | 'playing' | 'result'

interface AnswerRecord {
  question: QuizQuestion
  selectedIndex: number | null
  correct: boolean
}

const difficulties: { id: QuizDifficulty; label: string; description: string; color: string; tone: 'green' | 'amber' | 'red' }[] = [
  { id: 'easy', label: 'Easy', description: 'Basic signs and rules every driver should know.', color: 'bg-brand-100 text-brand-800', tone: 'green' },
  { id: 'medium', label: 'Medium', description: 'Roundabouts, overtaking, and intermediate rules.', color: 'bg-amber-100 text-amber-800', tone: 'amber' },
  { id: 'hard', label: 'Hard', description: 'Motorway rules, fine amounts, and edge cases.', color: 'bg-red-100 text-red-700', tone: 'red' },
]

const QUESTION_COUNT = 10

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getBadge(pct: number): { title: string; tone: 'green' | 'amber' | 'blue' | 'slate'; desc: string } {
  if (pct >= 90) return { title: 'Road Safety Champion', tone: 'green', desc: 'Outstanding! You have mastered road safety.' }
  if (pct >= 70) return { title: 'Traffic Expert', tone: 'blue', desc: 'Great work. You know the rules well.' }
  if (pct >= 50) return { title: 'Road Learner', tone: 'amber', desc: 'Good start. Review the signs and rules again.' }
  return { title: 'Beginner Driver', tone: 'slate', desc: 'Keep learning. Practice makes perfect.' }
}

export default function TrafficQuiz() {
  const [phase, setPhase] = useState<Phase>('start')
  const [difficulty, setDifficulty] = useState<QuizDifficulty | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)

  // Timer
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [running])

  const startQuiz = useCallback((diff: QuizDifficulty) => {
    const pool = quizQuestions.filter((q) => q.difficulty === diff)
    const picked = shuffle(pool).slice(0, Math.min(QUESTION_COUNT, pool.length))
    setDifficulty(diff)
    setQuestions(picked)
    setAnswers([])
    setCurrent(0)
    setSelected(null)
    setShowFeedback(false)
    setElapsed(0)
    setRunning(true)
    setPhase('playing')
  }, [])

  const submitAnswer = useCallback(() => {
    if (selected === null) return
    const q = questions[current]
    const correct = selected === q.correctIndex
    setAnswers((prev) => [...prev, { question: q, selectedIndex: selected, correct }])
    setShowFeedback(true)
  }, [selected, questions, current])

  const nextQuestion = useCallback(() => {
    if (current + 1 >= questions.length) {
      setRunning(false)
      setPhase('result')
      return
    }
    setCurrent((c) => c + 1)
    setSelected(null)
    setShowFeedback(false)
  }, [current, questions.length])

  const prevQuestion = useCallback(() => {
    if (current === 0) return
    // Allow going back only before submitting
    if (showFeedback) return
    setCurrent((c) => c - 1)
    setSelected(null)
    setShowFeedback(false)
  }, [current, showFeedback])

  const restart = useCallback(() => {
    setPhase('start')
    setDifficulty(null)
    setQuestions([])
    setAnswers([])
    setCurrent(0)
    setSelected(null)
    setShowFeedback(false)
    setElapsed(0)
    setRunning(false)
  }, [])

  const score = useMemo(() => answers.filter((a) => a.correct).length, [answers])
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0
  const incorrect = useMemo(() => answers.filter((a) => !a.correct), [answers])

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div>
      <PageHeader
        eyebrow="Traffic Awareness · Quiz"
        title="Test your road safety knowledge"
        description="Take an interactive quiz across three difficulty levels. Get a performance badge and review every incorrect answer with explanations."
        breadcrumbs={[
          { label: 'Traffic Awareness', to: '/traffic-awareness' },
          { label: 'Traffic Quiz' },
        ]}
      />

      <div className="container-page py-8 lg:py-10">
        <Link to="/traffic-awareness" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-pakistan-700 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Traffic Awareness
        </Link>

        {/* START */}
        {phase === 'start' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Brain className="h-8 w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Choose your difficulty</h2>
              <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
                Each quiz pulls {QUESTION_COUNT} random questions from the chosen level. You will see your score, a performance badge, and a full review of any mistakes at the end.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {difficulties.map((d) => (
                <button key={d.id} onClick={() => startQuiz(d.id)} className="text-left group">
                  <Card hover className="p-6 h-full">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl mb-4', d.color)}>
                      <Gauge className="h-6 w-6" />
                    </div>
                    <Badge tone={d.tone} className="mb-2">{d.label}</Badge>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{d.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-pakistan-700 group-hover:gap-2 transition-all">
                      Start <ArrowRight className="h-4 w-4" />
                    </span>
                  </Card>
                </button>
              ))}
            </div>

            <Alert variant="tip" className="mt-8" title="Tips for a better score">
              Read each question carefully. For sign-identification questions, look at the shape and colour first — they reveal the sign's category before you read the symbol.
            </Alert>
          </div>
        )}

        {/* PLAYING */}
        {phase === 'playing' && questions.length > 0 && (
          <div className="max-w-2xl mx-auto">
            {/* Top bar: progress + score + timer */}
            <div className="flex items-center justify-between mb-6">
              <Badge tone="violet">{difficulty ? difficulty[0].toUpperCase() + difficulty.slice(1) : ''}</Badge>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                  {score} correct
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {formatTime(elapsed)}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Question {current + 1} of {questions.length}</span>
                <span>{Math.round(((current + (showFeedback ? 1 : 0)) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pakistan-800 to-brand-600 transition-all duration-300"
                  style={{ width: `${((current + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question card */}
            <Card className="p-6 sm:p-8">
              {/* Sign identify question shows the illustration */}
              {questions[current].type === 'sign-identify' && questions[current].signId && (
                <div className="flex items-center justify-center h-40 mb-5 rounded-xl bg-slate-50">
                  <TrafficSignIllustration sign={trafficSigns.find((s) => s.id === questions[current].signId)!} size={120} />
                </div>
              )}

              <p className="text-xs font-semibold uppercase tracking-wide text-pakistan-700 mb-2">
                {questionTypeLabel(questions[current].type)}
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 leading-snug">
                {questions[current].question}
              </h3>

              <div className="space-y-3">
                {questions[current].options.map((opt, i) => {
                  const isSelected = selected === i
                  const isCorrect = i === questions[current].correctIndex
                  const showCorrect = showFeedback && isCorrect
                  const showWrong = showFeedback && isSelected && !isCorrect
                  return (
                    <button
                      key={i}
                      onClick={() => !showFeedback && setSelected(i)}
                      disabled={showFeedback}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all',
                        !showFeedback && isSelected && 'border-pakistan-700 bg-pakistan-50',
                        !showFeedback && !isSelected && 'border-slate-200 hover:border-pakistan-700 hover:bg-slate-50',
                        showCorrect && 'border-brand-600 bg-brand-50',
                        showWrong && 'border-red-300 bg-red-50',
                        showFeedback && !isCorrect && !isSelected && 'border-slate-200 opacity-60',
                      )}
                    >
                      <span className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold border transition-colors',
                        !showFeedback && isSelected && 'border-pakistan-700 bg-pakistan-900 text-white',
                        !showFeedback && !isSelected && 'border-slate-300 text-slate-500',
                        showCorrect && 'border-brand-600 bg-brand-600 text-white',
                        showWrong && 'border-red-500 bg-red-500 text-white',
                        showFeedback && !isCorrect && !isSelected && 'border-slate-200 text-slate-400',
                      )}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className={cn('flex-1 font-medium', showCorrect ? 'text-brand-900' : showWrong ? 'text-red-900' : 'text-slate-700')}>{opt}</span>
                      {showCorrect && <CheckCircle2 className="h-5 w-5 text-brand-600 shrink-0" />}
                      {showWrong && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={cn(
                  'mt-5 rounded-xl border p-4',
                  answers[answers.length - 1]?.correct ? 'bg-brand-50 border-brand-200' : 'bg-red-50 border-red-200',
                )}>
                  <p className={cn('flex items-center gap-2 font-semibold mb-1.5 text-sm', answers[answers.length - 1]?.correct ? 'text-brand-800' : 'text-red-800')}>
                    {answers[answers.length - 1]?.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    {answers[answers.length - 1]?.correct ? 'Correct!' : 'Not quite.'}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{questions[current].explanation}</p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={prevQuestion}
                  disabled={current === 0 || showFeedback}
                  className={cn((current === 0 || showFeedback) && 'opacity-40 pointer-events-none')}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                {!showFeedback ? (
                  <Button onClick={submitAnswer} disabled={selected === null} size="md">
                    Submit answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion} size="md">
                    {current + 1 >= questions.length ? 'See results' : 'Next question'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </Card>

            <div className="mt-6 text-center">
              <button onClick={restart} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-red-600 transition-colors">
                <RotateCcw className="h-3.5 w-3.5" />
                Quit quiz
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div className="max-w-3xl mx-auto">
            <ResultSummary
              score={score}
              total={questions.length}
              pct={pct}
              elapsed={elapsed}
              difficulty={difficulty}
              onRestart={restart}
            />

            {/* Incorrect review */}
            {incorrect.length > 0 ? (
              <div className="mt-10">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Review incorrect answers ({incorrect.length})
                </h3>
                <div className="space-y-4">
                  {incorrect.map((a, i) => (
                    <Card key={i} className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-pakistan-700 mb-1.5">
                        {questionTypeLabel(a.question.type)}
                      </p>
                      <p className="font-semibold text-slate-900 mb-3 leading-snug">{a.question.question}</p>
                      <div className="space-y-2">
                        {a.question.options.map((opt, j) => {
                          const isCorrect = j === a.question.correctIndex
                          const isChosen = j === a.selectedIndex
                          return (
                            <div
                              key={j}
                              className={cn(
                                'flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm',
                                isCorrect && 'border-brand-300 bg-brand-50 text-brand-900',
                                isChosen && !isCorrect && 'border-red-300 bg-red-50 text-red-900',
                                !isCorrect && !isChosen && 'border-slate-200 text-slate-500',
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border border-current opacity-70">
                                {String.fromCharCode(65 + j)}
                              </span>
                              <span className="flex-1">{opt}</span>
                              {isCorrect && <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />}
                              {isChosen && !isCorrect && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                            </div>
                          )
                        })}
                      </div>
                      <div className="mt-3 rounded-lg bg-slate-50 border border-slate-200 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Explanation</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{a.question.explanation}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-10">
                <Alert variant="success" title="Perfect score!">
                  You answered every question correctly. Try a harder difficulty or challenge a friend.
                </Alert>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={restart} size="lg">
                <RotateCcw className="h-5 w-5" />
                Take another quiz
              </Button>
              <Button to="/traffic-awareness/signs" variant="outline" size="lg">
                Review signs
              </Button>
              <Button to="/traffic-awareness/rules" variant="outline" size="lg">
                Review rules
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function questionTypeLabel(type: QuizQuestion['type']): string {
  switch (type) {
    case 'sign-identify': return 'Identify the Sign'
    case 'sign-meaning': return 'Sign Meaning'
    case 'driver-action': return 'Driver Action'
    case 'rule': return 'Traffic Rule'
    case 'fine': return 'Traffic Fine'
    default: return 'Question'
  }
}

function ResultSummary({
  score, total, pct, elapsed, difficulty, onRestart,
}: {
  score: number
  total: number
  pct: number
  elapsed: number
  difficulty: QuizDifficulty | null
  onRestart: () => void
}) {
  const badge = getBadge(pct)
  const wrong = total - score
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-pakistan-900 to-brand-700 p-8 sm:p-10 text-center text-white">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
          <Award className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-1">{badge.title}</h2>
        <p className="text-brand-100 text-sm">{badge.desc}</p>
      </div>
      <div className="p-6 sm:p-8">
        {/* Score ring */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
          <div className="relative h-32 w-32 flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none" stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 327} 327`}
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#01411C" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">{pct}%</p>
              <p className="text-xs text-slate-400 mt-0.5">Score</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <div className="rounded-xl bg-brand-50 border border-brand-200 p-3 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto text-brand-600 mb-1" />
              <p className="text-xl font-bold text-brand-900">{score}</p>
              <p className="text-xs text-brand-700">Correct</p>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-center">
              <XCircle className="h-5 w-5 mx-auto text-red-500 mb-1" />
              <p className="text-xl font-bold text-red-900">{wrong}</p>
              <p className="text-xs text-red-700">Wrong</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
              <Trophy className="h-5 w-5 mx-auto text-amber-500 mb-1" />
              <p className="text-xl font-bold text-slate-900">{total}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
              <Clock className="h-5 w-5 mx-auto text-slate-400 mb-1" />
              <p className="text-xl font-bold text-slate-900">{formatTime(elapsed)}</p>
              <p className="text-xs text-slate-500">Time</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4 text-violet-500" />
          Difficulty: <span className="font-semibold text-slate-700 capitalize">{difficulty}</span>
        </div>

        <div className="mt-6 text-center">
          <Button onClick={onRestart} variant="outline" size="md">
            <RotateCcw className="h-4 w-4" />
            Restart quiz
          </Button>
        </div>
      </div>
    </Card>
  )
}
