import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { GoalImplService } from "../../application/service/goalImpl.service";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateGoalRequestDTO } from "../../application/dto/create-goal.request.dto";
import { GoalRequestDTO } from "../../application/dto/goal.request.dto";
import { IsDateString } from "class-validator";

@ApiTags('goals')
@Controller('goals')
export class GoalController {
    constructor(private readonly goalService: GoalImplService){}

    @ApiOperation({ summary: 'Registrar un objetivo' })
    @Post()
    async registerGoal(@Body() createGoal: CreateGoalRequestDTO){
        return await this.goalService.createGoal(createGoal);
    }

    @ApiOperation({ summary: 'Actualizar un objetivo' })
    @Put(":id/dogs/:dogId")
    async updateGoal(@Param('id') id: string, @Param('dogId') dogId: string, @Body() updateGoal: GoalRequestDTO){
        return await this.goalService.updateGoalByDogIdAndId(dogId,id,updateGoal);
    }

    @ApiOperation({ summary: 'Eliminar un objetivo' })
    @Delete(":id/dogs/:dogId")
    async deleteGoal(@Param('id') id: string, @Param('dogId') dogId: string){
        return await this.goalService.deleteGoalByDogIdAndId(dogId,id);
    }

    @ApiOperation({ summary: 'Obtener un objetivo' })
    @Get(":id/dogs/:dogId")
    async getGoal(@Param('id') id: string, @Param('dogId') dogId: string){
        return await this.goalService.findOneGoalByDogIdAndId(dogId,id);
    }

    @ApiOperation({ summary: 'Listar objetivos' })
    @ApiQuery({ name: 'dog_id', type: String, required: true })
    @ApiQuery({ name: 'is_completed', type: Boolean, required: false })
    @ApiQuery({ name: 'start_date', type: String, required: false })
    @ApiQuery({ name: 'end_date', type: String, required: false })
    @Get()
    async getGoalsByFilters(
        @Query('dog_id') dog_id: string,
        @Query('is_completed') is_completed: boolean,
        @Query('start_date') start_date: string,
        @Query('end_date') end_date: string
    ){
        return await this.goalService.findAllByDogIdAndFilters(dog_id,is_completed,start_date, end_date);
    }
}