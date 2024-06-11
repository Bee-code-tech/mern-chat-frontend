import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),

	downloadFile: (fileUrl) => {
		const link = document.createElement('a');
		link.href = fileUrl;
		link.download = 'filename';
		link.click();
	}

}));

export default useConversation;