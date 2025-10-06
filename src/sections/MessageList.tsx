import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/chatStore'

export function MessageList({ conversationId }: { conversationId: string | null }) {
	const messages = useChatStore(s => (conversationId ? s.messagesByConversation[conversationId] ?? [] : []))
	const typing = useChatStore(s => s.typingByConversation[conversationId ?? ''] ?? [])
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight })
	}, [messages.length, conversationId])

	return (
		<div ref={containerRef} className="p-4 space-y-3">
			{messages.map(m => (
				<div key={m.id} className={`max-w-[70%] rounded-xl px-3 py-2 ${m.isMine ? 'ml-auto bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
					<div className="text-sm whitespace-pre-wrap">{m.text}</div>
					<div className="text-[10px] mt-1 opacity-70">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{m.read ? ' · Read' : ''}</div>
				</div>
			))}
			{typing.length > 0 && (
				<div className="text-xs text-gray-500">{typing.join(', ')} typing…</div>
			)}
		</div>
	)
}


