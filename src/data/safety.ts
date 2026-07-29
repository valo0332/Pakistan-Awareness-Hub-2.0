import type { SafetyTip, AwarenessItem } from '@/types'

export const safetyTips: SafetyTip[] = [
  {
    id: 'monsoon-driving',
    title: 'Safe Driving During Monsoon',
    category: 'Road Safety',
    icon: 'CloudRain',
    summary: 'Heavy rain reduces visibility and grip. Adjust your driving to stay safe on wet roads.',
    tips: [
      'Reduce speed and double your following distance.',
      'Turn on headlights, not hazard lights, in rain.',
      'Avoid driving through flooded underpasses.',
      'Check tyre tread and wiper blades before the season.',
    ],
  },
  {
    id: 'home-electrical',
    title: 'Home Electrical Safety',
    category: 'Home Safety',
    icon: 'Zap',
    summary: 'Faulty wiring is a leading cause of household fires. Simple habits prevent most accidents.',
    tips: [
      'Do not overload sockets with multiple high-wattage devices.',
      'Replace frayed cords and broken plugs immediately.',
      'Keep water away from electrical outlets and switches.',
      'Have a licensed electrician inspect wiring every few years.',
    ],
  },
  {
    id: 'extreme-heat',
    title: 'Surviving Extreme Heat',
    category: 'Health',
    icon: 'ThermometerSun',
    summary: 'Heatwaves are deadly. Hydration and timing your outdoor activity can prevent heatstroke.',
    tips: [
      'Drink water every hour, even without thirst.',
      'Avoid outdoor work between 11am and 4pm.',
      'Wear light, breathable clothing and a hat.',
      'Keep ORS sachets at home and at work.',
    ],
  },
]

export const awarenessItems: AwarenessItem[] = [
  {
    id: 'monsoon-2024-advisory',
    title: 'NDMA Issues Monsoon Advisory for Northern Pakistan',
    category: 'Weather Alert',
    date: '2024-07-18',
    icon: 'CloudRain',
    excerpt:
      'The National Disaster Management Authority has issued an advisory for heavy rainfall expected across northern districts. Citizens are urged to avoid travel near rivers and stay updated through official channels.',
    tag: 'Active',
  },
  {
    id: 'heatwave-karachi',
    title: 'Heatwave Alert for Karachi and Coastal Sindh',
    category: 'Weather Alert',
    date: '2024-06-22',
    icon: 'Sun',
    excerpt:
      'Temperatures may exceed 42°C in Karachi. Residents advised to stay hydrated, remain indoors during peak hours, and check on elderly neighbours.',
    tag: 'Advisory',
  },
  {
    id: 'traffic-sign-app',
    title: 'New Traffic Sign Recognition Added to AI Assistant',
    category: 'Platform Update',
    date: '2024-06-10',
    icon: 'Sparkles',
    excerpt:
      'You can now ask the AI Assistant to explain traffic signs. Upload or describe a sign and get instant guidance on its meaning and what action to take.',
    tag: 'New',
  },
  {
    id: 'first-aid-training',
    title: 'Free First Aid Awareness Sessions in Lahore',
    category: 'Community',
    date: '2024-05-28',
    icon: 'HeartPulse',
    excerpt:
      'Rescue 1122 is offering free community first aid sessions across Lahore. Learn CPR, bleeding control, and recovery position from trained responders.',
    tag: 'Event',
  },
  {
    id: 'earthquake-drill',
    title: 'National Earthquake Drill Scheduled for Schools',
    category: 'Preparedness',
    date: '2024-05-15',
    icon: 'Activity',
    excerpt:
      'Schools nationwide will participate in a coordinated earthquake drill. The "Drop, Cover, Hold On" practice helps students respond automatically when shaking begins.',
    tag: 'Event',
  },
  {
    id: 'road-safety-week',
    title: 'Road Safety Awareness Week Begins',
    category: 'Campaign',
    date: '2024-04-05',
    icon: 'CarFront',
    excerpt:
      'A week-long road safety campaign focuses on helmet use, seatbelts, and speed limits. Traffic police will run checkpoints and educational stops in major cities.',
    tag: 'Campaign',
  },
]
