import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";



interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
}

interface ChatProps {
    messages: Message[];
    chatRoom: string;
    sendMessage: (message: string, chatRoom: string) => void;
    sendPlan: (plan: Plan, chatRoom: string) => void;
}

export const Chat = ({ messages, chatRoom, sendMessage, sendPlan }: ChatProps) => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    const onSendMessage = () => {
        sendMessage(message, chatRoom);
        setMessage("");
    };

    return (
        <div className="w-full bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-800">{chatRoom}</span>
            </div>

            <div className="flex flex-col overflow-auto h-96 gap-3 pb-3">
            {messages.length > 0 && messages.map((message : Message, index) => (
                <Message messageInfo={message} key={index} />
            ))}
            
                <span ref={messagesEndRef} />
            </div>

            <div className="flex gap-3 mt-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите сообщение"
                    className="flex-grow p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={onSendMessage}
                    className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Отправить
                </button>
            </div>
    </div>
    );
};




/*

import { useEffect, useRef, useState } from "react";
import { Message } from "../components/Message";

interface MessageInfo {
    userName: string;
    message: string;
}

interface ChatProps {
    messages: MessageInfo[];
    chatRoom: string;
    sendMessage: (message: string, chatRoom: string) => void;
    closeChat: () => void;
    leaveChat: () => void;
}

export const Chat = ({ messages, chatRoom, sendMessage, closeChat, leaveChat }: ChatProps) => {
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    const onSendMessage = () => {
        sendMessage(message, chatRoom);
        setMessage("");
    };

    return (
        <div className="w-1/2 bg-white p-8 rounded shadow-lg">
            <div className="flex flex-row justify-between mb-5">
                <span>{chatRoom}</span>
                <button onClick={closeChat}>Выйти из всех чатов</button>
                <button onClick={leaveChat}>Покинуть чат</button>
            </div>

            <div className="flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3">
                {messages.map((messageInfo, index) => (
                    <Message messageInfo={messageInfo} key={index} />
                ))}
                <span ref={messagesEndRef} />
            </div>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите сообщение"
                    className="flex-grow border rounded p-2"
                />
                <button
                    onClick={onSendMessage}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

*/