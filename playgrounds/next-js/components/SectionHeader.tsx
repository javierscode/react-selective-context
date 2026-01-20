type SectionHeaderProps = {
  title: string
  description: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className='mb-6'>
      <h2 className='mb-2 text-2xl font-bold text-slate-100'>{title}</h2>
      <p className='text-slate-500'>{description}</p>
    </div>
  )
}
