import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { CreateDogRequestDTO } from 'src/modules/dog/application/dto/create-dog.request.dto';
import { Dog } from 'src/modules/dog/domain/model/dog.model';




export const resourceToModel = () => {
    createMap(mapper, CreateDogRequestDTO, Dog);
    //createMap(mapper, OwnerRequestDTO, Owner);
    //createMap(mapper, CreateVetRequestDTO, Vet);
    //createMap(mapper, VetRequestDTO, Vet);
}
