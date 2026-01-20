type BadgeProps = {
  icon: string
  label: string
}

export function Badge({ icon, label }: BadgeProps) {
  return (
    <span
      className='flex items-center gap-1.5 border border-slate-800 rounded-2xl
        bg-slate-900 px-3 py-1.5 text-sm text-slate-400'
    >
      <span>{icon}</span>
      {label}
    </span>
  )
}
