import { Chat } from "../components/chat/Chat";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useState, useEffect, FormEvent, MouseEvent } from "react";
import { Plan, Message as Messages } from "../api/interfaces";

interface ChatPreview {
  room: string;
  lastMessage: string;
  lastMessageSender: string;
  sendingDate: string;
}

export const ChatPage = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messages, setMessages] = useState<Messages[]>([]);
    const [chatRoom, setChatRoom] = useState<string>("");
    const [chatPreviews, setChatPreviews] = useState<ChatPreview[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newRoomName, setNewRoomName] = useState<string>("");

    const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; room: string | null }>({
        visible: false,
        x: 0,
        y: 0,
        room: null,
    });

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:7000/gateway/api/chat")
            .withAutomaticReconnect()
            .build();

        setConnection(connection);

        connection.on("ReceiveMessage", (userName, message, plans, sendingDate, room) => {
            setMessages(prev => [...prev, { userName, message, plans, sendingDate }]);
            setChatPreviews((prev) => {
                const index = prev.findIndex((p) => p.room === room);
                const newPreview = { 
                    room, 
                    lastMessage: message, 
                    lastMessageSender: userName,  
                    sendingDate 
                };
                if (index !== -1) {
                    const newPreviews = [...prev];
                    newPreviews[index] = newPreview;
                    return newPreviews;
                } else {
                    return [newPreview, ...prev];
                }
            });
        });

        const fetchChatRooms = async () => {
            try {
                await connection.start();
                const roomsWithMessages: Record<string, Messages> = await connection.invoke("GetChatRoomsWithLastMessages");

                const previews: ChatPreview[] = Object.entries(roomsWithMessages).map(([room, last]) => ({
                    room,
                    lastMessage: last?.message || "вложения",
                    lastMessageSender: last?.userName || "",
                    sendingDate: last?.sendingDate || "",
                }));
                setChatPreviews(previews);
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

    const joinChat = async (room: string) => {
        if (!connection) return;
        try {
            const response = await connection.invoke("JoinChat", { chatRoom: room });
            if (response.statusCode === 200) {
                setChatRoom(room);
                const previousMessages: Messages[] = await connection.invoke("GetPreviousMessages", room);
                setMessages(previousMessages);
                setNewRoomName("");
            } else {
                alert("Вы уже состоите в этом чате");
            }
        } catch (error) {
            console.error("Ошибка при присоединении к чату:", error);
        }
    };

    const leaveChat = async (room: string) => {
        if (connection) {
            await connection.invoke("LeaveChat", room);
            setMessages([]);
            setChatRoom("");
            setChatPreviews((prev) => prev.filter((p) => p.room !== room));
        }
    };

    const switchChatRoom = async (room: string) => {
        if (!connection) return;
        try {
            setChatRoom(room);
            const previousMessages: Messages[] = await connection.invoke("GetPreviousMessages", room);
            setMessages(previousMessages);
        } catch (error) {
            console.error("Ошибка при переключении чата:", error);
        }
    };

    const sendMessage = (message: string, plans: Plan[], chatRoom: string) => {
        if (connection && (message !== "" || plans.length > 0)) {
            connection.invoke("SendMessage", message, plans, chatRoom);
        }
    };

    const handleJoinSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (newRoomName.trim()) joinChat(newRoomName.trim());
    };

    const handleContextMenu = (event: MouseEvent<HTMLLIElement>, room: string) => {
        event.preventDefault();
        setContextMenu({
            visible: true,
            x: event.pageX,
            y: event.pageY,
            room,
        });
    };

    useEffect(() => {
        const handleClick = () => {
            if (contextMenu.visible) {
                setContextMenu({ visible: false, x: 0, y: 0, room: null });
            }
        };
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [contextMenu.visible]);

    const handleLeaveFromMenu = () => {
        if (contextMenu.room) {
            leaveChat(contextMenu.room);
            setContextMenu({ visible: false, x: 0, y: 0, room: null });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex w-full px-[110px]">
                <div className="w-1/4 h-[80vh] bg-white border border-gray-300 rounded-xl shadow-md mr-6 flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Чаты</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {isLoading ? (
                        <p className="text-center text-gray-500 mt-4">Загрузка...</p>
                        ) : chatPreviews.length === 0 ? (
                        <p className="text-center text-gray-500 mt-4">Нет доступных чатов</p>
                        ) : (
                        <ul className="divide-y divide-gray-200 relative">
                            {chatPreviews.map(({ room, lastMessage, lastMessageSender, sendingDate }, index) => (
                            <li
                                key={room}
                                onClick={() => switchChatRoom(room)}
                                onContextMenu={(e) => handleContextMenu(e, room)}
                                className={`flex justify-between items-center px-4 py-3 cursor-pointer transition-all hover:bg-gray-100 ${
                                room === chatRoom ? "bg-gray-100" : ""
                                }`}
                            >
                                <div className="flex flex-col truncate">
                                <span className="text-blue-600 font-medium truncate">{room}</span>
                                <span className="text-gray-500 text-sm truncate">
                                    <strong>{lastMessageSender}:</strong> {lastMessage}
                                </span>
                                </div>
                                {/* <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{sendingDate}</span> */}
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>

                    <form onSubmit={handleJoinSubmit} className="p-4 border-t border-gray-200">
                        <textarea
                            value={newRoomName}
                            onChange={(e) => {
                                setNewRoomName(e.target.value);
                                e.target.style.height = "auto";
                                e.target.style.height = e.target.scrollHeight + "px";
                            }}
                            placeholder="Новый чат"
                            rows={1}
                            className="resize-none w-full mb-2 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden"
                            style={{ maxHeight: '15rem' }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-semibold"
                        >
                            Войти в чат
                        </button>
                    </form>
                </div>

                <div className="w-3/4 h-[80vh] bg-white border border-gray-300 rounded-xl shadow-md flex items-center justify-center">
                    {chatRoom ? (
                        <Chat messages={messages} chatRoom={chatRoom} sendMessage={sendMessage} />
                    ) : (
                        <div className="text-center text-gray-600 px-4">
                            Выберите чат или создайте новый, чтобы начать переписку
                        </div>
                    )}
                </div>

            </div>

            {contextMenu.visible && (
                <div
                    style={{
                        position: "absolute",
                        top: contextMenu.y,
                        left: contextMenu.x,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 1000,
                        padding: "8px 12px",
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    onClick={handleLeaveFromMenu}
                >
                    Покинуть чат
                </div>
            )}
        </div>
    );
};