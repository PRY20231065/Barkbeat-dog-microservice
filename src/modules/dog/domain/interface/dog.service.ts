import { IGenericResponse } from "src/utils/generic";
import { CreateDogRequestDTO } from "../../application/dto/create-dog.request.dto";
import { CreateDogResponseDTO } from "../../application/dto/create-dog.response.dto";


export interface DogService {
    createDog(dog: CreateDogRequestDTO): Promise<IGenericResponse<CreateDogResponseDTO>>;
    /*updateVetByKey(key: string, vet: VetRequestDTO): Promise<IGenericResponse<VetResponseDTO>>;
    findOneVetByKey(key: string): Promise<IGenericResponse<VetResponseDTO>>;
    findAllVets(): Promise<VetResponseDTO[]>;*/
}