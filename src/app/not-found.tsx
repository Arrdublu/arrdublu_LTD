import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4 font-display text-cyan-400">404</h2>
      <h1 className="text-2xl mb-6 font-sans">Page Not Found</h1>
      <p className="text-slate-400 max-w-md mb-8 font-sans">
        The specified link is broken or the page has been removed.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors font-sans"
      >
        Return Home
      </Link>
    </div>
  )
}
