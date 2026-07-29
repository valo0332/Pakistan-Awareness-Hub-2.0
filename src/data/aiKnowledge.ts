// Knowledge base for the AI Assistant's rule-based responses.

export interface AIResponse {
  keywords: string[]
  response: string
  followups?: string[]
}

export const aiResponses: AIResponse[] = [
  {
    keywords: ['earthquake', 'quake', 'tremor', 'shaking'],
    response:
      'During an earthquake, follow "Drop, Cover, Hold On":\n\n1. Drop to the ground immediately.\n2. Take cover under a sturdy desk or table.\n3. Hold on until the shaking stops.\n\nStay away from windows, mirrors, and exterior walls. If you are outdoors, move to an open area away from buildings and power lines. Do not use elevators. After the shaking stops, check for injuries and expect aftershocks.\n\nFor detailed guidance, visit the Disaster Guide and select Earthquake.',
    followups: ['What should I keep in an earthquake kit?', 'Emergency numbers in Pakistan'],
  },
  {
    keywords: ['flood', 'flooding', 'floodwater', 'monsoon'],
    response:
      'During a flood:\n\n1. Move to higher ground immediately if water is rising.\n2. Never walk or drive through floodwater — even 15 cm can knock you down.\n3. Turn off electricity, gas, and water at the mains if it is safe.\n4. Keep your phone charged and follow NDMA alerts.\n\nAfter the flood, boil drinking water, avoid contact with standing water, and wait for official clearance before returning home.\n\nRead more in the Disaster Guide under Flood.',
    followups: ['Flood safety tips', 'What is in an emergency kit?'],
  },
  {
    keywords: ['fire', 'burning', 'smoke', 'flames'],
    response:
      'If a fire breaks out:\n\n1. Get out immediately — do not stop for belongings.\n2. Stay low to avoid smoke inhalation.\n3. Feel doors with the back of your hand before opening.\n4. Call 16 (Fire Brigade) or 1122 once you are safely outside.\n5. If your clothes catch fire: Stop, Drop, and Roll.\n\nDo not re-enter the building until the fire department says it is safe. Install smoke detectors at home and keep a fire extinguisher in the kitchen.',
    followups: ['How do I treat a burn?', 'Emergency numbers in Pakistan'],
  },
  {
    keywords: ['heatwave', 'heat', 'hot weather', 'sunstroke', 'heatstroke'],
    response:
      'To stay safe during a heatwave:\n\n1. Drink water frequently, even if you are not thirsty.\n2. Stay indoors between 11am and 4pm.\n3. Wear loose, light-coloured clothing and a hat outdoors.\n4. Keep ORS sachets at home and at work.\n5. Check on elderly neighbours and young children.\n\nIf someone feels dizzy, confused, or stops sweating, move them to a cool place, sponge with water, and call 1122 immediately.',
    followups: ['What is in an emergency kit?', 'Emergency numbers in Pakistan'],
  },
  {
    keywords: ['landslide', 'mudslide', 'slope', 'mountain'],
    response:
      'If you are in a landslide-prone area:\n\n1. Watch for warning signs: cracks in the ground, tilting trees, or new springs.\n2. Move away from the path of a landslide quickly — uphill if possible.\n3. If you cannot escape, curl into a tight ball and protect your head.\n4. Avoid river valleys and low-lying areas.\n\nAfter a landslide, stay away from the area — more slides may follow. Report blocked roads to local authorities.',
    followups: ['Emergency numbers in Pakistan', 'What is in an emergency kit?'],
  },
  {
    keywords: ['cpr', 'cardiac', 'heart stopped', 'not breathing'],
    response:
      'CPR steps:\n\n1. Check responsiveness — tap and shout.\n2. If no response and not breathing normally, call 1122.\n3. Place the heel of your hand in the centre of the chest.\n4. Push down 5-6 cm at 100-120 compressions per minute.\n5. Give 30 compressions, then 2 rescue breaths.\n6. Continue until help arrives or the person recovers.\n\nSee the full illustrated guide on the First Aid page.',
    followups: ['How do I stop bleeding?', 'Recovery position guide'],
  },
  {
    keywords: ['bleeding', 'blood', 'wound', 'cut'],
    response:
      'To control severe bleeding:\n\n1. Apply firm direct pressure with a clean cloth.\n2. Add more cloth on top if it soaks through — do not remove the original.\n3. Elevate the wound above heart level if possible.\n4. Bandage firmly once bleeding slows.\n5. Call 1122 for severe or uncontrolled bleeding.\n\nDo not remove embedded objects — press around them instead.',
    followups: ['How do I treat a burn?', 'Recovery position guide'],
  },
  {
    keywords: ['burn', 'scald', 'thermal'],
    response:
      'For a burn:\n\n1. Move away from the heat source.\n2. Run cool (not ice-cold) water over the burn for 20 minutes.\n3. Remove rings or belts near the burn before swelling begins.\n4. Cover loosely with cling film or a clean cloth.\n5. Seek medical help for large, deep, or facial burns.\n\nNever apply toothpaste, butter, or ice to a burn.',
    followups: ['How do I stop bleeding?', 'Emergency numbers in Pakistan'],
  },
  {
    keywords: ['choking', 'heimlich', 'cannot breathe'],
    response:
      'If someone is choking:\n\n1. Ask "Are you choking?" If they cannot speak or cough, act.\n2. Give 5 firm back blows between the shoulder blades.\n3. Give 5 abdominal thrusts (Heimlich maneuver).\n4. Alternate until the object clears.\n5. If they become unconscious, call 1122 and start CPR.\n\nFor infants under 1 year, use chest thrusts instead of abdominal thrusts.',
    followups: ['How do I do CPR?', 'Emergency numbers in Pakistan'],
  },
  {
    keywords: ['emergency', 'number', 'contact', 'helpline', 'call'],
    response:
      'Key emergency numbers in Pakistan:\n\n• Police: 15\n• Rescue 1122: 1122\n• Edhi Ambulance: 115\n• Fire Brigade: 16\n• NDMA Helpline: 111-157-157\n\nFor the full list including provincial services, visit the Emergency Contacts page.',
    followups: ['What should I do during an earthquake?', 'Flood safety tips'],
  },
  {
    keywords: ['traffic', 'sign', 'road sign', 'drive'],
    response:
      'I can explain traffic signs. Pakistani road signs fall into four categories:\n\n• Warning Signs (yellow triangles) — e.g. slippery road, school zone\n• Regulatory Signs (red circles) — e.g. no entry, speed limit\n• Mandatory Signs (blue) — e.g. stop, give way\n• Information Signs (blue rectangles) — e.g. hospital, fuel station\n\nYou can describe a sign or browse the full library on the Traffic Awareness page. What sign would you like explained?',
    followups: ['Explain the stop sign', 'What does a slippery road sign mean?'],
  },
  {
    keywords: ['stop sign', 'stop'],
    response:
      'The Stop sign is an octagonal red sign with white text. It means you must come to a complete stop at the marked line, check for traffic in both directions, and proceed only when it is safe. Rolling stops are illegal and dangerous. Always stop fully, even if the road appears clear.',
    followups: ['What does a give way sign mean?', 'Explain speed limit signs'],
  },
  {
    keywords: ['give way', 'yield'],
    response:
      'The Give Way sign is an inverted red triangle. It means you must slow down and yield to traffic on the road you are joining. Unlike a Stop sign, you do not need to stop completely — but you must give way to any approaching vehicles and only enter when there is a safe gap.',
    followups: ['What does a stop sign mean?', 'Explain no entry signs'],
  },
  {
    keywords: ['slippery', 'skid'],
    response:
      'The Slippery Road sign is a yellow triangle showing a car skidding. It warns that the road ahead may be slippery, especially when wet. Slow down, increase your following distance, and avoid sudden braking or sharp turns.',
    followups: ['What should I do during a flood?', 'Safe driving tips'],
  },
  {
    keywords: ['speed limit', 'speed', 'how fast'],
    response:
      'Speed limit signs are red circles with the maximum speed in black (e.g. "60"). You must not exceed the posted limit. In Pakistan, common limits are 30 km/h near schools, 60 km/h on urban roads, and 100-120 km/h on motorways. Always reduce speed further in rain, fog, or heavy traffic.',
    followups: ['Explain no overtaking signs', 'Safe driving tips'],
  },
  {
    keywords: ['first aid', 'medical', 'help injured'],
    response:
      'The First Aid page covers six key emergencies:\n\n• CPR for cardiac arrest\n• Bleeding control for severe wounds\n• Burns treatment\n• Fractures (broken bones)\n• Choking\n• Recovery position for unconscious but breathing people\n\nWhich would you like guidance on? Remember, first aid supports — but never replaces — professional emergency services.',
    followups: ['How do I do CPR?', 'How do I stop bleeding?'],
  },
  {
    keywords: ['kit', 'prepare', 'emergency kit', 'supplies', 'checklist'],
    response:
      'A basic emergency kit should include:\n\n• Drinking water (4 litres per person per day)\n• Non-perishable food for 3-5 days\n• First aid kit and essential medicines\n• Torch, batteries, and a power bank\n• Waterproof copies of CNIC and documents\n• Cash in small denominations\n• Whistle, rope, and a multi-tool\n\nKeep the kit in a bag near an exit so you can grab it quickly. Check expiry dates every six months.',
    followups: ['What should I do during an earthquake?', 'Emergency numbers in Pakistan'],
  },
  {
    keywords: ['road safety', 'driving', 'drive safe'],
    response:
      'Key road safety practices in Pakistan:\n\n1. Always wear a seatbelt, and ensure passengers do too.\n2. Motorcyclists must wear a helmet — it reduces fatal head injuries by over 40%.\n3. Follow posted speed limits and reduce speed in rain.\n4. Never use a mobile phone while driving.\n5. Keep a safe following distance (3-second rule).\n6. Use indicators before turning or changing lanes.\n\nFor sign-by-sign guidance, browse the Traffic Awareness page.',
    followups: ['Explain traffic signs', 'What does a stop sign mean?'],
  },
  {
    keywords: ['recover', 'unconscious', 'recovery position'],
    response:
      'The recovery position keeps an unconscious but breathing person\'s airway open:\n\n1. Confirm the person is breathing normally.\n2. Place the nearest arm at a right angle to the body.\n3. Bring the far arm across so the back of the hand rests against the near cheek.\n4. Bend the far knee to a right angle.\n5. Gently roll them toward you, keeping the hand under the cheek.\n6. Tilt the head back to keep the airway open. Stay with them and call 1122.\n\nDo not move someone with a suspected spinal injury unless they are in danger.',
    followups: ['How do I do CPR?', 'Emergency numbers in Pakistan'],
  },
  {
    keywords: ['fracture', 'broken bone', 'break'],
    response:
      'For a suspected fracture:\n\n1. Keep the person still and do not move the injured limb.\n2. Control any bleeding by pressing around the wound.\n3. Immobilize the area with a splint or padding.\n4. Apply a wrapped ice pack near (not on) the injury to reduce swelling.\n5. Call 1122 or transport carefully to hospital.\n\nNever try to straighten or push back a bone, and do not give food or drink in case surgery is needed.',
    followups: ['How do I stop bleeding?', 'Emergency numbers in Pakistan'],
  },
]

export const defaultResponse =
  'I can help with disaster preparedness, traffic signs, first aid, emergency contacts, and general safety in Pakistan. Try asking about earthquakes, floods, CPR, traffic signs, or emergency numbers. You can also pick one of the suggested questions below.'

export const defaultFollowups = [
  'What should I do during an earthquake?',
  'Emergency numbers in Pakistan',
  'Flood safety tips',
  'Explain this traffic sign.',
]

export function findResponse(input: string): { text: string; followups?: string[] } {
  const lower = input.toLowerCase()
  for (const item of aiResponses) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return { text: item.response, followups: item.followups }
    }
  }
  return { text: defaultResponse, followups: defaultFollowups }
}
