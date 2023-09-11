import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { DogSchema } from './domain/schema/dog.schema';
import { DogImplRepository } from './infrastructure/repository/dogImpl.repository';
import { DogImplService } from './application/service/dogimpl.service';
import { DogController } from './infrastructure/controller/dog.controller';
import { BreedModule } from '../breed/breed.module';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'dog',
                schema: DogSchema,
            },
        ]),
        BreedModule,
        HttpModule
    ],
    controllers: [DogController],
    providers: [DogImplService, DogImplRepository],
    exports:[DogImplRepository]
})
export class DogModule { }
