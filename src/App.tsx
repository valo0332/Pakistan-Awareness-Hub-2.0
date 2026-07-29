import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'
import { ScrollToTopOnNav } from '@/components/layout/ScrollToTopOnNav'
import Home from '@/pages/Home'
import AIAssistant from '@/pages/AIAssistant'
import TrafficAwareness from '@/pages/TrafficAwareness'
import TrafficSigns from '@/pages/TrafficSigns'
import TrafficSignDetail from '@/pages/TrafficSignDetail'
import TrafficRules from '@/pages/TrafficRules'
import TrafficFines from '@/pages/TrafficFines'
import TrafficQuiz from '@/pages/TrafficQuiz'
import DisasterGuide from '@/pages/DisasterGuide'
import DisasterDetail from '@/pages/DisasterDetail'
import FirstAid from '@/pages/FirstAid'
import FirstAidDetail from '@/pages/FirstAidDetail'
import EmergencyContacts from '@/pages/EmergencyContacts'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTopOnNav />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/traffic-awareness" element={<TrafficAwareness />} />
          <Route path="/traffic-awareness/signs" element={<TrafficSigns />} />
          <Route path="/traffic-awareness/signs/:id" element={<TrafficSignDetail />} />
          <Route path="/traffic-awareness/rules" element={<TrafficRules />} />
          <Route path="/traffic-awareness/fines" element={<TrafficFines />} />
          <Route path="/traffic-awareness/quiz" element={<TrafficQuiz />} />
          <Route path="/disaster-guide" element={<DisasterGuide />} />
          <Route path="/disaster-guide/:id" element={<DisasterDetail />} />
          <Route path="/first-aid" element={<FirstAid />} />
          <Route path="/first-aid/:id" element={<FirstAidDetail />} />
          <Route path="/emergency-contacts" element={<EmergencyContacts />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
