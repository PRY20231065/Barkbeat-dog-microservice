import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { GoalImplService } from './application/service/goalImpl.service';
import { GoalImplRepository } from './infrastructure/repository/goalImpl.repository';
import { GoalController } from './infrastructure/controller/goal.controller';
import { HttpModule } from '@nestjs/axios';
import { GoalSchema } from './domain/schema/goal.schema';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'goal',
                schema: GoalSchema,
            },
        ]),
        HttpModule
    ],
    controllers: [GoalController],
    providers: [GoalImplService, GoalImplRepository],
    exports:[GoalImplService]
})
export class GoalModule { }