import { Module } from '@nestjs/common';
import { DynamooseModule } from 'nestjs-dynamoose';
import { DogSchema } from './domain/schema/dog.schema';
import { DogImplRepository } from './infrastructure/repository/dogImpl.repository';
import { DogImplService } from './application/service/dogImpl.service';
import { DogController } from './infrastructure/controller/dog.controller';
import { BreedModule } from '../breed/breed.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'dog',
                schema: DogSchema,
            },
        ]),
        BreedModule,
        HttpModule,
        JwtModule.registerAsync({
            useFactory: async () => ({
                privateKey: fs.readFileSync(path.resolve(__dirname, '../../keys/private.key')),
                publicKey: fs.readFileSync(path.resolve(__dirname, '../../keys/public.key')),
                signOptions: { algorithm: 'RS256' },
            }),
        }),
    ],
    controllers: [DogController],
    providers: [DogImplService, DogImplRepository],
    exports:[DogImplRepository]
})
export class DogModule { }
