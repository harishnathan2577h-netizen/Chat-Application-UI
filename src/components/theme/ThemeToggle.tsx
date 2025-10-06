import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
	const [dark, setDark] = useState(false)

	useEffect(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		const stored = localStorage.getItem('theme')
		const initial = stored ? stored === 'dark' : prefersDark
		setDark(initial)
		document.documentElement.classList.toggle('dark', initial)
	}, [])

	useEffect(() => {
		localStorage.setItem('theme', dark ? 'dark' : 'light')
		document.documentElement.classList.toggle('dark', dark)
	}, [dark])

	return (
		<button
			className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
			onClick={() => setDark(v => !v)}
			aria-label="Toggle theme"
		>
			{dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} 
			<span className="hidden sm:inline">{dark ? 'Dark' : 'Light'}</span>
		</button>
	)
}



