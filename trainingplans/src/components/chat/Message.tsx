import { Message as MessageInfo } from "../../api/interfaces";

interface MessageProps {
  messageInfo: MessageInfo;
}

export const Message = ({ messageInfo }: MessageProps) => {  
	const formatDateTime = (isoString: string) => {
		try {
		  const date = new Date(isoString);
		  
		  const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
		  });
		  
		  const formattedTime = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 24-часовой формат
		  });
		  
		  return `${formattedTime} ${formattedDate}`;
		} catch {
		  return "Дата неизвестна";
		}
	};
  return (
    <div className="w-full max-w-[80%] mb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-slate-600">
          {messageInfo.userName}
        </span>
        <span className="text-xs text-gray-400">
			    {formatDateTime(messageInfo.sendingDate)}
        </span>
      </div>
      
      {messageInfo.message && (
        <div className="p-3 bg-gray-100 rounded-lg shadow-sm mb-2">
          {messageInfo.message}
        </div>
      )}
      {messageInfo.plans && messageInfo.plans.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <h4 className="font-medium text-gray-700 mb-2">Прикрепленные планы:</h4>
          <div className="space-y-3">
            {messageInfo.plans.map((plan) => (
              <div key={plan.id} className="border-b border-gray-100 pb-2 last:border-0">
                <div className="flex justify-start mb-1">
                  {plan.category && plan.category.split(',').map((cat, index) => {
                      const formattedCat = cat.trim().charAt(0).toUpperCase() + cat.trim().slice(1).toLowerCase();
                      return (                                          
                          <span 
                              key={index} 
                              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mr-2"
                          >
                              {formattedCat}
                          </span>                                          
                      )
                  })}
                </div>    
                <ul className="list-disc pl-5 space-y-1">
                  {plan.exercises.map((exercise, index) => (
                    <li key={index} className="text-sm">
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