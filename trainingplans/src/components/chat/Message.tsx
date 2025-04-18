import { Plan } from "../../api/interfaces";

export interface Message {
  userName: string;
  message: string;
  plans: Plan[];
  sendingDate: string;
}

interface MessageProps {
  messageInfo: Message;
}

export const Message = ({ messageInfo }: MessageProps) => {  
	const formatDateTime = (isoString: string) => {
		try {
		  const date = new Date(isoString);
		  
		  // Форматируем дату
		  const formattedDate = date.toLocaleDateString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		  });
		  
		  // Форматируем время
		  const formattedTime = date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false // 24-часовой формат
		  });
		  
		  return `${formattedDate} ${formattedTime}`; // "15.05.2023 14:30"
		} catch {
		  return "Дата неизвестна";
		}
	  };
  return (
    <div className="w-full max-w-[80%] mb-4">
      {/* Заголовок с именем пользователя и датой */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-slate-600">
          {messageInfo.userName}
        </span>
        <span className="text-xs text-gray-400">
			{formatDateTime(messageInfo.sendingDate)}
        </span>
      </div>
      
      {/* Текст сообщения (если есть) */}
      {messageInfo.message && (
        <div className="p-3 bg-gray-100 rounded-lg shadow-sm mb-2">
          {messageInfo.message}
        </div>
      )}
      
      {/* Прикрепленные планы (если есть) */}
      {messageInfo.plans?.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <h4 className="font-medium text-gray-700 mb-2">Прикрепленные планы:</h4>
          <div className="space-y-3">
            {messageInfo.plans.map((plan) => (
              <div key={plan.id} className="border-b border-gray-100 pb-2 last:border-0">
                {/* Название плана и категории */}
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-medium text-gray-800">
                    {plan.category || "Без категории"}
                  </h5>
                  {plan.isFavorite && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Избранное
                    </span>
                  )}
                </div>
                
                {/* Список упражнений */}
                <ul className="list-disc pl-5 space-y-1">
                  {plan.exercises.map((exercise) => (
                    <li key={exercise.id} className="text-sm">
                      <span className="font-medium">{exercise.name}</span>
                      {exercise.muscleGroup && (
                        <span className="text-xs ml-2 bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                          {exercise.muscleGroup}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};