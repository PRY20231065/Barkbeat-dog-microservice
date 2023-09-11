import { IGenericResponse } from "src/utils/generic";
import { BreedRequestDTO } from "../../application/dto/breed.request.dto";
import { BreedResponseDTO } from "../../application/dto/breed.response.dto";

export interface BreedService {
    createBreed(breedReq: BreedRequestDTO): Promise<IGenericResponse<BreedResponseDTO>>;
    updateBreed(id: string,breedReq: BreedRequestDTO): Promise<IGenericResponse<BreedResponseDTO>>;
    deleteBreed(id: string): Promise<IGenericResponse<null>>;
    listAllBreeds();
    findOneBreedById(id: string): Promise<IGenericResponse<BreedResponseDTO>>;
}