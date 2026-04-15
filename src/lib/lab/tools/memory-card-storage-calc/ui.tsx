'use client'

import { useMemo } from 'react'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToolSessionState } from '@/lib/lab/state/sessionToolState'
import { cn } from '@/utilities/ui'

type CapacityMode = 'decimal' | 'gib'

const BITRATE_PRESETS = [
  { id: 'custom', label: 'Custom', Mbps: null as number | null },
  { id: '1080-25', label: '1080p ~25 Mbps', Mbps: 25 },
  { id: '1080-50', label: '1080p high ~50 Mbps', Mbps: 50 },
  { id: 'hevc-80', label: '4K HEVC ~80 Mbps', Mbps: 80 },
  { id: '4k24-100', label: '4K24 ~100 Mbps', Mbps: 100 },
  { id: '4k30-150', label: '4K30 ~150 Mbps', Mbps: 150 },
  { id: '4k60-300', label: '4K60 ~300 Mbps', Mbps: 300 },
  { id: 'prores-880', label: 'ProRes 422 HQ-ish ~880 Mbps', Mbps: 880 },
] as const

type BitratePresetId = (typeof BITRATE_PRESETS)[number]['id']

function totalMegabitsOnCard(cardValue: number, mode: CapacityMode): number {
  if (mode === 'decimal') {
    return (cardValue * 1e9 * 8) / 1e6
  }
  return (cardValue * 1024 ** 3 * 8) / 1e6
}

/** Bytes recorded in one hour at this bitrate (decimal Mbps). */
function bytesPerHourAtBitrate(bitrateMbps: number): number {
  return (bitrateMbps * 1e6) / 8 * 3600
}

function storagePerHour(bitrateMbps: number, mode: CapacityMode): number {
  const bph = bytesPerHourAtBitrate(bitrateMbps)
  if (mode === 'decimal') {
    return bph / 1e9
  }
  return bph / 1024 ** 3
}

function formatMinutes(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return '0m'
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
}

function formatStorageRate(valuePerHour: number, unit: 'GB' | 'GiB'): string {
  if (!Number.isFinite(valuePerHour) || valuePerHour <= 0) return '—'
  const suffix = `${unit}/h`
  if (valuePerHour >= 100) return `${valuePerHour.toFixed(0)} ${suffix}`
  if (valuePerHour >= 10) return `${valuePerHour.toFixed(1)} ${suffix}`
  return `${valuePerHour.toFixed(2)} ${suffix}`
}

/** `n` is total megabits (10⁶ bits each). */
function formatTotalMegabits(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return '—'
  const gbit = n / 1e3
  if (gbit >= 1000) return `${(gbit / 1e3).toFixed(2)} Tbit`
  if (gbit >= 1) return `${gbit.toFixed(1)} Gbit`
  return `${n.toFixed(0)} Mbit`
}

function clampReserve(raw: number): number {
  if (!Number.isFinite(raw)) return 0
  return Math.min(50, Math.max(0, raw))
}

