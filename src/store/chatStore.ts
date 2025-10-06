import { create } from 'zustand'

export type Message = {
	id: string
	text: string
	isMine: boolean
	timestamp: number
	read?: boolean
}

export type Conversation = {
	id: string
	title: string
	lastMessagePreview: string
}

type ChatState = {
	conversations: Conversation[]
	messagesByConversation: Record<string, Message[]>
	typingByConversation: Record<string, string[]>
	activeConversationId: string | null
	setActiveConversation: (id: string) => void
	sendMessage: (conversationId: string, text: string) => void
}

function formatTime(ts: number): string {
	const d = new Date(ts)
	return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const useChatStore = create<ChatState>((set, get) => ({
	conversations: [
		{ id: 'c1', title: 'General', lastMessagePreview: 'Welcome to the chat!' },
		{ id: 'c2', title: 'Design Team', lastMessagePreview: 'Let’s ship the new UI' },
		{ id: 'c3', title: 'Support', lastMessagePreview: 'How can we help?' },
	],
	messagesByConversation: {
		c1: [
			{ id: 'm1', text: 'Welcome to the chat!', isMine: false, timestamp: Date.now() - 1000 * 60 * 60, read: true },
		],
		c2: [
			{ id: 'm2', text: 'Design sync at 3pm', isMine: false, timestamp: Date.now() - 1000 * 60 * 25 },
		],
		c3: [],
	},
	typingByConversation: {},
	activeConversationId: 'c1',
	setActiveConversation: (id) => set({ activeConversationId: id }),
	sendMessage: (conversationId, text) => {
		const id = Math.random().toString(36).slice(2)
		const message: Message = { id, text, isMine: true, timestamp: Date.now(), read: false }
		const messages = get().messagesByConversation[conversationId] ?? []
		const nextMessages = { ...get().messagesByConversation, [conversationId]: [...messages, message] }
		// Update preview
		const conversations = get().conversations.map(c => c.id === conversationId ? { ...c, lastMessagePreview: text } : c)
		set({ messagesByConversation: nextMessages, conversations })
		// Simulate read receipt after delay
		setTimeout(() => {
			const updated = (get().messagesByConversation[conversationId] ?? []).map(m => m.id === id ? { ...m, read: true } : m)
			set({ messagesByConversation: { ...get().messagesByConversation, [conversationId]: updated } })
		}, 1200)

		// Simulate recipient is typing and sends an auto-reply
		set({ typingByConversation: { ...get().typingByConversation, [conversationId]: ['Alex'] } })
		setTimeout(() => {
			const reply: Message = { id: Math.random().toString(36).slice(2), text: 'Got it! 👍', isMine: false, timestamp: Date.now(), read: true }
			const current = get().messagesByConversation[conversationId] ?? []
			set({
				messagesByConversation: { ...get().messagesByConversation, [conversationId]: [...current, reply] },
				typingByConversation: { ...get().typingByConversation, [conversationId]: [] },
			})
		}, 1500)
	},
}))

// Derived helper to format timestamp without storing it
export function mapMessagesWithFormatting(messages: Message[]): Array<Message & { timestampFormatted: string }> {
	return messages.map(m => ({ ...m, timestampFormatted: formatTime(m.timestamp) }))
}


