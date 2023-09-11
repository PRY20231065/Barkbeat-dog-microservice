import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { CreateDogRequestDTO } from 'src/modules/dog/application/dto/create-dog.request.dto';
import { Dog } from 'src/modules/dog/domain/model/dog.model';
import { DogRequestDTO } from 'src/modules/dog/application/dto/dog.request.dto';
import { BreedRequestDTO } from 'src/modules/breed/application/dto/breed.request.dto';
import { Breed } from 'src/modules/breed/domain/model/breed.model';
import { Goal } from 'src/modules/goal/domain/model/goal.model';
import { CreateGoalRequestDTO } from 'src/modules/goal/application/dto/create-goal.request.dto';
import { GoalRequestDTO } from 'src/modules/goal/application/dto/goal.request.dto';




export const resourceToModel = () => {
    createMap(mapper, CreateDogRequestDTO, Dog);
    createMap(mapper, DogRequestDTO, Dog);
    createMap(mapper, BreedRequestDTO, Breed);
    createMap(mapper, CreateGoalRequestDTO, Goal);
    createMap(mapper, GoalRequestDTO, Goal);
}
