import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { Dog } from 'src/modules/dog/domain/model/dog.model';
import { CreateDogResponseDTO } from 'src/modules/dog/application/dto/create-dog.response.dto';



export const modelToResource = () =>{
    createMap(mapper, Dog, CreateDogResponseDTO);
    //createMap(mapper, Owner, CreateOwnerResposeDTO);
    //createMap(mapper, Vet, VetResponseDTO);
    //createMap(mapper, Vet, CreateVetResposeDTO);
}
