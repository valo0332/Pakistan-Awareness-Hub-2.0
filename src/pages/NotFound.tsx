import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Compass } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 mb-6">
          <Compass className="h-10 w-10" />
        </div>
        <p className="font-mono text-6xl font-extrabold text-pakistan-900 mb-2">404</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
        <p className="text-slate-600 max-w-md mx-auto mb-8">
          The page you are looking for does not exist or may have moved. Let's get you back to safety.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button to="/"><Home className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} /> Back to home</Button>
          <Button to="/ai-assistant" variant="outline"><ArrowLeft className="h-4 w-4" /> Ask AI for help</Button>
        </div>
      </div>
    </div>
  )
}
