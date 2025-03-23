

import { WaitingRoom } from "../components/chat/WaitingRoom"
import { Chat } from "../components/chat/Chat"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect } from "react";
import { Message } from "../components/chat/Message";


interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
}

interface Plan {
    id: string;
    exercises: Exercise[];
}

export const ChatPage = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [chatRoom, setChatRoom] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [chatRooms, setChatRooms] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [joinNewChat, setJoinNewChat] = useState<boolean>(false);
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const connection = new HubConnectionBuilder()
                    .withUrl("http://localhost:8003/api/chat")
                    .withAutomaticReconnect()
                    .build();
                
                console.log(connection.connectionId);
                
                
                connection.on("RecieveMessage", (userName, message, sendingDate) => {
                    //console.log("Получено сообщение:", { userName, message, sendingDate }); // Лог
                    setMessages(prevMessages => [...prevMessages, { userName, message, sendingDate }]);
                });
                await connection.start();
                const rooms: string[] = await connection.invoke("GetChatGroups");
                setChatRooms(rooms);
                setConnection(connection);
            } catch (error) {
                console.error("Ошибка загрузки чатов:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChatRooms();
        
        if (!connection) return;

        return () => {
            connection.off("RecieveMessage"); // Отписка при размонтировании
        };
    }, []);

    const joinChat = async (userName: string, chatRoom: string) => {
        if (!connection) return;
    
        try {
            // Присоединение к чату
            const response = await connection.invoke("JoinChat", { userName, chatRoom });
            
            if (response.statusCode === 200) {
                setChatRoom(chatRoom);
                setChatRooms((prevRooms) => [...prevRooms, chatRoom]);
    
                // Запрос старых сообщений при присоединении
                const previousMessages: Message[] = await connection.invoke("GetPreviousMessages", chatRoom);
                setMessages(previousMessages);  // Обновление сообщений
                setJoinNewChat(false);
            } else {
                console.log(response.status);
                alert("Вы уже состоите в этом чате");
            }
        } catch (error) {
            console.error("Ошибка при присоединении к чату:", error);
        }
    };
    

    const sendMessage = (message: string, chatRoom: string) => {
        if (!connection) return;
    
        connection.invoke("SendMessage", message, chatRoom);
    };

    const sendPlan = (plan: Plan, chatRoom: string) => {
        if (!connection) return;
        connection.invoke("SendPlan", plan, chatRoom);
    };

    const closeChat = async () => {
        if (connection) {
            await connection.stop();
            setConnection(null);
            setMessages([]);
        }
    };

    const leaveChat = async (room: string) => {
        if (connection) {
            await connection.invoke("LeaveChat", room);
            setMessages([]);  // Очищаем сообщения
            setChatRoom("");   // Очищаем текущую комнату
    
            setChatRooms(prevRooms => prevRooms.filter(r => r !== room));
        }
    };

    const switchChatRoom = async (chatRoom: string) => {
        if (!connection) return;
    
        try {
            // Смена текущей комнаты
            setChatRoom(chatRoom);
    
            // Получаем старые сообщения для нового чата
            const previousMessages: Message[] = await connection.invoke("GetPreviousMessages", chatRoom);
    
            setMessages(previousMessages);
            
        } catch (error) {
            console.error("Ошибка при переключении чата:", error);
        }
    };
    
    
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-7xl px-6">
                <div className="w-1/4 bg-gray-200 p-6 rounded-lg shadow-lg mr-6">                    
                    {chatRooms.length > 0 ? (
                        <>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Чаты</h2>
                    <button 
                        onClick={() => setJoinNewChat(true)}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Добавить новый чат
                    </button>  </>               
                ) : (
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Войдите в чат, чтобы начать совместную работу</h2>
                )}
                    
                    {isLoading ? (
                        <p className="text-gray-600">Загрузка...</p>
                    ) : (
                        <ul>
                            {chatRooms.map((room, index) => (
                                <li key={index} className="mb-3 flex justify-between items-center">
                                    <button 
                                        onClick={() => {
                                            switchChatRoom(room); 
                                            setJoinNewChat(false)
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        {room}
                                    </button>
                                    <button 
                                        onClick={() => leaveChat(room)}  // Передаем текущий чат в leaveChat
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Покинуть чат
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {chatRooms.length > 0 && joinNewChat == false ? (
                    chatRoom !== "" ? (
                        <div className="w-3/4">
                            <Chat 
                                messages={messages} 
                                chatRoom={chatRoom} 
                                sendMessage={sendMessage}
                                sendPlan={sendPlan}
                            />
                        </div>
                    ) : (
                        null
                    )
                ) : (
                    <WaitingRoom joinChat={joinChat}/>
                )}
            </div>          
        </div>
    );
};