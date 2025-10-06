import { Outlet, Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '../theme/ThemeToggle'
import { MessageCircle, Settings } from 'lucide-react'

export function AppLayout() {
	const location = useLocation()
	return (
		<div className="h-full grid grid-rows-[auto,1fr]">
			<header className="border-b bg-white/70 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
				<div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
					<Link to="/" className="flex items-center gap-2 font-semibold">
						<MessageCircle className="h-5 w-5" /> Chat Application UI
					</Link>
					<nav className="ml-auto flex items-center gap-2">
						<Link to="/" className={`px-3 py-1.5 rounded-md text-sm ${location.pathname === '/' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Chat</Link>
						<Link to="/settings" className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1 ${location.pathname.startsWith('/settings') ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
							<Settings className="h-4 w-4" /> Settings
						</Link>
						<ThemeToggle />
					</nav>
				</div>
			</header>
			<main className="min-h-0">
				<Outlet />
			</main>
		</div>
	)
}



