export interface Message {
	userName: string;
	message: string;
	sendingDate: string;
  }
  
  interface MessageProps {
	messageInfo: Message;
  }
  
  export const Message = ({ messageInfo }: MessageProps) => {  
	return (
	  <div className="w-fit">
		<span className="text-sm text-slate-600">{messageInfo.userName}</span>
		
		<div className="p-2 bg-gray-100 rounded-lg shadow-md">
		  {messageInfo.message}
		</div>
	  </div>
	);
  };
  