export default function MemoryCardStorageCalcUi() {
  const [cardGb, setCardGb] = useToolSessionState('memory-card-storage-calc', 'cardGb', '128')
  const [bitrateMbps, setBitrateMbps] = useToolSessionState(
    'memory-card-storage-calc',
    'bitrateMbps',
    '150',
  )
  const [reservePercent, setReservePercent] = useToolSessionState(
    'memory-card-storage-calc',
    'reservePercent',
    '10',
  )
  const [capacityMode, setCapacityMode] = useToolSessionState<CapacityMode>(
    'memory-card-storage-calc',
    'capacityMode',
    'decimal',
  )
  const [bitratePreset, setBitratePreset] = useToolSessionState<BitratePresetId>(
    'memory-card-storage-calc',
    'bitratePreset',
    'custom',
  )

  const estimate = useMemo(() => {
    const cardValue = Number(cardGb)
    const bitrate = Number(bitrateMbps)
    const reserve = clampReserve(Number(reservePercent))
    if (!Number.isFinite(cardValue) || cardValue <= 0 || !Number.isFinite(bitrate) || bitrate <= 0) {
      return null
    }

    const totalMegabits = totalMegabitsOnCard(cardValue, capacityMode)
    const rawMinutes = totalMegabits / bitrate / 60
    const usableMinutes = rawMinutes * (1 - reserve / 100)
    const ratePerHour = storagePerHour(bitrate, capacityMode)

    return {
      rawMinutes,
      usableMinutes,
      totalMegabits,
      reserveApplied: reserve,
      ratePerHour,
      rateUnit: capacityMode === 'decimal' ? ('GB' as const) : ('GiB' as const),
      bitrate,
    }
  }, [bitrateMbps, cardGb, capacityMode, reservePercent])

  const selectTriggerClass =
    'h-10 w-full rounded-sm border-border-subtle bg-page px-3 py-2 font-mono text-xs text-text-default'

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="font-mono text-[11px] text-text-muted">Card capacity</span>
          <Select
            value={capacityMode}
            onValueChange={(value) => setCapacityMode(value as CapacityMode)}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="decimal">GB (decimal, like card label)</SelectItem>
              <SelectItem value="gib">GiB (1024³ bytes)</SelectItem>
            </SelectContent>
          </Select>
        </label>
        <label className="space-y-1">
          <span className="font-mono text-[11px] text-text-muted">Typical bitrate</span>
          <Select
            value={bitratePreset}
            onValueChange={(value) => {
              const id = value as BitratePresetId
              setBitratePreset(id)
              const preset = BITRATE_PRESETS.find((p) => p.id === id)
              if (preset?.Mbps != null) {
                setBitrateMbps(String(preset.Mbps))
              }
            }}
          >
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BITRATE_PRESETS.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-1">
          <span className="font-mono text-[11px] text-text-muted">
            {capacityMode === 'decimal' ? 'Size (GB)' : 'Size (GiB)'}
          </span>
          <Input
            className="h-10 rounded-sm bg-page px-3 py-2 font-mono text-xs"
            value={cardGb}
            onChange={(event) => setCardGb(event.target.value)}
            inputMode="decimal"
          />
        </label>
        <label className="space-y-1">
          <span className="font-mono text-[11px] text-text-muted">Bitrate (Mbps)</span>
          <Input
            className="h-10 rounded-sm bg-page px-3 py-2 font-mono text-xs"
            value={bitrateMbps}
            onChange={(event) => {
              setBitrateMbps(event.target.value)
              setBitratePreset('custom')
            }}
            inputMode="decimal"
          />
        </label>
        <label className="space-y-1">
          <span className="font-mono text-[11px] text-text-muted">Reserve (0–50%)</span>
          <Input
            className="h-10 rounded-sm bg-page px-3 py-2 font-mono text-xs"
            value={reservePercent}
            onChange={(event) => setReservePercent(event.target.value)}
            inputMode="decimal"
          />
        </label>
      </div>

      <div
        className={cn(
          'rounded-sm border border-border-subtle bg-page p-6',
        )}
      >
        {estimate ? (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Usable recording time
              </p>
              <p
                className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-text-default"
                aria-live="polite"
              >
                {formatMinutes(estimate.usableMinutes)}
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                After{' '}
                <span className="font-mono tabular-nums text-text-default">
                  {estimate.reserveApplied}%
                </span>{' '}
                headroom · raw max{' '}
                <span className="font-mono tabular-nums text-text-default">
                  {formatMinutes(estimate.rawMinutes)}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-border-subtle pt-5 sm:grid-cols-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                  ~Data rate
                </p>
                <p className="mt-1 font-mono text-sm tabular-nums text-text-default">
                  {formatStorageRate(estimate.ratePerHour, estimate.rateUnit)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                  Bitrate
                </p>
                <p className="mt-1 font-mono text-sm tabular-nums text-text-default">
                  {estimate.bitrate.toLocaleString()} Mbps
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                  Capacity basis
                </p>
                <p className="mt-1 text-sm text-text-default">
                  {capacityMode === 'decimal' ? 'Decimal GB' : 'Binary GiB'}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
                  Total capacity
                </p>
                <p className="mt-1 font-mono text-xs tabular-nums leading-snug text-text-default">
                  {formatTotalMegabits(estimate.totalMegabits)}
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-text-muted">
              Mbps is treated as decimal megabits per second (10⁶). Presets are ballpark figures—actual
              bitrates vary by camera, codec, and profile.
            </p>
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            Enter a positive card size and bitrate to see the estimate.
          </p>
        )}
      </div>
    </div>
  )
}
