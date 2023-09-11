import { Injectable } from "@nestjs/common";
import { BreedRepository } from "../../domain/interface/breed.repository";
import { InjectModel, Model } from "nestjs-dynamoose";
import { Breed, BreedKey } from "../../domain/model/breed.model";
import * as uuid from 'uuid';

@Injectable()
export class BreedImplRepository implements BreedRepository {
    constructor(
        @InjectModel('breed')
        private readonly breedModel: Model<Breed, BreedKey>
    ){}
    
    async create(breed: Breed): Promise<Breed> {
        breed.id = uuid.v4();
        const breedCreated = await this.breedModel.create(breed);
        return breedCreated;
    }
    
    async update(key: BreedKey, breed: Partial<Breed>): Promise<Breed> {
        const findBreed = await this.breedModel.get(key);
        if(!findBreed){
            return null;
        }
        const breedUpdated = await this.breedModel.update(key, breed);
        return breedUpdated;
    }
    
    async delete(key: BreedKey): Promise<void> {
        await this.breedModel.delete(key);
    }
    
    async findOne(key: BreedKey): Promise<Breed> {
        const findBreed = await this.breedModel.get(key);
        if(!findBreed){
            return null;
        }
        return findBreed;
    }
    
    async findAll(): Promise<Breed[]> {
        const breeds = await this.breedModel.scan().exec();
        return breeds;
    }
}