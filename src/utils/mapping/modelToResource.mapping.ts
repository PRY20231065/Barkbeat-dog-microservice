import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { Dog } from 'src/modules/dog/domain/model/dog.model';
import { CreateDogResponseDTO } from 'src/modules/dog/application/dto/create-dog.response.dto';
import { DogResponseDTO } from 'src/modules/dog/application/dto/dog.response.dto';
import { Breed } from 'src/modules/breed/domain/model/breed.model';
import { BreedResponseDTO } from 'src/modules/breed/application/dto/breed.response.dto';



export const modelToResource = () =>{
    createMap(mapper, Dog, CreateDogResponseDTO);
    createMap(mapper, Dog, DogResponseDTO);
    createMap(mapper, Breed, BreedResponseDTO);
    //createMap(mapper, Vet, CreateVetResposeDTO);
}
