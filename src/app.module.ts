import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DogModule } from './modules/dog/dog.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
