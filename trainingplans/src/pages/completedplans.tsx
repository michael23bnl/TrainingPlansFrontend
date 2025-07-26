
import { useState } from 'react';
import doneIcon from '../assets/done.svg';
import { usePlanFetching } from '../hooks/usePlanFetching';
import { GetCompletedPlansPaginated, searchThroughCompletedPlans } from '../api/plans';
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";
import { usePlanCompleteButtons } from '../hooks/usePlanCompleteButtons';
import { Pagination } from "../components/pagination/pagination";
import { Link } from 'react-router-dom';

export const CompletedPlansPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        pageNumber: 1,
        pageSize: 10
      });
    const { plans, plansSize, loading, setPlans } = usePlanFetching(searchTerm, pagination, GetCompletedPlansPaginated, searchThroughCompletedPlans);
    const { handleRemoveFromCompletedPage } = usePlanCompleteButtons(setPlans);

    const handlePageChange = (pageNumber: number) => {
        setPagination(prev => ({ ...prev, pageNumber }));
    };
  
    return (
        <>       
            <PlanSearch 
                value={searchTerm}
                onSearch={setSearchTerm}
                placeholder="Поиск планов по категориям и упражнениям"
            />
            { (loading) ? "" :
            <>
                <PlanList
                    plans={plans}
                    headerActionButtons={(plan) => (
                        <>
                        <button
                            onClick={() => handleRemoveFromCompletedPage(plan.id)}
                            className="icon-button"
                            type="button"
                            title="Убрать из выполненных"
                        >
                            <img src={doneIcon} 
                                className="plan-icon plan-done-icon plan-done-icon-active" 
                                alt="Edit" 
                            />
                        </button>  
                        </>
                    )}  
                    listEmptyMessage={
                    <span>
                      Здесь будут отображаться Ваши выполненные программы тренировок. Отметить план как выполненный
                      можно в разделе <Link 
                      className="text-blue-500 hover:text-blue-300 transition-all" 
                      to="/favoriteplans">избранного</Link> и <Link
                      className="text-blue-500 hover:text-blue-300 transition-all" 
                      to="/myplans">Ваших планов</Link>
                    </span>}   
                />
                <Pagination
                    currentPage={pagination.pageNumber}
                    pageSize={pagination.pageSize}
                    totalCount={plansSize}
                    onPageChange={handlePageChange}
                />
                </>
            }
        </>
    );
};
