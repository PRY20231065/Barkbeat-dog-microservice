import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DogModule } from './modules/dog/dog.module';
import { DatabaseModule } from './common/database/database.module';
import { BreedModule } from './modules/breed/breed.module';
import { GoalModule } from './modules/goal/goal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DogModule,
    BreedModule,
    GoalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
