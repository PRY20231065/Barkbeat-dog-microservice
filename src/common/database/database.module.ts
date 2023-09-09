/*
https://docs.nestjs.com/modules
*/

import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DynamooseModule.forRoot({
            local: false,
            ddb: new DynamoDB({
                credentials: {
                    accessKeyId: process.env.DYNAMO_ACCESS_KEY,
                    secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY
                },
                region: process.env.DYNAMO_REGION
            }),
        }),
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule { }
