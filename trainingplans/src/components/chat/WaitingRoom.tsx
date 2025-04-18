import { useState, FormEvent } from "react";

interface Props {
    joinChat: (chatRoom: string) => void;
}

export const WaitingRoom = ({ joinChat }: Props) => {
    const [chatRoom, setChatRoom] = useState<string>("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        joinChat(chatRoom);
    };

    return (
        <form 
            onSubmit={onSubmit} 
            className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-800">Онлайн чат</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Название чата</label>
                <input 
                    onChange={(e) => setChatRoom(e.target.value)}
                    name="chatRoom" 
                    placeholder="Введите название чата" 
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
            <button 
                type="submit" 
                className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
                Присоединиться
            </button>
        </form>
    );
};
