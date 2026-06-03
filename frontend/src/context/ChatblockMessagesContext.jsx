import { createContext, useContext, useState, useEffect } from 'react';

const ChatblockMessagesContext = createContext();

export function ChatblockMessagesProvider({ children }) {

    const [messages, setMessages] = useState([]);
    const [queries, setQueries] = useState([]);


    return (
        <ChatblockMessagesContext.Provider
            value={{ messages, setMessages, queries , setQueries }}
        >
            {children}
        </ChatblockMessagesContext.Provider>
    );
}

export default function useChatblockMessages() {
    return useContext(ChatblockMessagesContext);
}
