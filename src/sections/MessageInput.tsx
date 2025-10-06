import { useState } from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useChatStore } from '../store/chatStore'
import { Smile, Send } from 'lucide-react'

export function MessageInput({ conversationId }: { conversationId: string | null }) {
	const [text, setText] = useState('')
	const [showEmoji, setShowEmoji] = useState(false)
	const sendMessage = useChatStore(s => s.sendMessage)

	function onSend() {
		if (!conversationId || text.trim().length === 0) return
		sendMessage(conversationId, text.trim())
		setText('')
	}

	return (
		<div className="relative p-3">
			<div className="flex items-end gap-2">
				<button className="h-9 w-9 grid place-items-center rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setShowEmoji(v => !v)} aria-label="Emoji">
					<Smile className="h-5 w-5" />
				</button>
				<textarea
					className="min-h-[44px] max-h-48 flex-1 rounded-md border bg-transparent px-3 py-2 resize-y"
					placeholder={conversationId ? 'Write a message…' : 'Select a conversation to start chatting'}
					value={text}
					onChange={e => setText(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							onSend()
						}
					}}
				/>
				<button className="h-9 w-9 grid place-items-center rounded-md border bg-gray-900 text-white dark:bg-white dark:text-gray-900 disabled:opacity-50" onClick={onSend} disabled={!conversationId || text.trim().length === 0} aria-label="Send">
					<Send className="h-4 w-4" />
				</button>
			</div>
			{showEmoji && (
				<div className="absolute bottom-16 left-3 z-10">
					<Picker
						data={data}
						onEmojiSelect={(e: any) => setText(t => t + (e.native ?? ''))}
						theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
					/>
				</div>
			)}
		</div>
	)
}



