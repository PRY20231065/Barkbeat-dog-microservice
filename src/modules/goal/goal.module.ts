import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { GoalImplService } from './application/service/goalImpl.service';
import { GoalImplRepository } from './infrastructure/repository/goalImpl.repository';
import { GoalController } from './infrastructure/controller/goal.controller';
import { HttpModule } from '@nestjs/axios';
import { GoalSchema } from './domain/schema/goal.schema';
import { DogModule } from '../dog/dog.module';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'goal',
                schema: GoalSchema,
            },
        ]),
        HttpModule,
        DogModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                privateKey: fs.readFileSync(path.resolve(__dirname, '../../keys/private.key')),
                publicKey: fs.readFileSync(path.resolve(__dirname, '../../keys/public.key')),
                signOptions: { algorithm: 'RS256' },
            }),
        }),
        
    ],
    controllers: [GoalController],
    providers: [GoalImplService, GoalImplRepository],
    exports:[GoalImplService]
})
export class GoalModule { }