import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { CreateDogRequestDTO } from 'src/modules/dog/application/dto/create-dog.request.dto';
import { Dog } from 'src/modules/dog/domain/model/dog.model';
import { DogRequestDTO } from 'src/modules/dog/application/dto/dog.request.dto';




export const resourceToModel = () => {
    createMap(mapper, CreateDogRequestDTO, Dog);
    createMap(mapper, DogRequestDTO, Dog);
    //createMap(mapper, CreateVetRequestDTO, Vet);
    //createMap(mapper, VetRequestDTO, Vet);
}
