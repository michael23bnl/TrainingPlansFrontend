import { useEffect, useRef, useState } from "react";
import { Message as Messages } from "../../api/interfaces";
import starIcon from '../../assets/star.svg';
import chooseIcon from '../../assets/choose.svg';
import attachIcon from '../../assets/attach.svg';
import { getAllAvailablePlans } from "../../api/plans";
import { PlanList } from "../plans/PlanList";
import { Plan } from "../../api/interfaces";
import { Message } from "./Message";

interface ChatProps {
    messages: Messages[];
    chatRoom: string;
    sendMessage: (message: string, plans: Plan[], chatRoom: string) => void;
}

export const Chat = ({ messages, chatRoom, sendMessage }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlans, setSelectedPlans] = useState<Plan[]>([]);
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
        setSelectedPlans([]);
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    useEffect(() => {
        setMessage("");
        setSelectedPlans([]);
    }, [chatRoom]);

    const onSendMessage = () => {
        if (!message.trim() && selectedPlans == null) return;
        sendMessage(message, selectedPlans, chatRoom);
        setMessage("");
        setSelectedPlans([]);
    };

    const onChoosePlan = async () => {
        const plans = await getAllAvailablePlans();
        setPlans(plans);
        setIsPlanModalOpen(true);
    };

    const handleChoosePlan = (plan: Plan) => {
        setSelectedPlans(prev => {
            const isSelected = prev.some(p => p.id === plan.id);
            return isSelected
                ? prev.filter(p => p.id !== plan.id)
                : [...prev, plan];
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
        }
    };

    return (
        <div className="w-full bg-white p-8 rounded-lg shadow-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-800">{chatRoom}</span>
            </div>

            <div
                ref={messagesContainerRef}
                className="flex flex-col overflow-auto h-full gap-3 pb-3"
            >
                {messages.length > 0 && messages.map((message: Messages, index) => (
                    <Message messageInfo={message} key={index} />
                ))}
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <div className="relative w-full">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Введите сообщение"
                        rows={1}
                        className="w-[1055px] resize-none p-3 pl-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
                        style={{ minHeight: '3rem', maxHeight: '15rem' }}
                    />
                    <button
                        onClick={onChoosePlan}
                        className="absolute left-3 top-3 transform"
                    >
                        <img
                            src={attachIcon}
                            className="w-6 h-6 opacity-70 hover:opacity-100 transition-opacity"
                            title="Выбрать план"
                            alt="Выбрать план"
                        />
                        {selectedPlans.length > 0 && (
                            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {selectedPlans.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {isPlanModalOpen &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full h-full flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">Выберите план тренировки</h3>
                        </div>
                        <div className="overflow-y-auto p-4">
                            <PlanList
                                plans={plans}
                                headerActionButtons={(plan) => {
                                    const isSelected = selectedPlans.some(p => p.id === plan.id);
                                    return <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleChoosePlan(plan);
                                            }}
                                            className="icon-button"
                                            type="button"
                                            title={isSelected ? "Убрать" : "Выбрать"}
                                        >
                                            <img
                                                src={chooseIcon}
                                                className={`plan-icon plan-choose-icon ${isSelected ? "plan-choose-icon-active" : ""}`}
                                                alt="Choose"
                                            />
                                        </button>
                                        {plan.isFavorite && (
                                            <button
                                                className="icon-button"
                                                type="button"
                                                title="В избранном"
                                            >
                                                <img
                                                    src={starIcon}
                                                    className="plan-icon plan-favorite-icon-active"
                                                    alt="Favorite"
                                                />
                                            </button>
                                        )}
                                    </>
                                }}
                                listEmptyMessage={<div></div>}
                            />
                        </div>
                        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsPlanModalOpen(false)
                                    setSelectedPlans([]);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={() => setIsPlanModalOpen(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Готово
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
