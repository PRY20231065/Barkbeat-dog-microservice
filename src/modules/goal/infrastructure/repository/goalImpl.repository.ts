import { Injectable } from "@nestjs/common";
import { GoalRepository } from "../../domain/interface/goal.repository";
import { InjectModel, Model } from "nestjs-dynamoose";
import { Goal, GoalKey } from "../../domain/model/goal.model";
import * as uuid from 'uuid';

@Injectable()
export class GoalImplRepository implements GoalRepository{
    constructor(
        @InjectModel('goal')
        private readonly goalModel: Model<Goal, GoalKey>
    ){}
    
    async create(goal: Goal): Promise<Goal> {
        goal.id = uuid.v4(); 
        const dogCreated = await this.goalModel.create(goal);
        return dogCreated;
    }
    
    async update(key: GoalKey, goal: Partial<Goal>): Promise<Goal> {
        const findGoal = await this.goalModel.get(key);
        if(!findGoal){
            return null;
        }
        const goalUpdated = await this.goalModel.update(key, goal);
        return goalUpdated;
    }
    
    async delete(key: GoalKey): Promise<void> {
        await this.goalModel.delete(key);
    }
    
    async findOne(key: GoalKey): Promise<Goal> {
        const findGoal = await this.goalModel.get(key);
        if(!findGoal){
            return null;
        }
        return findGoal;
    }
    
    async findAllByDogIdAndFilters(dog_id: string, is_completed: boolean, start_date: string, end_date: string): Promise<Goal[]> {
        const queryItems = await this.goalModel.query('dog_id').eq(dog_id);
        
        if (is_completed !== undefined) {
            queryItems.filter('is_completed').eq(is_completed);
        }

        if (start_date) {
            queryItems.filter('created_date').gt(start_date);
        }

        if (end_date) {
            queryItems.filter('created_date').lt(end_date);
        }

        const results = await queryItems.exec();

        return results;
    }
}