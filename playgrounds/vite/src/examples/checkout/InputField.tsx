import { memo } from 'react'

type InputFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
}

export const InputField = memo(function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: InputFieldProps) {
  return (
    <div>
      <label className='mb-1 block text-sm text-slate-400'>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5
          text-slate-200 placeholder-slate-500 outline-none transition-all
          focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
      />
    </div>
  )
})
