import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUp, ArrowDown, Search, Receipt, Printer, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Alert } from '@/components/ui/Alert'
import { EmptyState } from '@/components/ui/State'
import { trafficFines, fineCategories, fineCategoryLabel, fineCategoryTone, vehicleColumns } from '@/data/trafficFines'
import type { TrafficFine, VehiclePenalty } from '@/types'
import { cn } from '@/utils/cn'

type SortKey = 'sr-asc' | 'sr-desc' | 'offence-asc' | 'offence-desc'
type CategoryFilter = 'all' | 'moving' | 'parking'

const sortOptions: { id: SortKey; label: string }[] = [
  { id: 'sr-asc', label: 'Sr. No.: Low to High' },
  { id: 'sr-desc', label: 'Sr. No.: High to Low' },
  { id: 'offence-asc', label: 'Violation: A → Z' },
  { id: 'offence-desc', label: 'Violation: Z → A' },
]

const PAGE_SIZE = 15

function formatPenalty(value: VehiclePenalty): string {
  if (value === null) return '—'
  return `Rs. ${value.toLocaleString()}`
}

function minPenalty(fine: TrafficFine): number {
  const vals = [fine.motorcycle, fine.motorcarJeep, fine.ltv, fine.htvPsv].filter((v): v is number => v !== null)
  return vals.length ? Math.min(...vals) : 0
}

