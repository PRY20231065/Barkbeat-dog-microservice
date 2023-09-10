import { IGenericResponse, IPaginatedResponse } from "src/utils/generic";
import { CreateDogRequestDTO } from "../../application/dto/create-dog.request.dto";
import { CreateDogResponseDTO } from "../../application/dto/create-dog.response.dto";
import { DogRequestDTO } from "../../application/dto/dog.request.dto";
import { DogResponseDTO } from "../../application/dto/dog.response.dto";
import { Dog } from "../model/dog.model";
import { PaginatedRequest } from "../../application/dto/pagination/paginated.request";



export interface DogService {
    createDog(dog: CreateDogRequestDTO): Promise<IGenericResponse<CreateDogResponseDTO>>;
    updateDogByOwnerIdAndId(owner_id: string, id: string, dog: DogRequestDTO)
    findOneDogByOwnerIdAndId(owner_id: string, id: string): Promise<IGenericResponse<DogResponseDTO>>;
    findAllDogs(pagination: PaginatedRequest): Promise<IPaginatedResponse<Dog>>;
    findDogsByVeterinarianId(pagination: PaginatedRequest): Promise<IPaginatedResponse<Dog>>;
    findDogsByBreedId(pagination: PaginatedRequest): Promise<IPaginatedResponse<Dog>>;
    findDogsByOwnerId(pagination: PaginatedRequest): Promise<IPaginatedResponse<Dog>>;
    /*updateVetByKey(key: string, vet: VetRequestDTO): Promise<IGenericResponse<VetResponseDTO>>;
    findOneVetByKey(key: string): Promise<IGenericResponse<VetResponseDTO>>;
    findAllVets(): Promise<VetResponseDTO[]>;*/
}