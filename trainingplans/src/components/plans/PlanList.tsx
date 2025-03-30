
import '../plans/plans.css';
import { Plan } from "../../api/interfaces";
  
interface PlanListProps {
    plans: Plan[];
    headerActionButtons?: (plan: Plan) => React.ReactNode;
}

export const PlanList = ({ plans, headerActionButtons } : PlanListProps) => {
  
    if (!plans.length) return <div><p>Woops! No plans available at the moment</p></div>;

    return <>
        <div>
            <div className="card-container">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="plan-card"
                    >
                        <div className="plan-card-header p-4"> 
                            {headerActionButtons?.(plan)}                          
                        </div>
                        <div className="plan-card-main pb-4 pr-4 pl-4 ">                          
                            {plan.category 
                                ? 
                                <div className="category-area flex flex-wrap gap-2"> 
                                    {plan.category.split(',').map((cat, index) => {
                                        const formattedCat = cat.trim().charAt(0).toUpperCase() + cat.trim().slice(1).toLowerCase();
                                        return (                                          
                                            <span 
                                                key={index} 
                                                className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                                            >
                                                {formattedCat}
                                            </span>                                          
                                        )
                                    })}
                                </div>
                                : null}                           
                            <ul className="flex flex-col gap-2">
                                {plan.exercises.map((exercise) => (
                                    <li key={exercise.id} className="">
                                        <p className="mt-3">{exercise.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}                 
            </div>
    </div>
    </>
};

