

import { WaitingRoom } from "../components/chat/WaitingRoom"
import { Chat } from "../components/chat/Chat"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect } from "react";
import { Message } from "../components/chat/Message";
import { Plan } from "../api/interfaces";

export const ChatPage = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [chatRoom, setChatRoom] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatRooms, setChatRooms] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [joinNewChat, setJoinNewChat] = useState<boolean>(false);

    useEffect(() => { // вызывается дважды в StrictMode

        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:7000/gateway/api/chat")
            .withAutomaticReconnect()
            .build();

        setConnection(connection);

        connection.on("ReceiveMessage", (userName, message, plans, sendingDate) => {
            //console.log("Получено сообщение:", { userName, message, sendingDate });
            setMessages(prevMessages => [...prevMessages, { userName, message, plans, sendingDate }]);
        });

        const fetchChatRooms = async () => {
            try {
                await connection.start();
                console.log(connection.connectionId);

                const rooms: string[] = await connection.invoke("GetChatGroups");
                setChatRooms(rooms);
            } catch (error) {
                console.error("Ошибка загрузки чатов:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChatRooms();

        return () => {
            connection.off("ReceiveMessage");
            connection.stop();
        };
    }, []);

    const joinChat = async (chatRoom: string) => {
        if (!connection) return;
    
        try {
            // Присоединение к чату
            const response = await connection.invoke("JoinChat", { chatRoom });
            
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
    

    const sendMessage = (message: string, plans: Plan[], chatRoom: string) => {
        if (!connection) return;

        if (message != "" || plans.length != 0) {
            console.log(message);
            console.log(plans);
            connection.invoke("SendMessage", message, plans, chatRoom);
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