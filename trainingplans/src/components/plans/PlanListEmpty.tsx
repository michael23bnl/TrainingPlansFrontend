import { ReactElement } from "react";


interface PlanListEmptyProps {
    message: ReactElement;
}

export const PlanListEmpty = ({message} : PlanListEmptyProps) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col w-fit items-center m-[110px] gap-4 rounded-2xl p-10 bg-gradient-to-br from-[rgba(38,41,82,0.85)] to-[rgba(25,28,70,0.9)]
        text-white shadow-2xl shadow-blue-900/50 backdrop-blur-sm font-medium leading-relaxed text-lg transition-all">
                <div>{message}</div>
            </div>
        </div>
    );
}