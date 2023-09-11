import { HttpStatus, Injectable } from "@nestjs/common";
import { BreedService } from "../../domain/interface/breed.service";
import { BreedImplRepository } from "../../infrastructure/repository/breedImpl.repository";
import { BreedRequestDTO } from "../dto/breed.request.dto";
import { BreedResponseDTO } from "../dto/breed.response.dto";
import { ErrorManager } from "src/utils/errors/error.manager";
import { mapper } from "src/utils/mapping/mapper";
import { Breed } from "../../domain/model/breed.model";
import { IGenericResponse } from "src/utils/generic";

@Injectable()
export class BreedImplService implements BreedService{
    constructor(private readonly breedRepository: BreedImplRepository){}
    
    async createBreed(breedReq: BreedRequestDTO): Promise<IGenericResponse<BreedResponseDTO>> {
        try{
            const breedModel = mapper.map(breedReq, BreedRequestDTO, Breed);

            const responseBreed = await this.breedRepository.create(breedModel);

            if (!responseBreed) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Breed not was created`
                })
            }

            const mapDog = mapper.map(responseBreed, Breed, BreedResponseDTO);

            return {
                success: true,
                data: mapDog,
                messages: ['Breed successfull created'],
                code: HttpStatus.CREATED
            };
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    async updateBreed(id: string, breedReq: BreedRequestDTO): Promise<IGenericResponse<BreedResponseDTO>> {
        try{
            
            const responseBreed = await this.breedRepository.update({id: id},breedReq);

            if (!responseBreed) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Breed not was found to update`
                })
            }

            const mapDog = mapper.map(responseBreed, Breed, BreedResponseDTO);

            return {
                success: true,
                data: mapDog,
                messages: ['Breed successfully updated'],
                code: HttpStatus.OK
            };

        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    async deleteBreed(id: string): Promise<IGenericResponse<null>> {
        try{
            await this.breedRepository.delete({id: id});

            return {
                success: true,
                code: HttpStatus.OK,
                messages: ['Breed successfully deleted']
            }
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    async listAllBreeds() {
        try{
            return await this.breedRepository.findAll();
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    
    async findOneBreedById(id: string): Promise<IGenericResponse<BreedResponseDTO>> {
        try{
            const responseBreed = await this.breedRepository.findOne({id: id});

            if (!responseBreed) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Breed not was founded`
                })
            }

            const mapDog = mapper.map(responseBreed, Breed, BreedResponseDTO);

            return {
                success: true,
                data: mapDog,
                messages: ['Breed successfull founded'],
                code: HttpStatus.OK
            };
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message);
        }
    }

}