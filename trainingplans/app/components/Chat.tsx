import { useEffect, useRef, useState } from "react";
import { Message } from "../components/Message";

interface MessageInfo {
    userName: string;
    message: string;
}

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
    messages: MessageInfo[];
    chatRoom: string;
    sendMessage: (message: string, chatRoom: string) => void;
    sendPlan: (plan: Plan, chatRoom: string) => void;
    closeChat: () => void;
    leaveChat: () => void;
}

export const Chat = ({ messages, chatRoom, sendMessage, sendPlan, closeChat, leaveChat }: ChatProps) => {
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
