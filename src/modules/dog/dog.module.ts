import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { DogSchema } from './domain/schema/dog.schema';
import { DogImplRepository } from './infrastructure/repository/dogImpl.repository';
import { DogImplService } from './application/service/dogimpl.service';
import { DogController } from './infrastructure/controller/dog.controller';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'dog',
                schema: DogSchema,
            },
        ]),

    ],
    controllers: [DogController],
    providers: [DogImplService, DogImplRepository],
})
export class DogModule { }
