"use client";
import '../globals.css'
import { WaitingRoom } from "../components/WaitingRoom"
import { Chat } from "../components/Chat"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect } from "react";

interface Message {
    userName: string;
    message: string;
}


const ChatPage = () => {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [chatRoom, setChatRoom] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);

    //useEffect(() => {
    //    setMessages([]);  // Очистить сообщения при переходе в новый чат
    //}, [chatRoom]);

    const joinChat = async (userName: string, chatRoom: string) => {
        var connection = new HubConnectionBuilder()
            .withUrl("http://localhost:8003/api/chat")
            .withAutomaticReconnect()
            .build();

            connection.on("RecieveMessage", (userName: string, message: string) => {
                setMessages((messages) => [...messages, { userName, message }]);
            });

        try {
            await connection.start();
            await connection.invoke("JoinChat", { userName, chatRoom });

            console.log(connection);
            setConnection(connection);
            setChatRoom(chatRoom);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = (message: string) => {
        connection?.invoke("Sendmessage", message);
    }

    const closeChat = async () => {
        await connection?.stop();
        setConnection(null);
        setMessages([]); 
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {connection ? (
                <Chat 
                messages={messages} 
                chatRoom={chatRoom} 
                sendMessage={sendMessage}
                closeChat={closeChat}/>
            ) : (
                <WaitingRoom joinChat={joinChat}/>
            )}
        </div>
            
            
       
    )

}

export default ChatPage;