export default function TrafficFines() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState<CategoryFilter>('all')
  const [sort, setSort] = useState<SortKey>('sr-asc')
  const [selected, setSelected] = useState<TrafficFine | null>(null)
  const [page, setPage] = useState(1)

  const tableRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const result = trafficFines.filter((f) => {
      const matchesCat = active === 'all' || f.category === active
      const matchesSearch =
        !q ||
        f.offence.toLowerCase().includes(q) ||
        String(f.srNo) === q ||
        (f.keywords ?? []).some((k) => k.toLowerCase().includes(q))
      return matchesCat && matchesSearch
    })

    result.sort((a, b) => {
      switch (sort) {
        case 'sr-asc': return a.srNo - b.srNo
        case 'sr-desc': return b.srNo - a.srNo
        case 'offence-asc': return a.offence.localeCompare(b.offence)
        case 'offence-desc': return b.offence.localeCompare(a.offence)
        default: return 0
      }
    })
    return result
  }, [search, active, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = useMemo(() => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE), [filtered, currentPage])

  useEffect(() => { setPage(1) }, [search, active, sort])

  const isSortedAsc = sort.endsWith('-asc')
  const offenceSortIcon = sort.startsWith('offence') ? (isSortedAsc ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />) : null

  const handlePrint = () => window.print()

  return (
    <div>
      <PageHeader
        eyebrow="Traffic Awareness · Fines"
        title="Official traffic fine codes"
        description="The complete schedule of traffic offences and penalties based on the Khyber Pakhtunkhwa Traffic Police. Search, filter, and sort to find any violation and its fine by vehicle type."
        breadcrumbs={[
          { label: 'Traffic Awareness', to: '/traffic-awareness' },
          { label: 'Traffic Fine Codes' },
        ]}
      />

      <div className="container-page py-8 lg:py-10">
        <Link to="/traffic-awareness" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-pakistan-700 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Traffic Awareness
        </Link>

        <Alert variant="info" className="mb-8 print:hidden" title="About these fine codes">
          The amounts shown are reproduced exactly from the official Khyber Pakhtunkhwa Traffic Police schedule of offences. Fines in other provinces may differ. Always check with your local traffic authority for the latest figures.
        </Alert>

        {/* Controls */}
        <div className="flex flex-col gap-3 mb-6 print:hidden">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" style={{ width: 18, height: 18 }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by violation name, code, or keyword..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-pakistan-900/10 focus:border-pakistan-700 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm shadow-sm focus:outline-none focus:ring-4 focus:ring-pakistan-900/10 focus:border-pakistan-700 transition-all"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm hover:border-pakistan-700 hover:text-pakistan-900 transition-all"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {fineCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id as CategoryFilter)}
                className={cn(
                  'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all',
                  active === cat.id
                    ? 'bg-pakistan-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-pakistan-700 hover:text-pakistan-900',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-5">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> {filtered.length === 1 ? 'violation' : 'violations'}
          {filtered.length > PAGE_SIZE && <span className="text-slate-400"> · page {currentPage} of {totalPages}</span>}
        </p>

        {filtered.length > 0 ? (
          <>
            {/* Desktop table */}
            <Card className="hidden lg:block overflow-hidden print:block">
              <div ref={tableRef} className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b border-slate-100 bg-slate-50/80 backdrop-blur">
                      <th className="px-4 py-3.5 text-left font-semibold text-slate-600 w-16">Sr. No.</th>
                      <th className="px-4 py-3.5 text-left font-semibold text-slate-600">
                        <button
                          onClick={() => setSort(isSortedAsc ? 'offence-desc' : 'offence-asc')}
                          className="inline-flex items-center gap-1 hover:text-pakistan-700"
                        >
                          Nature of Violation {offenceSortIcon}
                        </button>
                      </th>
                      {vehicleColumns.map((col) => (
                        <th key={col.key} className="px-4 py-3.5 text-right font-semibold text-slate-600 whitespace-nowrap">{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((fine) => (
                      <tr
                        key={fine.id}
                        onClick={() => setSelected(fine)}
                        className="border-b border-slate-50 last:border-0 cursor-pointer transition-colors hover:bg-slate-50/60"
                      >
                        <td className="px-4 py-3.5 font-mono text-xs font-semibold text-slate-500">{fine.srNo}</td>
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-slate-900 leading-snug">{fine.offence}</p>
                          {fine.note && <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{fine.note}</p>}
                        </td>
                        {vehicleColumns.map((col) => {
                          const v = fine[col.key]
                          return (
                            <td key={col.key} className={cn('px-4 py-3.5 text-right font-mono whitespace-nowrap', v === null ? 'text-slate-300' : 'text-slate-800', v !== null && 'font-semibold')}>
                              {formatPenalty(v)}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Mobile cards */}
            <div className="grid gap-4 lg:hidden print:hidden">
              {paged.map((fine) => (
                <button key={fine.id} onClick={() => setSelected(fine)} className="text-left">
                  <Card hover className="p-5 h-full">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <span className="font-mono text-xs font-semibold text-slate-400">#{fine.srNo}</span>
                      <Badge tone={fineCategoryTone[fine.category]}>{fineCategoryLabel[fine.category]}</Badge>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-3 leading-snug">{fine.offence}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {vehicleColumns.map((col) => {
                        const v = fine[col.key]
                        return (
                          <div key={col.key} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                            <span className="text-xs text-slate-500">{col.short}</span>
                            <span className={cn('font-mono font-semibold text-xs', v === null ? 'text-slate-300' : 'text-slate-800')}>{formatPenalty(v)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </Card>
                </button>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6 print:hidden">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-pakistan-700 hover:text-pakistan-900 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      'h-9 w-9 rounded-lg text-sm font-semibold transition-all',
                      p === currentPage ? 'bg-pakistan-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-pakistan-700 hover:text-pakistan-900',
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-pakistan-700 hover:text-pakistan-900 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={<Search className="h-7 w-7" />}
            title="No violations found"
            description="Try a different search term, category, or sort order."
            action={
              <button onClick={() => { setSearch(''); setActive('all'); setSort('sr-asc') }} className="text-sm font-semibold text-pakistan-700 hover:underline">
                Clear filters
              </button>
            }
          />
        )}

        {/* Source note */}
        <div className="mt-8 flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 p-4 print:hidden">
          <Receipt className="h-5 w-5 shrink-0 text-slate-400 mt-0.5" />
          <p className="text-sm text-slate-500 leading-relaxed">
            Fine amounts are reproduced from the official Khyber Pakhtunkhwa Traffic Police schedule of offences and penalties. For the most current figures, refer to your provincial traffic police authority.
          </p>
        </div>
      </div>

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Violation Details"
        className="max-w-2xl"
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-semibold text-slate-400">Sr. No. {selected.srNo}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">{selected.offence}</h3>
              </div>
              <Badge tone={fineCategoryTone[selected.category]}>{fineCategoryLabel[selected.category]}</Badge>
            </div>

            {/* Penalties by vehicle type */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Penalty by vehicle type</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {vehicleColumns.map((col) => {
                  const v = selected[col.key]
                  return (
                    <div key={col.key} className={cn('rounded-xl border p-3', v === null ? 'border-slate-100 bg-slate-50/50' : 'border-slate-200 bg-white')}>
                      <p className="text-xs text-slate-400">{col.label}</p>
                      <p className={cn('font-mono font-bold mt-1', v === null ? 'text-slate-300 text-sm' : 'text-slate-900 text-lg')}>{formatPenalty(v)}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Explanation */}
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <Info className="h-5 w-5 shrink-0 text-pakistan-600 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">About this offence</p>
                <p className="text-sm text-slate-600 leading-relaxed">{offenceExplanation(selected)}</p>
              </div>
            </div>

            {/* Notes */}
            {selected.note && (
              <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
                <Receipt className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">Official note</p>
                  <p className="text-sm text-amber-800 leading-relaxed">{selected.note}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs text-slate-400">Serial No.</p>
                <p className="font-mono font-semibold text-slate-800 mt-0.5">{selected.srNo}</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs text-slate-400">Category</p>
                <p className="font-semibold text-slate-800 mt-0.5">{fineCategoryLabel[selected.category]}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center pt-1">
              Minimum penalty for this offence: <span className="font-mono font-semibold text-slate-500">Rs. {minPenalty(selected).toLocaleString()}</span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

function offenceExplanation(fine: TrafficFine): string {
  const map: Record<string, string> = {
    'mv-1': 'Driving a vehicle faster than the legal speed limit set for that road or vehicle class.',
    'mv-2': 'Carrying more passengers than the permitted capacity in a public service vehicle.',
    'mv-3': 'Crossing against a traffic signal, whether controlled electronically or manually by a warden.',
    'mv-4': 'Loading a goods-carrying public transport vehicle beyond the allowed weight limits.',
    'mv-5': 'Overtaking another vehicle at a place where overtaking is not permitted.',
    'mv-6': 'Not giving way to a vehicle that has the legal right of way at an intersection or junction.',
    'mv-7': 'Blocking or failing to clear the path of an emergency vehicle such as an ambulance, fire engine or police vehicle.',
    'mv-8': 'Carrying goods that exceed the legally permitted dimensions for the vehicle.',
    'mv-9': 'Driving after dark without the required working headlights and lights.',
    'mv-10': 'Driving on the side of the road meant for oncoming traffic.',
    'mv-11': 'Disobeying traffic signals including amber flashing, red thinking or red light indications.',
    'mv-12': 'Crossing a railway track improperly or without the required caution.',
    'mv-13': 'Following another vehicle too closely or cutting in too sharply.',
    'mv-14': 'Driving a vehicle whose tinted or covered glass blocks visibility from inside.',
    'mv-15': 'Skipping ahead of a waiting line of traffic.',
    'mv-16': 'Not dipping the headlights when other traffic is approaching.',
    'mv-17': 'Driving against the permitted direction in a one-way street.',
    'mv-18': 'Using the turn indicator for a purpose other than indicating a turn.',
    'mv-19': 'Playing or engaging in activity at a place where it is prohibited.',
    'mv-20': 'Loading goods improperly or carrying improperly loaded goods.',
    'mv-21': 'Failing to observe the prescribed lighting hours for the vehicle.',
    'mv-22': 'Obstructing the normal flow of traffic.',
    'mv-23': 'Failing to observe and obey a slow-down sign.',
    'mv-24': 'Riding a motorcycle without wearing an approved safety helmet.',
    'mv-25': 'Failing to stop when required to for a school bus.',
    'mv-26': 'Making a turn at a place where turning is prohibited.',
    'mv-27': 'Failing to take the required precautions to protect a learner driver.',
    'mv-28': 'Not giving way to pedestrians at crossings or where required.',
    'mv-29': 'Driving in a reckless or negligent manner that endangers the public.',
    'mv-30': 'Driving a vehicle without holding a valid driving licence.',
    'mv-31': 'Driving a vehicle that has not been registered with the authorities.',
    'mv-32': 'Driving a motor vehicle that does not have the required insurance coverage.',
    'mv-33': 'Driving a transport vehicle without a speedometer or with a defective one.',
    'mv-34': 'Opening a vehicle door in a way that endangers others.',
    'mv-35': 'Turning from the wrong lane instead of the correct lane for that turn.',
    'mv-36': 'Using a lane improperly or not in accordance with the road markings.',
    'mv-37': 'Blowing the horn in a designated silence zone.',
    'mv-38': 'Making a U-turn improperly or where not allowed.',
    'mv-39': 'Refusing to produce a driving licence when asked by the authorities.',
    'mv-40': 'Failing to stop when required to do so by the traffic police.',
    'mv-41': 'Driving a vehicle without a valid fitness certificate.',
    'mv-42': 'Driving a vehicle that exceeds the prescribed weight limit.',
    'mv-43': 'Using a vehicle that is in an unsafe or mechanically unfit condition.',
    'mv-44': 'Using a pressure horn or musical horn that is not permitted.',
    'mv-45': 'Driving in violation of traffic law or rules in a way not covered by any other specific offence.',
    'mv-46': 'Driving a vehicle that emits excessive smoke.',
    'mv-47': 'Allowing a juvenile (under-age person) to drive a vehicle.',
    'mv-48': 'Using a mobile phone while driving.',
    'mv-49': 'Performing one-wheeling or a stunt on a motorcycle.',
    'mv-50': 'Repeating the same traffic violation.',
    'mv-51': 'Abetting or assisting another person in committing any of the above violations.',
    'mv-52': 'Driving a motor vehicle without the required route permit.',
    'mv-53': 'Repeating the violation of driving without a route permit (Sr. No. 52).',
    'mv-54': 'Repeating the overloading violation (Sr. No. 4).',
    'mv-55': 'Driving without fastening the seat belt.',
    'mv-56': 'Taking part in an unauthorized vehicle race.',
    'mv-57': 'Using an illegal number plate or driving without a number plate.',
    'mv-58': 'Charging extra fare from passengers beyond the authorised amount.',
    'mv-59': 'Driving at night on high beam or using dazzling or powerful lamps that blind other traffic.',
    'mv-60': 'Driving while mentally or physically unfit, or under the influence of drugs or alcohol.',
    'mv-61': 'Improper loading of goods that causes material or liquid to spill onto the road.',
    'mv-62': 'Carrying passengers or students outside the cabin of the vehicle.',
    'mv-63': 'Driving without the driver and front-seat passenger fastening their seat belts.',
    'mv-64': 'Driving with a child under twelve years of age on the front passenger seat.',
    'mv-65': 'Driving a transport vehicle with an expired route permit.',
    'mv-66': 'Driving a transport vehicle with an expired fitness certificate.',
    'mv-67': 'Leaving a vehicle in a dangerous position on the road.',
    'mv-68': 'Driving a vehicle while holding a disqualified driving licence.',
    'mv-69': 'Making illegal alterations or modifications to a vehicle.',
    'mv-70': 'Failing to stop the vehicle after being involved in an accident.',
    'mv-71': 'Taking or plying a vehicle without authority, such as without registration book, transfer deed or route permit.',
    'mv-72': 'Disobeying an order, causing obstruction, or refusing to give information to the authorities.',
    'mv-73': 'Causing noise pollution through illegal modification or alteration of a vehicle.',
    'pk-101': 'Parking a vehicle more than 0.5 metre away from the kerb.',
    'pk-102': 'Parking a vehicle on a footpath reserved for pedestrians.',
    'pk-103': 'Parking less than 0.5 metre from another parked car.',
    'pk-104': 'Parking on a zebra crossing meant for pedestrians.',
    'pk-105': 'Parking less than 0.3 metres from a fire hydrant.',
    'pk-106': 'Parking less than 10 metres from a stop sign.',
    'pk-107': 'Parking less than 10 metres from an intersection.',
    'pk-108': 'Parking in a designated no-parking zone.',
    'pk-109': 'Parking in front of an entrance to premises.',
    'pk-110': 'Parking at a bus stop.',
    'pk-111': 'Parking on a bridge.',
    'pk-112': 'Parking on a sidewalk.',
  }
  return map[fine.id] ?? 'This offence is part of the official Khyber Pakhtunkhwa Traffic Police schedule of penalties.'
}
