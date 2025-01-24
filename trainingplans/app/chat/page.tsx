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

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
}

const ChatPage = () => {

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [chatRoom, setChatRoom] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);

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

    const sendMessage = (message: string, chatRoom: string) => {
        connection?.invoke("SendMessage", message, chatRoom);
    }

    const sendPlan = (plan: Plan, chatRoom: string) => {
        connection?.invoke("SendPlan", plan, chatRoom);
    }

    const closeChat = async () => {
        if (connection) {
            await connection?.stop();
            setConnection(null);
            setMessages([]); 
        }
    }

    const leaveChat = async () => {
        if (connection) {
            await connection?.invoke("LeaveChat", chatRoom);  // вызов метода на сервере
            setMessages([]);  // очищаем сообщения
            setChatRoom("");  // сбрасываем текущий чат
            //await connection.stop();  // остановить соединение
            //setConnection(null);  // сбрасываем соединение
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {connection ? (
                <Chat 
                messages={messages} 
                chatRoom={chatRoom} 
                sendMessage={sendMessage}
                sendPlan={sendPlan}
                closeChat={closeChat}
                leaveChat={leaveChat}/>
            ) : (
                <WaitingRoom joinChat={joinChat}/>
            )}
        </div>
            
            
       
    )

}

export default ChatPage;



