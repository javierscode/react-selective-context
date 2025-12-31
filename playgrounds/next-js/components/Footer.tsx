export function Footer() {
  return (
    <footer className='mt-16 border-t border-slate-800 pt-8 text-center'>
      <p className='text-slate-500'>
        Built with{' '}
        <a
          href='https://github.com/javierscode/react-selective-context'
          className='text-slate-400 underline hover:text-slate-200'
          target='_blank'
          rel='noopener noreferrer'
        >
          react-selective-context
        </a>
      </p>
      <p className='mt-2 text-sm text-slate-600'>
        Powered by React Context + useSyncExternalStore
      </p>
    </footer>
  )
}

