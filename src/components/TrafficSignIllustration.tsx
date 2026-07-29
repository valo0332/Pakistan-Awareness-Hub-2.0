import type { TrafficSign } from '@/types'

// Renders a flat, modern traffic sign illustration based on shape + symbol.
export function TrafficSignIllustration({ sign, size = 120 }: { sign: TrafficSign; size?: number }) {
  if (sign.imageUrl) {
    return (
      <img
        src={sign.imageUrl}
        alt={sign.title}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    )
  }
  const inner = size - 24
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={sign.title}>
      <SignShape shape={sign.shape} color={sign.color} size={size} inner={inner} />
      <SignSymbol symbol={sign.symbol} size={size} />
    </svg>
  )
}

function SignShape({ shape, color, size, inner }: { shape: TrafficSign['shape']; color: string; size: number; inner: number }) {
  const c = size / 2
  const r = inner / 2
  const triPoints = (c: number, r: number) => `${c},${c - r} ${c + r * 0.92},${c + r * 0.7} ${c - r * 0.92},${c + r * 0.7}`

  switch (shape) {
    case 'triangle':
      return (
        <g>
          <polygon points={triPoints(c, r)} fill={color === '#eab308' ? '#fde047' : color} stroke={color} strokeWidth={size * 0.035} strokeLinejoin="round" />
          <polygon points={triPoints(c, r - 5)} fill="none" stroke={color} strokeWidth={size * 0.022} strokeLinejoin="round" opacity={0.5} />
        </g>
      )
    case 'inverted-triangle':
      return (
        <g>
          <polygon points={`${c},${c + r} ${c + r * 0.92},${c - r * 0.7} ${c - r * 0.92},${c - r * 0.7}`} fill="white" stroke={color} strokeWidth={size * 0.04} strokeLinejoin="round" />
        </g>
      )
    case 'circle':
      return (
        <g>
          <circle cx={c} cy={c} r={r} fill="white" stroke={color} strokeWidth={size * 0.05} />
        </g>
      )
    case 'octagon':
      return (
        <g>
          <polygon
            points={octagonPoints(c, r)}
            fill={color}
            stroke="white"
            strokeWidth={size * 0.025}
            strokeLinejoin="round"
          />
        </g>
      )
    case 'rectangle':
      return (
        <g>
          <rect x={c - r} y={c - r * 0.62} width={inner} height={r * 1.24} rx={size * 0.04} fill={color === '#1d4ed8' ? '#3b82f6' : color} />
        </g>
      )
    case 'diamond':
      return (
        <g>
          <polygon points={`${c},${c - r} ${c + r},${c} ${c},${c + r} ${c - r},${c}`} fill={color === '#1d4ed8' ? '#3b82f6' : color} />
        </g>
      )
    default:
      return <circle cx={c} cy={c} r={r} fill={color} />
  }
}

function octagonPoints(c: number, r: number) {
  const k = r * 0.414
  return [
    `${c - k},${c - r}`, `${c + k},${c - r}`,
    `${c + r},${c - k}`, `${c + r},${c + k}`,
    `${c + k},${c + r}`, `${c - k},${c + r}`,
    `${c - r},${c + k}`, `${c - r},${c - k}`,
  ].join(' ')
}

