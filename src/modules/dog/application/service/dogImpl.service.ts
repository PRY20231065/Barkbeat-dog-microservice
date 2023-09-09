import { HttpStatus, Injectable } from '@nestjs/common';
import { DogImplRepository } from '../../infrastructure/repository/dogImpl.repository';
import { DogService } from '../../domain/interface/dog.service';
import { IGenericResponse } from 'src/utils/generic';
import { CreateDogRequestDTO } from '../dto/create-dog.request.dto';
import { CreateDogResponseDTO } from '../dto/create-dog.response.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { Dog } from '../../domain/model/dog.model';
import { ErrorManager } from 'src/utils/errors/error.manager';

@Injectable()
export class DogImplService implements DogService { 
    constructor(private readonly dogRepository: DogImplRepository){}
    
    async createDog(dogRequest: CreateDogRequestDTO): Promise<IGenericResponse<CreateDogResponseDTO>> {
        try {
            const dogModel =  mapper.map(dogRequest, CreateDogRequestDTO, Dog);
 
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
