
import { useState } from "react";
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';
import doneIcon from '../assets/done.svg';
import { usePlanFetching } from '../hooks/usePlanFetching';
import { getAllPlans, searchThroughMyPlans } from '../api/plans';
import { PlanSearch } from "../components/plans/PlanSearch";
import { PlanList } from "../components/plans/PlanList";
import { usePlanButtons } from "../hooks/usePlanButtons";
import { usePlanCompleteButtons } from '../hooks/usePlanCompleteButtons';
import { Pagination } from "../components/pagination/pagination";
import { Link } from "react-router-dom";

export const MyPlansPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
      pageNumber: 1,
      pageSize: 10
    });
    const { plans, plansSize, loading, setPlans } = usePlanFetching(searchTerm, pagination, getAllPlans, searchThroughMyPlans);
    const { handleDeletePlan, handleEditPlan } = usePlanButtons(setPlans);
    const { handleMarkAsCompleted, handleRemoveCompletedMark } = usePlanCompleteButtons(setPlans);

    const handlePageChange = (pageNumber: number) => {
      setPagination(prev => ({ ...prev, pageNumber }));
    };

    return (
        <>       
            <PlanSearch 
              value={searchTerm}
              onSearch={(term) => {
                setSearchTerm(prevTerm => {
                  if (prevTerm !== term) {
                    setPagination(prev => ({
                      ...prev,
                      pageNumber: 1
                    }));
                  }
                  return term;
                });
              }}
              placeholder="Поиск планов по категориям и упражнениям"
            />
            { (loading) ? "" :
            <>
                <PlanList
                    plans={plans}
                    headerActionButtons={(plan) => (
                        <>
                        <button
                            onClick={() => handleEditPlan(plan.id)}
                            className="icon-button"
                            type="button"
                        >
                            <img src={editIcon} className="plan-icon plan-edit-icon" alt="Edit" />
                        </button>                           
                        <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="icon-button"
                            type="button"
                        >
                            <img src={deleteIcon} className="plan-icon plan-delete-icon" alt="Delete" />
                        </button> 
                        {
                            plan.isCompleted ? (
                                <button
                                  onClick={() => handleRemoveCompletedMark(plan.id)}
                                  className="icon-button"
                                  type="button"
                                  title="Убрать из выполненных"
                                >
                                  <img src={doneIcon} 
                                    className="plan-icon plan-done-icon plan-done-icon-active" 
                                    alt="Remove completed mark" 
                                  />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleMarkAsCompleted(plan.id)}
                                  className="icon-button"
                                  type="button"
                                  title="Добавить в выполненные"
                                >
                                  <img src={doneIcon} className="plan-icon plan-done-icon" alt="Mark as completed" />
                                </button>
                              )
                        } 
                        </>
                    )}  
                    listEmptyMessage={
                    <span>
                      Здесь будут отображаться созданные Вами программы тренировок. <Link
                      className="text-blue-500 hover:text-blue-300 transition-all" 
                      to="/plansconstructor">Перейти в редактор</Link>
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
    )
};

export default MyPlansPage;
