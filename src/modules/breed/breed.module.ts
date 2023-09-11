import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { BreedSchema } from './domain/schema/breed.schema';
import { BreedImplRepository } from './infrastructure/repository/breedImpl.repository';
import { BreedImplService } from './application/service/breedImpl.service';
import { BreedController } from './infrastructure/controller/breed.controller';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'breed',
                schema: BreedSchema,
            },
        ]),

    ],
    controllers: [BreedController],
    providers: [BreedImplService, BreedImplRepository],
    exports:[BreedImplService]
})
export class BreedModule { }
