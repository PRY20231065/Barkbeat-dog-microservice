import { IGenericResponse, IPaginatedResponse } from "src/utils/generic";
import { CreateGoalResponseDTO } from "../../application/dto/create-goal.response.dto";
import { CreateGoalRequestDTO } from "../../application/dto/create-goal.request.dto";
import { GoalResponseDTO } from "../../application/dto/goal.response.dto";
import { GoalRequestDTO } from "../../application/dto/goal.request.dto";

export interface GoalService {
    createGoal(goal: CreateGoalRequestDTO): Promise<IGenericResponse<CreateGoalResponseDTO>>;
    updateGoalByDogIdAndId(dog_id: string, id: string, goal: GoalRequestDTO): Promise<IGenericResponse<GoalResponseDTO>>;
    deleteGoalByDogIdAndId(dog_id: string, id: string): Promise<IGenericResponse<null>>;
    findOneGoalByDogIdAndId(dog_id: string, id: string): Promise<IGenericResponse<GoalResponseDTO>>;
    findAllByDogIdAndFilters(dog_id: string, is_completed: boolean, start_date: string, end_date: string): Promise<IPaginatedResponse<GoalResponseDTO>>;
}