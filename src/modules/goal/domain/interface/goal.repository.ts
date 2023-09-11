import { Goal, GoalKey } from "../model/goal.model";

export interface GoalRepository {
    create(goal: Goal): Promise<Goal>;
    update(key: GoalKey, goal: Partial<Goal>): Promise<Goal>;
    delete(key: GoalKey): Promise<void>;
    findOne(key: GoalKey): Promise<Goal>;
    findAllByDogIdAndFilters(dog_id: string, is_completed: boolean, start_date: string, end_date: string): Promise<Goal[]>;
}