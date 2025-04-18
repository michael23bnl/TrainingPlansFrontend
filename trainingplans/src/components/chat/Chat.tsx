import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import starIcon from '../../assets/star.svg';
import chooseIcon from '../../assets/choose.svg';
import { getAllAvailablePlans } from "../../api/plans";
import { PlanList } from "../plans/PlanList";
import { Plan } from "../../api/interfaces";

interface ChatProps {
    messages: Message[];
    chatRoom: string;
    sendMessage: (message: string, plans: Plan[], chatRoom: string) => void;
}

export const Chat = ({ messages, chatRoom, sendMessage }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlans, setSelectedPlans] = useState<Plan[]>([]);
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    const messagesEndRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
        setSelectedPlans([]);
    }, [messages]);

    const onSendMessage = () => {
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
            
            if (isSelected) {
                return prev.filter(p => p.id !== plan.id);
            } else {
                return [...prev, plan];
            }
        });
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
                <button
                    onClick={onChoosePlan}
                    className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-200"
                >
                    Выбрать план
                </button>
            </div>
            {/* Модальное окно для выбора плана */}
            {isPlanModalOpen && 
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                                                className={`plan-icon plan-choose-icon ${
                                                    isSelected ? "plan-choose-icon-active" : ""
                                                }`} 
                                                alt="Choose" 
                                            />
                                        </button>
                                        
                                        {plan.isFavorite ? (
                                        <button
                                            className="icon-button"
                                            type="button"
                                            title="В избранном"
                                        >
                                            <img src={starIcon} 
                                            className="plan-icon plan-favorite-icon-active" 
                                            alt="Favorite" 
                                            />
                                        </button>
                                        ) : (
                                            null
                                        )}
                                    </>
                                }}    
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