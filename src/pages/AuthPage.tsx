import { Link } from 'react-router-dom'

export function AuthPage() {
	return (
		<div className="min-h-full grid place-items-center p-4">
			<div className="w-full max-w-sm rounded-xl border p-6">
				<h1 className="text-xl font-semibold mb-1">Welcome back</h1>
				<p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Sign in to your account</p>
				<form className="space-y-3">
					<input type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2 bg-transparent" />
					<input type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2 bg-transparent" />
					<button type="button" className="w-full rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900 py-2">Sign In</button>
				</form>
				<p className="text-xs text-gray-600 dark:text-gray-400 mt-4">By continuing you agree to our terms.</p>
				<Link to="/" className="block text-center text-sm mt-4 underline">Continue as guest</Link>
			</div>
		</div>
	)
}



