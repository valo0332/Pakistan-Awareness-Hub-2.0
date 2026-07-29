import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Sparkles, Send, Paperclip, Bot, User, MessageSquarePlus,
  Trash2, History, ShieldCheck, AlertCircle,
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { findResponse, defaultFollowups } from '@/data/aiKnowledge'
import type { ChatMessage } from '@/types'
import { cn } from '@/utils/cn'

const welcomeMessage: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Assalam-o-Alaikum! I am your AI safety assistant for Pakistan. I can help you with disaster preparedness, traffic signs, first aid, emergency contacts, and general safety advice.\n\nWhat would you like to know? You can ask a question or pick a suggestion below.',
  timestamp: Date.now(),
}

const suggestedChips = [
  'What should I do during an earthquake?',
  'Explain this traffic sign.',
  'Emergency numbers in Pakistan',
  'Flood safety tips',
  'How do I perform CPR?',
  'What is in an emergency kit?',
]

interface Conversation {
  id: string
  title: string
  preview: string
  time: string
}

const sampleConversations: Conversation[] = [
  { id: 'c1', title: 'Earthquake safety', preview: 'What should I do during an earthquake?', time: '2m ago' },
  { id: 'c2', title: 'Flood preparedness', preview: 'Flood safety tips for my family', time: '1h ago' },
  { id: 'c3', title: 'Traffic signs', preview: 'What does a stop sign mean?', time: 'Yesterday' },
  { id: 'c4', title: 'CPR guide', preview: 'How do I perform CPR?', time: '2 days ago' },
]

export default function AIAssistant() {
  const [searchParams] = useSearchParams()
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [followups, setFollowups] = useState<string[]>(defaultFollowups)
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      sendQuestion(q)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const sendQuestion = (question: string) => {
    const q = question.trim()
    if (!q || isTyping) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setFollowups([])

    // History of prior turns sent to Gemini for conversational context.
    const history = messages
      .filter((m) => m.id !== 'welcome')
      .slice(-8)
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }))

    fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ message: q, history }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        const data = await res.json()
        if (!data || typeof data.reply !== 'string') throw new Error('Invalid response from server')
        return data.reply as string
      })
      .catch(() => {
        // Fallback to the local rule-based knowledge base if Gemini is unavailable.
        const { text } = findResponse(q)
        return text
      })
      .then((text) => {
        const aiMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: text,
          timestamp: Date.now(),
        }
        setMessages((prev) => [...prev, aiMsg])
        setIsTyping(false)
        setFollowups(defaultFollowups)

        setConversations((prev) => {
          if (prev[0]?.title === 'New conversation') return prev
          return [
            { id: `c-${Date.now()}`, title: q.slice(0, 30), preview: q, time: 'Just now' },
            ...prev.slice(0, 7),
          ]
        })
      })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendQuestion(input)
  }

  const newConversation = () => {
    setMessages([welcomeMessage])
    setFollowups(defaultFollowups)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <div>
      <PageHeader
        eyebrow="AI Assistant"
        title="Ask the AI Safety Assistant"
        description="Get instant, reliable answers about disasters, traffic signs, first aid, and emergency contacts across Pakistan."
        breadcrumbs={[{ label: 'AI Assistant' }]}
      >
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Badge tone="green" dot>Online</Badge>
          <Badge tone="slate"><ShieldCheck className="h-3.5 w-3.5" /> Educational guidance only</Badge>
        </div>
      </PageHeader>

      <div className="container-page py-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar - recent conversations */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <Button onClick={newConversation} className="w-full">
                <MessageSquarePlus className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                New conversation
              </Button>
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <History className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-700">Recent</span>
                </div>
                <div className="space-y-1">
                  {conversations.map((c) => (
                    <button
                      key={c.id}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors group"
                    >
                      <p className="text-sm font-medium text-slate-800 truncate group-hover:text-pakistan-900">{c.title}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{c.preview}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{c.time}</p>
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setConversations([])}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Clear history
              </button>
            </div>
          </aside>

          {/* Chat panel */}
          <div className="flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden h-[calc(100vh-280px)] min-h-[500px]">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pakistan-800 to-brand-600 text-white">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-brand-500 ring-2 ring-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Safety Assistant</p>
                  <p className="text-xs text-brand-600">AI-powered · responds in seconds</p>
                </div>
              </div>
              <button onClick={newConversation} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100" aria-label="New conversation">
                <MessageSquarePlus className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-6 py-6 space-y-5 bg-slate-50/50">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            {/* Suggested chips */}
            {followups.length > 0 && (
              <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-white">
                <div className="flex flex-wrap gap-2">
                  {followups.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendQuestion(chip)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm text-slate-700 hover:border-pakistan-700 hover:text-pakistan-900 hover:bg-pakistan-50 transition-all"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-brand-600" />
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-4 border-t border-slate-100 bg-white">
              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-pakistan-700 focus-within:ring-4 focus-within:ring-pakistan-900/10 transition-all">
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 hover:text-pakistan-700 hover:bg-white transition-colors"
                  aria-label="Upload image"
                  title="Upload image for analysis (coming soon)"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendQuestion(input)
                    }
                  }}
                  rows={1}
                  placeholder="Ask about safety, traffic signs, first aid..."
                  className="flex-1 resize-none bg-transparent py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none max-h-32"
                />
                <Button type="submit" size="sm" disabled={!input.trim() || isTyping} className="shrink-0">
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400 px-1">
                <AlertCircle className="h-3 w-3" />
                AI guidance is educational. In an emergency, always call 1122.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div className={cn('flex gap-3 animate-fade-up', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
        isUser ? 'bg-slate-200 text-slate-600' : 'bg-gradient-to-br from-pakistan-800 to-brand-600 text-white',
      )}>
        {isUser ? <User className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} /> : <Bot className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />}
      </div>
      <div className={cn('max-w-[80%] sm:max-w-[75%]', isUser && 'items-end')}>
        <div className={cn(
          'rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line',
          isUser
            ? 'bg-pakistan-900 text-white rounded-tr-md'
            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-md shadow-sm',
        )}>
          {message.content}
        </div>
        <p className={cn('mt-1 text-[10px] text-slate-400', isUser ? 'text-right' : 'text-left')}>
          {new Date(message.timestamp).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-up">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pakistan-800 to-brand-600 text-white">
        <Bot className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
      </div>
      <div className="rounded-2xl rounded-tl-md bg-white border border-slate-200 px-4 py-4 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-typing" style={{ animationDelay: '0s' }} />
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-typing" style={{ animationDelay: '0.2s' }} />
          <span className="h-2 w-2 rounded-full bg-brand-500 animate-typing" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}
