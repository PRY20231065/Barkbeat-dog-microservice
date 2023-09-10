import { HttpStatus, Injectable } from '@nestjs/common';
import { DogImplRepository } from '../../infrastructure/repository/dogImpl.repository';
import { DogService } from '../../domain/interface/dog.service';
import { IGenericResponse, IPaginatedRequest, IPaginatedResponse } from 'src/utils/generic';
import { CreateDogRequestDTO } from '../dto/create-dog.request.dto';
import { CreateDogResponseDTO } from '../dto/create-dog.response.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { Dog } from '../../domain/model/dog.model';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { DogRequestDTO } from '../dto/dog.request.dto';
import { DogResponseDTO } from '../dto/dog.response.dto';
import { ByBreedPaginatedRequest } from '../dto/pagination/by-breed-paginated.request';

@Injectable()
export class DogImplService implements DogService {
    constructor(private readonly dogRepository: DogImplRepository) { }

    async findOneDogByOwnerIdAndId(owner_id: string, id: string): Promise<IGenericResponse<DogResponseDTO>> {
        try {
            const responseDog = await this.dogRepository.findOne({ owner_id: owner_id, id: id });

            if (!responseDog) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Dog not was founded`
                })
            }

            const mapDog = mapper.map(responseDog, Dog, DogResponseDTO);

            return {
                success: true,
                data: mapDog,
                messages: ['Dog successfully founded'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findAllDogs(): Promise<Dog[]> {
        return await this.dogRepository.findAll();
    }

    async findDogsByVeterinarianId(vetId: string): Promise<Dog[]> {
        return await this.dogRepository.findDogsByVeterinarianId(vetId);
    }

    async findDogsByBreedId(pagination: ByBreedPaginatedRequest): Promise<IPaginatedResponse<Dog>> {
        try {
            if(!pagination.breed_id){
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `breed_id was not found in the query parameter`
                })
            }
            //console.log(pagination);
            const response = await this.dogRepository.findDogsByBreedId(pagination.breed_id, pagination.size, pagination.startKey);
            const { dogs, totalCount: { count } } = response;
            return {
                success: true,
                size: dogs.length,
                recordsTotal: count,
                startKey: pagination.startKey? JSON.parse(pagination.startKey): null,
                items: dogs,
                lastKey: dogs.lastKey ? dogs.lastKey : null,
            }
        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }

    }

    async findDogsByOwnerId(ownerId: string): Promise<Dog[]> {
        return await this.dogRepository.findDogsByOwnerId(ownerId);
    }

    async updateDogByOwnerIdAndId(owner_id: string, id: string, dogRequest: DogRequestDTO) {
        try {

            const responseDog = await this.dogRepository.update({ owner_id: owner_id, id: id }, dogRequest);
            const mapDog = mapper.map(responseDog, Dog, DogResponseDTO);
            return {
                success: true,
                data: mapDog,
                messages: ['Dog successfully updated'],
                code: HttpStatus.OK
            }

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async createDog(dogRequest: CreateDogRequestDTO): Promise<IGenericResponse<CreateDogResponseDTO>> {
        try {
            const dogModel = mapper.map(dogRequest, CreateDogRequestDTO, Dog);

            const responseDog = await this.dogRepository.create(dogModel);

            if (!responseDog) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Veterinarian not was created`
                })
            }

            const mapDog = mapper.map(responseDog, Dog, CreateDogResponseDTO);

            return {
                success: true,
                data: mapDog,
                messages: ['Dog successfull created'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }


}
