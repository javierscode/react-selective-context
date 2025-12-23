type StatCardProps = {
  label: string
  value: number
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className='rounded border border-slate-800 bg-slate-900 p-4 text-center'>
      <div className='text-2xl font-bold text-slate-200'>{value}</div>
      <div className='text-xs uppercase tracking-wide text-slate-500'>{label}</div>
    </div>
  )
}