function SignSymbol({ symbol, size }: { symbol: string; size: number }) {
  const c = size / 2
  const s = size * 0.22 // symbol scale
  const stroke = size * 0.045
  const common = { stroke: 'white', strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }

  switch (symbol) {
    case 'car-skid':
      return (
        <g>
          <path d={`M ${c - s} ${c + s * 0.3} q ${s * 0.5} ${-s * 0.8}, ${s * 1.5} ${-s * 0.5} q ${s * 0.4} ${s * 0.3}, ${s} ${s * 0.6}`} {...common} />
          <circle cx={c - s * 0.8} cy={c + s * 0.6} r={size * 0.04} fill="white" />
          <circle cx={c + s * 0.8} cy={c + s * 0.7} r={size * 0.04} fill="white" />
        </g>
      )
    case 'bend-right': {
      const rs = size * 0.28
      // Road curves: starts going down from top-center, sweeps right, arrowhead at end
      const sx = c - rs * 0.15
      const sy = c - rs * 1.1
      const ex = c + rs * 1.05
      const ey = c + rs * 0.3
      const ah = size * 0.07
      return (
        <g>
          <path
            d={`M ${sx} ${sy} C ${sx} ${c + rs * 0.1}, ${c - rs * 0.1} ${c + rs * 0.1}, ${ex} ${ey}`}
            {...common}
            strokeWidth={size * 0.06}
            stroke="black"
          />
          <path
            d={`M ${ex} ${ey} l ${ah * 0.5} ${-ah} l ${ah * 0.8} ${ah * 1.1} Z`}
            fill="black"
          />
        </g>
      )
    }
    case 'bend-left': {
      // Matches reference: thick curve from upper-right, sweeps down then hard left,
      // arrowhead pointing left at the bottom-left end
      const sw = size * 0.07
      const ah = size * 0.09
      // Start: upper-right inside triangle
      const sx = c + size * 0.14
      const sy = c - size * 0.18
      // Control point 1: pull downward
      const cp1x = c + size * 0.14
      const cp1y = c + size * 0.18
      // Control point 2: sweep hard left at bottom
      const cp2x = c - size * 0.05
      const cp2y = c + size * 0.26
      // End: lower-left, arrowhead points left
      const ex = c - size * 0.18
      const ey = c + size * 0.22
      return (
        <g>
          <path
            d={`M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`}
            stroke="black"
            strokeWidth={sw}
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrowhead pointing left */}
          <path
            d={`M ${ex} ${ey} l ${ah * 0.7} ${-ah * 0.45} l ${0} ${ah * 0.9} Z`}
            fill="black"
          />
        </g>
      )
    }
    case 'pedestrian':
      return (
        <g {...common}>
          <circle cx={c} cy={c - s * 0.7} r={size * 0.06} fill="white" />
          <path d={`M ${c} ${c - s * 0.4} L ${c} ${c + s * 0.1} L ${c - s * 0.3} ${c + s * 0.7}`} />
          <path d={`M ${c} ${c + s * 0.1} L ${c + s * 0.35} ${c + s * 0.5}`} />
        </g>
      )
    case 'school':
      return (
        <g {...common}>
          <path d={`M ${c - s} ${c + s * 0.6} L ${c - s} ${c - s * 0.2} L ${c} ${c - s * 0.6} L ${c + s} ${c - s * 0.2} L ${c + s} ${c + s * 0.6} Z`} />
          <path d={`M ${c - s * 0.3} ${c + s * 0.6} L ${c - s * 0.3} ${c + s * 0.1}`} />
          <path d={`M ${c + s * 0.3} ${c + s * 0.6} L ${c + s * 0.3} ${c + s * 0.1}`} />
        </g>
      )
    case 'roundabout': {
      // Circular arrow going counter-clockwise (as per Pakistan roundabout sign)
      const r2 = size * 0.22   // outer arc radius
      const sw = size * 0.055  // arc stroke width
      const ah = size * 0.09   // arrowhead size
      // Arc: start at top-right (c+r2, c), sweep ~300deg counter-clockwise
      const ax = c + r2
      const ay = c
      // End point ~60deg from start (leaving gap for arrowhead), counter-clockwise
      const endAngle = -Math.PI / 3   // 60deg offset from 0 (right), going CCW
      const ex = c + r2 * Math.cos(endAngle)
      const ey = c + r2 * Math.sin(endAngle)
      return (
        <g>
          {/* Circular arc (large-arc, counter-clockwise) */}
          <path
            d={`M ${ax} ${ay} A ${r2} ${r2} 0 1 0 ${ex} ${ey}`}
            stroke="white"
            strokeWidth={sw}
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrowhead at end of arc, tangent direction */}
          <path
            d={`M ${ex} ${ey} l ${-ah * 0.55} ${-ah * 0.85} l ${ah} ${ah * 0.05} Z`}
            fill="white"
          />
          {/* Small centre island dot */}
          <circle cx={c} cy={c} r={size * 0.06} fill="white" />
        </g>
      )
    }
    case 'no-entry':
      return <rect x={c - s * 0.5} y={c - s * 0.5} width={s} height={s} fill="white" />
    case 'no-overtaking':
      return (
        <g>
          <path d={`M ${c - s * 0.7} ${c - s * 0.3} L ${c - s * 0.7} ${c + s * 0.3}`} {...common} stroke="black" />
          <path d={`M ${c + s * 0.7} ${c - s * 0.3} L ${c + s * 0.7} ${c + s * 0.3}`} {...common} stroke="black" />
          <path d={`M ${c - s * 0.9} ${c} L ${c + s * 0.9} ${c}`} stroke="#dc2626" strokeWidth={stroke * 1.4} strokeLinecap="round" />
        </g>
      )
    case 'speed-40':
      return <text x={c} y={c + size * 0.08} textAnchor="middle" fontSize={size * 0.26} fontWeight="800" fill="black" fontFamily="system-ui">40</text>
    case 'speed-60':
      return <text x={c} y={c + size * 0.08} textAnchor="middle" fontSize={size * 0.26} fontWeight="800" fill="black" fontFamily="system-ui">60</text>
    case 'speed-80':
      return <text x={c} y={c + size * 0.08} textAnchor="middle" fontSize={size * 0.26} fontWeight="800" fill="black" fontFamily="system-ui">80</text>
    case 'speed-100':
      return <text x={c} y={c + size * 0.08} textAnchor="middle" fontSize={size * 0.26} fontWeight="800" fill="black" fontFamily="system-ui">100</text>
    case 'minimum-speed':
      return <text x={c} y={c + size * 0.08} textAnchor="middle" fontSize={size * 0.24} fontWeight="800" fill="white" fontFamily="system-ui">40</text>
    case 'narrow-road':
      return (
        <g {...common} stroke="black">
          <path d={`M ${c - s} ${c - s * 0.5} L ${c - s * 0.3} ${c} L ${c - s} ${c + s * 0.5}`} />
          <path d={`M ${c + s} ${c - s * 0.5} L ${c + s * 0.3} ${c} L ${c + s} ${c + s * 0.5}`} />
        </g>
      )
    case 'hump':
      return (
        <g {...common} stroke="black">
          <path d={`M ${c - s} ${c + s * 0.3} Q ${c} ${c - s * 0.8} ${c + s} ${c + s * 0.3}`} />
        </g>
      )
    case 'men-at-work':
      return (
        <g {...common} stroke="black">
          <circle cx={c} cy={c - s * 0.55} r={size * 0.05} fill="black" />
          <path d={`M ${c} ${c - s * 0.4} L ${c} ${c + s * 0.1}`} />
          <path d={`M ${c} ${c - s * 0.1} L ${c - s * 0.4} ${c + s * 0.4}`} />
          <path d={`M ${c} ${c - s * 0.1} L ${c + s * 0.4} ${c + s * 0.4}`} />
          <path d={`M ${c - s * 0.5} ${c + s * 0.2} L ${c - s} ${c + s * 0.2} L ${c - s} ${c + s * 0.6} L ${c - s * 0.5} ${c + s * 0.6}`} fill="black" stroke="none" opacity={0.85} />
        </g>
      )
    case 'cattle':
      return (
        <g {...common} stroke="black">
          <path d={`M ${c - s * 0.9} ${c + s * 0.3} L ${c - s * 0.7} ${c + s * 0.1} L ${c - s * 0.2} ${c} L ${c + s * 0.4} ${c + s * 0.1} L ${c + s * 0.7} ${c + s * 0.3}`} />
          <path d={`M ${c + s * 0.7} ${c + s * 0.3} L ${c + s * 0.75} ${c - s * 0.15}`} />
          <path d={`M ${c - s * 0.8} ${c + s * 0.3} L ${c - s * 0.8} ${c + s * 0.6}`} />
          <path d={`M ${c - s * 0.3} ${c + s * 0.35} L ${c - s * 0.3} ${c + s * 0.6}`} />
          <path d={`M ${c + s * 0.3} ${c + s * 0.35} L ${c + s * 0.3} ${c + s * 0.6}`} />
          <path d={`M ${c + s * 0.65} ${c + s * 0.3} L ${c + s * 0.65} ${c + s * 0.6}`} />
        </g>
      )
    case 'falling-rocks':
      return (
        <g stroke="black" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" fill="black">
          <path d={`M ${c - s} ${c + s * 0.7} L ${c - s * 0.4} ${c - s * 0.8} L ${c + s * 0.3} ${c + s * 0.7} Z`} fill="none" />
          <circle cx={c - s * 0.2} cy={c - s * 0.1} r={size * 0.05} />
          <circle cx={c + s * 0.15} cy={c + s * 0.2} r={size * 0.04} />
          <circle cx={c - s * 0.45} cy={c + s * 0.35} r={size * 0.035} />
        </g>
      )
    case 't-junction':
      return (
        <g {...common} stroke="black" strokeWidth={stroke * 1.3}>
          <path d={`M ${c} ${c - s * 0.7} L ${c} ${c + s * 0.7}`} />
          <path d={`M ${c - s * 0.7} ${c + s * 0.3} L ${c + s * 0.7} ${c + s * 0.3}`} />
        </g>
      )
    case 'crossroads':
      return (
        <g {...common} stroke="black" strokeWidth={stroke * 1.3}>
          <path d={`M ${c} ${c - s * 0.7} L ${c} ${c + s * 0.7}`} />
          <path d={`M ${c - s * 0.7} ${c} L ${c + s * 0.7} ${c}`} />
        </g>
      )
    case 'steep-descent':
      return (
        <g {...common} stroke="black">
          <path d={`M ${c - s * 0.7} ${c - s * 0.4} L ${c + s * 0.7} ${c + s * 0.5}`} />
          <text x={c + s * 0.5} y={c - s * 0.05} textAnchor="middle" fontSize={size * 0.14} fontWeight="700" fill="black" fontFamily="system-ui">10%</text>
        </g>
      )
    case 'steep-ascent':
      return (
        <g {...common} stroke="black">
          <path d={`M ${c - s * 0.7} ${c + s * 0.5} L ${c + s * 0.7} ${c - s * 0.4}`} />
          <text x={c + s * 0.5} y={c + s * 0.25} textAnchor="middle" fontSize={size * 0.14} fontWeight="700" fill="black" fontFamily="system-ui">10%</text>
        </g>
      )
    case 'bridge':
      return (
        <g {...common} stroke="black">
          <path d={`M ${c - s * 0.9} ${c + s * 0.2} L ${c - s * 0.9} ${c - s * 0.2} L ${c + s * 0.9} ${c - s * 0.2} L ${c + s * 0.9} ${c + s * 0.2}`} />
          <path d={`M ${c - s * 0.5} ${c - s * 0.2} L ${c - s * 0.5} ${c + s * 0.5}`} />
          <path d={`M ${c + s * 0.5} ${c - s * 0.2} L ${c + s * 0.5} ${c + s * 0.5}`} />
        </g>
      )
    case 'no-parking':
      return (
        <g>
          <text x={c} y={c + size * 0.09} textAnchor="middle" fontSize={size * 0.3} fontWeight="800" fill="black" fontFamily="system-ui">P</text>
          <path d={`M ${c - s * 0.7} ${c + s * 0.7} L ${c + s * 0.7} ${c - s * 0.7}`} stroke="#dc2626" strokeWidth={stroke * 1.4} strokeLinecap="round" />
        </g>
      )
    case 'no-stopping':
      return (
        <g>
          <circle cx={c} cy={c} r={size * 0.04} fill="#dc2626" />
          <circle cx={c} cy={c} r={size * 0.22} fill="none" stroke="#dc2626" strokeWidth={size * 0.06} />
          <path d={`M ${c - s * 0.7} ${c + s * 0.7} L ${c + s * 0.7} ${c - s * 0.7}`} stroke="#dc2626" strokeWidth={stroke * 1.4} strokeLinecap="round" />
        </g>
      )
    case 'no-u-turn':
      return (
        <g>
          <path d={`M ${c - s * 0.6} ${c + s * 0.5} L ${c - s * 0.6} ${c - s * 0.1} Q ${c - s * 0.6} ${c - s * 0.6} ${c} ${c - s * 0.6} Q ${c + s * 0.6} ${c - s * 0.6} ${c + s * 0.6} ${c - s * 0.1} L ${c + s * 0.6} ${c + s * 0.5}`} fill="none" stroke="black" strokeWidth={stroke} strokeLinecap="round" />
          <path d={`M ${c + s * 0.45} ${c - s * 0.5} L ${c + s * 0.6} ${c - s * 0.1} L ${c + s * 0.75} ${c - s * 0.5} Z`} fill="black" />
          <path d={`M ${c - s * 0.7} ${c + s * 0.7} L ${c + s * 0.7} ${c - s * 0.7}`} stroke="#dc2626" strokeWidth={stroke * 1.4} strokeLinecap="round" />
        </g>
      )
    case 'no-left-turn':
      return (
        <g>
          <path d={`M ${c + s * 0.6} ${c - s * 0.5} L ${c + s * 0.6} ${c + s * 0.5} L ${c - s * 0.4} ${c + s * 0.5}`} fill="none" stroke="black" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M ${c - s * 0.55} ${c + s * 0.35} L ${c - s * 0.4} ${c + s * 0.5} L ${c - s * 0.55} ${c + s * 0.65} Z`} fill="black" />
          <path d={`M ${c - s * 0.7} ${c + s * 0.7} L ${c + s * 0.7} ${c - s * 0.7}`} stroke="#dc2626" strokeWidth={stroke * 1.4} strokeLinecap="round" />
        </g>
      )
    case 'no-right-turn':
      return (
        <g>
          <path d={`M ${c - s * 0.6} ${c - s * 0.5} L ${c - s * 0.6} ${c + s * 0.5} L ${c + s * 0.4} ${c + s * 0.5}`} fill="none" stroke="black" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M ${c + s * 0.55} ${c + s * 0.35} L ${c + s * 0.4} ${c + s * 0.5} L ${c + s * 0.55} ${c + s * 0.65} Z`} fill="black" />
          <path d={`M ${c - s * 0.7} ${c + s * 0.7} L ${c + s * 0.7} ${c - s * 0.7}`} stroke="#dc2626" strokeWidth={stroke * 1.4} strokeLinecap="round" />
        </g>
      )
    case 'keep-right':
      return (
        <g>
          <path d={`M ${c - s * 0.5} ${c - s * 0.6} L ${c + s * 0.2} ${c} L ${c - s * 0.5} ${c + s * 0.6}`} fill="white" />
        </g>
      )
    case 'roundabout-mandatory':
      return (
        <g>
          <circle cx={c} cy={c} r={size * 0.16} fill="none" stroke="white" strokeWidth={size * 0.06} />
          <path d={`M ${c + size * 0.16} ${c} A ${size * 0.16} ${size * 0.16} 0 1 0 ${c + size * 0.08} ${c - size * 0.14}`} stroke="white" strokeWidth={size * 0.06} strokeLinecap="round" fill="none" />
          <path d={`M ${c + size * 0.08} ${c - size * 0.14} l ${-size * 0.05} ${-size * 0.08} l ${size * 0.09} ${size * 0.005} Z`} fill="white" />
        </g>
      )
    case 'restaurant':
      return (
        <g {...common} stroke="white">
          <path d={`M ${c - s * 0.5} ${c - s * 0.6} L ${c - s * 0.5} ${c + s * 0.1}`} />
          <path d={`M ${c - s * 0.65} ${c - s * 0.6} L ${c - s * 0.65} ${c - s * 0.2} Q ${c - s * 0.65} ${c} ${c - s * 0.5} ${c}`} />
          <path d={`M ${c + s * 0.5} ${c - s * 0.6} L ${c + s * 0.5} ${c + s * 0.5}`} />
          <path d={`M ${c + s * 0.35} ${c - s * 0.6} L ${c + s * 0.35} ${c + s * 0.5}`} />
          <path d={`M ${c + s * 0.35} ${c - s * 0.6} L ${c + s * 0.5} ${c - s * 0.3} L ${c + s * 0.35} ${c}`} />
        </g>
      )
    case 'first-aid-post':
      return (
        <g>
          <rect x={c - s * 0.6} y={c - s * 0.6} width={s * 1.2} height={s * 1.2} rx={size * 0.04} fill="white" />
          <path d={`M ${c - s * 0.35} ${c} L ${c + s * 0.35} ${c}`} stroke="#dc2626" strokeWidth={s * 0.2} strokeLinecap="round" />
          <path d={`M ${c} ${c - s * 0.35} L ${c} ${c + s * 0.35}`} stroke="#dc2626" strokeWidth={s * 0.2} strokeLinecap="round" />
        </g>
      )
    case 'rest-area':
      return (
        <g {...common} stroke="white">
          <path d={`M ${c - s * 0.7} ${c + s * 0.5} q ${s * 0.7} ${-s * 0.9} ${s * 1.4} ${0} Z`} fill="white" stroke="none" />
          <path d={`M ${c - s * 0.15} ${c + s * 0.5} L ${c - s * 0.15} ${c + s * 0.7}`} />
          <path d={`M ${c + s * 0.15} ${c + s * 0.5} L ${c + s * 0.15} ${c + s * 0.7}`} />
        </g>
      )
    case 'no-horn':
      return (
        <g>
          <path d={`M ${c - s * 0.4} ${c - s * 0.3} L ${c + s * 0.3} ${c + s * 0.4} Z M ${c + s * 0.3} ${c - s * 0.3} L ${c - s * 0.4} ${c + s * 0.4} Z`} fill="black" />
          <path d={`M ${c - s * 0.55} ${c + s * 0.55} L ${c + s * 0.55} ${c - s * 0.55}`} stroke="#dc2626" strokeWidth={stroke * 1.4} strokeLinecap="round" />
        </g>
      )
    case 'stop':
      return <text x={c} y={c + size * 0.08} textAnchor="middle" fontSize={size * 0.2} fontWeight="800" fill="white" fontFamily="system-ui">STOP</text>
    case 'give-way':
      return <text x={c} y={c + size * 0.05} textAnchor="middle" fontSize={size * 0.1} fontWeight="700" fill="#dc2626" fontFamily="system-ui">GIVE WAY</text>
    case 'keep-left':
      return (
        <g>
          <path d={`M ${c + s * 0.5} ${c - s * 0.6} L ${c - s * 0.2} ${c} L ${c + s * 0.5} ${c + s * 0.6}`} fill="white" />
        </g>
      )
    case 'hospital':
      return (
        <g>
          <path d={`M ${c - s * 0.7} ${c} L ${c + s * 0.7} ${c}`} stroke="white" strokeWidth={s * 0.35} strokeLinecap="round" />
          <path d={`M ${c} ${c - s * 0.7} L ${c} ${c + s * 0.7}`} stroke="white" strokeWidth={s * 0.35} strokeLinecap="round" />
        </g>
      )
    case 'fuel':
      return (
        <g {...common}>
          <path d={`M ${c - s * 0.5} ${c - s * 0.5} L ${c + s * 0.3} ${c - s * 0.5} L ${c + s * 0.3} ${c + s * 0.5} L ${c - s * 0.5} ${c + s * 0.5} Z`} />
          <path d={`M ${c + s * 0.3} ${c - s * 0.2} L ${c + s * 0.6} ${c - s * 0.2} L ${c + s * 0.6} ${c + s * 0.2}`} />
        </g>
      )
    case 'parking':
      return <text x={c} y={c + size * 0.09} textAnchor="middle" fontSize={size * 0.3} fontWeight="800" fill="white" fontFamily="system-ui">P</text>
    case 'direction':
      return (
        <g {...common}>
          <path d={`M ${c - s * 0.6} ${c + s * 0.3} L ${c + s * 0.5} ${c + s * 0.3} L ${c + s * 0.5} ${c} L ${c + s * 0.8} ${c} L ${c + s * 0.5} ${c - s * 0.3}`} />
        </g>
      )
    default:
      return null
  }
}
