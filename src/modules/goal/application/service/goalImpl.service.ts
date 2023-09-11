import { HttpStatus, Injectable } from "@nestjs/common";
import { GoalService } from "../../domain/interface/goal.service";
import { GoalImplRepository } from "../../infrastructure/repository/goalImpl.repository";
import { IGenericResponse, IPaginatedResponse } from "src/utils/generic";
import { CreateGoalRequestDTO } from "../dto/create-goal.request.dto";
import { CreateGoalResponseDTO } from "../dto/create-goal.response.dto";
import { GoalRequestDTO } from "../dto/goal.request.dto";
import { GoalResponseDTO } from "../dto/goal.response.dto";
import { ErrorManager } from "src/utils/errors/error.manager";
import { mapper } from "src/utils/mapping/mapper";
import { Goal } from "../../domain/model/goal.model";

@Injectable()
export class GoalImplService implements GoalService {
    constructor(
        private readonly goalRepository: GoalImplRepository
    ){}
    
    async createGoal(goal: CreateGoalRequestDTO): Promise<IGenericResponse<CreateGoalResponseDTO>> {
        try{
            const goalModel = mapper.map(goal, CreateGoalRequestDTO, Goal);

            const responseGoal = await this.goalRepository.create(goalModel);

            if (!responseGoal) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Goal not was created`
                })
            }

            const mapGoal = mapper.map(responseGoal, Goal, GoalResponseDTO);

            return {
                success: true,
                data: mapGoal,
                messages: ['Goal successfully created'],
                code: HttpStatus.CREATED
            };
        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async updateGoalByDogIdAndId(dog_id: string, id: string, goal: GoalRequestDTO): Promise<IGenericResponse<GoalResponseDTO>> {
        try{
            const responseGoal = await this.goalRepository.update({dog_id: dog_id,id: id},goal);

            if (!responseGoal) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Goal not was found to update`
                })
            }

            const mapGoal = mapper.map(responseGoal, Goal, GoalResponseDTO);

            return {
                success: true,
                data: mapGoal,
                messages: ['Goal successfully updated'],
                code: HttpStatus.OK
            };

        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async deleteGoalByDogIdAndId(dog_id: string, id: string): Promise<IGenericResponse<null>> {
        try{
            await this.goalRepository.delete({dog_id: dog_id, id: id});

            return {
                success: true,
                code: HttpStatus.OK,
                messages: ['Goal successfully deleted']
            }
        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async findOneGoalByDogIdAndId(dog_id: string, id: string): Promise<IGenericResponse<GoalResponseDTO>> {
        try{
            const goalResp = await this.goalRepository.findOne({dog_id: dog_id, id: id});
            if(!goalResp){
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Goal not was founded`
                })
            }

            const mapGoal = mapper.map(goalResp, Goal, GoalResponseDTO);

            return {
                success: true,
                data: mapGoal,
                messages: ['Goal successfully founded'],
                code: HttpStatus.OK
            };

        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    async findAllByDogIdAndFilters(dog_id: string, is_completed: boolean, start_date: string, end_date: string): Promise<IPaginatedResponse<GoalResponseDTO>> {
        const goalsFiltered = await this.goalRepository.findAllByDogIdAndFilters(dog_id,is_completed,start_date,end_date);
        return {
            success: true,
            size: goalsFiltered.length,
            items: goalsFiltered,
            recordsTotal: undefined,
            startKey: undefined,
            lastKey: undefined
        }
    }
}