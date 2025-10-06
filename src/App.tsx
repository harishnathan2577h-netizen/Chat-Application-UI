import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ChatPage } from './pages/ChatPage'
import { SettingsPage } from './pages/SettingsPage'
import { AuthPage } from './pages/AuthPage'

export default function App() {
	return (
		<Routes>
			<Route element={<AppLayout />}> 
				<Route index element={<ChatPage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>
			<Route path="/auth" element={<AuthPage />} />
		</Routes>
	)
}



