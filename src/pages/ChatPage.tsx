import { ConversationList } from '../sections/ConversationList'
import { MessageList } from '../sections/MessageList'
import { MessageInput } from '../sections/MessageInput'
import { useChatStore } from '../store/chatStore'

export function ChatPage() {
	const activeConversationId = useChatStore(s => s.activeConversationId)
	return (
		<div className="h-full grid grid-cols-1 md:grid-cols-[320px_1fr]">
			<aside className="border-r overflow-y-auto min-h-0">
				<ConversationList />
			</aside>
			<section className="flex flex-col min-h-0">
				<div className="flex-1 overflow-y-auto">
					<MessageList conversationId={activeConversationId} />
				</div>
				<div className="border-t">
					<MessageInput conversationId={activeConversationId} />
				</div>
			</section>
		</div>
	)
}



