import { useChatStore } from '../store/chatStore'

export function ConversationList() {
	const conversations = useChatStore(s => s.conversations)
	const activeConversationId = useChatStore(s => s.activeConversationId)
	const setActiveConversation = useChatStore(s => s.setActiveConversation)

	return (
		<div className="p-2">
			<div className="px-2 py-2 text-xs uppercase tracking-wide text-gray-500">Conversations</div>
			<ul className="space-y-1">
				{conversations.map(c => (
					<li key={c.id}>
						<button
							className={`w-full text-left rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${activeConversationId === c.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
							onClick={() => setActiveConversation(c.id)}
						>
							<div className="font-medium">{c.title}</div>
							<div className="text-xs text-gray-500 truncate">{c.lastMessagePreview}</div>
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}



