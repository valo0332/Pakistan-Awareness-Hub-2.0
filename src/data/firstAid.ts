import type { FirstAidGuide } from '@/types'

export const firstAidGuides: FirstAidGuide[] = [
  {
    id: 'cpr',
    title: 'CPR (Cardiopulmonary Resuscitation)',
    category: 'Cardiac Emergency',
    icon: 'HeartPulse',
    color: '#dc2626',
    severity: 'critical',
    summary:
      'Used when someone is unresponsive and not breathing normally. CPR keeps blood flowing to vital organs until professional help arrives.',
    steps: [
      {
        title: 'Check responsiveness',
        detail: 'Tap the person and shout. If no response and not breathing normally, act immediately.',
      },
      {
        title: 'Call for help',
        detail: 'Call 1122 or ask someone nearby to call for an ambulance and an AED if available.',
        warning: true,
      },
      {
        title: 'Open the airway',
        detail: 'Tilt the head back gently and lift the chin to open the airway.',
      },
      {
        title: 'Give 30 chest compressions',
        detail: 'Place the heel of your hand in the centre of the chest. Push down 5-6 cm at 100-120 compressions per minute.',
        warning: true,
      },
      {
        title: 'Give 2 rescue breaths',
        detail: 'Pinch the nose, seal your mouth over theirs, and give 2 breaths. Watch for chest rise.',
      },
      {
        title: 'Continue cycles',
        detail: 'Repeat 30 compressions and 2 breaths until help arrives or the person starts breathing.',
      },
    ],
    warning: 'CPR should be performed only when the person is unresponsive and not breathing normally.',
    doNot: [
      'Do not stop compressions until help arrives unless the person recovers.',
      'Do not lean on the chest between compressions — allow full recoil.',
      'Do not perform CPR on someone breathing normally.',
    ],
  },
  {
    id: 'bleeding',
    title: 'Bleeding Control',
    category: 'Wound Care',
    icon: 'Droplet',
    color: '#dc2626',
    severity: 'critical',
    summary:
      'Severe bleeding can be life-threatening within minutes. Quick action to control blood loss is essential.',
    steps: [
      {
        title: 'Apply direct pressure',
        detail: 'Use a clean cloth or gauze and press firmly on the wound.',
        warning: true,
      },
      {
        title: 'Add more material if needed',
        detail: 'Do not remove soaked bandages — add more on top and keep pressing.',
      },
      {
        title: 'Elevate the wound',
        detail: 'If possible, raise the injured area above heart level to slow bleeding.',
      },
      {
        title: 'Apply a bandage',
        detail: 'Once bleeding slows, wrap firmly but not so tight as to cut off circulation.',
      },
      {
        title: 'Call for help',
        detail: 'For severe or uncontrolled bleeding, call 1122 immediately.',
        warning: true,
      },
    ],
    warning: 'Call emergency services for deep wounds, spurting blood, or bleeding that will not stop.',
    doNot: [
      'Do not remove an embedded object — press around it instead.',
      'Do not use a tourniquet unless trained and bleeding is life-threatening.',
      'Do not give the injured person food or drink.',
    ],
  },
  {
    id: 'burns',
    title: 'Burns',
    category: 'Skin Injury',
    icon: 'Flame',
    color: '#ea580c',
    severity: 'serious',
    summary:
      'Cooling a burn quickly reduces damage and pain. Severity depends on depth and area affected.',
    steps: [
      {
        title: 'Stop the burn source',
        detail: 'Move the person away from heat, flames, or chemicals.',
      },
      {
        title: 'Cool the burn',
        detail: 'Run cool (not ice-cold) water over the burn for 20 minutes.',
        warning: true,
      },
      {
        title: 'Remove tight items',
        detail: 'Remove rings, watches, or belts near the burn before swelling begins.',
      },
      {
        title: 'Cover loosely',
        detail: 'Use a clean, non-fluffy cloth or cling film to cover the burn.',
      },
      {
        title: 'Seek medical help',
        detail: 'For large, deep, or facial burns, go to hospital or call 1122.',
        warning: true,
      },
    ],
    warning: 'Do not apply toothpaste, butter, or ice to burns — these worsen injury.',
    doNot: [
      'Do not break blisters.',
      'Do not apply adhesive dressings directly to the burn.',
      'Do not remove clothing stuck to the burn.',
    ],
  },
  {
    id: 'fractures',
    title: 'Fractures',
    category: 'Bone Injury',
    icon: 'Bone',
    color: '#7c3aed',
    severity: 'serious',
    summary:
      'A fracture is a broken bone. Keep the limb still and supported to prevent further injury.',
    steps: [
      {
        title: 'Keep the person still',
        detail: 'Do not move the injured limb. Support it in the position found.',
      },
      {
        title: 'Control any bleeding',
        detail: 'Press around any open wound without moving the bone.',
      },
      {
        title: 'Immobilize the area',
        detail: 'Use a splint or padding to keep the limb from moving.',
      },
      {
        title: 'Apply cold pack',
        detail: 'Wrap an ice pack in cloth and place it near (not on) the injury to reduce swelling.',
      },
      {
        title: 'Get medical help',
        detail: 'Call 1122 or transport carefully to the nearest hospital.',
        warning: true,
      },
    ],
    warning: 'Do not try to straighten or push back a bone.',
    doNot: [
      'Do not move the person unless they are in danger.',
      'Do not give food or drink in case surgery is needed.',
      'Do not apply heat to a fresh fracture.',
    ],
  },
  {
    id: 'choking',
    title: 'Choking',
    category: 'Airway Emergency',
    icon: 'Wind',
    color: '#f59e0b',
    severity: 'critical',
    summary:
      'Choking blocks the airway and can be fatal within minutes. The Heimlich maneuver can dislodge the object.',
    steps: [
      {
        title: 'Assess the situation',
        detail: 'Ask "Are you choking?" If they cannot speak, cough, or breathe, act fast.',
      },
      {
        title: 'Give 5 back blows',
        detail: 'Lean the person forward and strike firmly between the shoulder blades.',
        warning: true,
      },
      {
        title: 'Give 5 abdominal thrusts',
        detail: 'Stand behind, place a fist above the navel, and pull inward and upward.',
        warning: true,
      },
      {
        title: 'Alternate',
        detail: 'Continue alternating 5 back blows and 5 abdominal thrusts.',
      },
      {
        title: 'Call for help',
        detail: 'If the person becomes unconscious, call 1122 and begin CPR.',
        warning: true,
      },
    ],
    warning: 'Abdominal thrusts are for adults and children over 1 year only.',
    doNot: [
      'Do not perform abdominal thrusts on infants under 1 year — use chest thrusts.',
      'Do not give water or food if the person is still choking.',
      'Do not interfere if the person can still cough strongly.',
    ],
  },
  {
    id: 'recovery-position',
    title: 'Recovery Position',
    category: 'Unconscious Person',
    icon: 'BedDouble',
    color: '#0ea5e9',
    severity: 'serious',
    summary:
      'Keeps an unconscious but breathing person\'s airway open and clear. Used after seizures, intoxication, or fainting.',
    steps: [
      {
        title: 'Check breathing',
        detail: 'Ensure the person is breathing normally before placing them.',
      },
      {
        title: 'Position the arms',
        detail: 'Place the nearest arm at a right angle to the body.',
      },
      {
        title: 'Bring the far arm across',
        detail: 'Place the back of their far hand against their near cheek.',
      },
      {
        title: 'Bend the far knee',
        detail: 'Pull the far knee up to a right angle.',
      },
      {
        title: 'Roll toward you',
        detail: 'Gently roll them onto their side, keeping the hand under the cheek. Tilt the head back to keep the airway open.',
        warning: true,
      },
      {
        title: 'Monitor and call for help',
        detail: 'Stay with them and call 1122 if not already done.',
        warning: true,
      },
    ],
    warning: 'Only use the recovery position if the person is breathing and has no spinal injury.',
    doNot: [
      'Do not move someone with a suspected spinal injury unless they are vomiting or in danger.',
      'Do not leave the person unattended.',
    ],
  },
]
