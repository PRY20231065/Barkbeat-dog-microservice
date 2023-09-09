import { Injectable } from "@nestjs/common";
import { DogRepository } from "../../domain/interface/dog.repository";
import { Dog, DogKey } from "../../domain/model/dog.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';

@Injectable()
export class DogImplRepository implements DogRepository {

    constructor(
        @InjectModel('dog')
        private readonly dogModel: Model<Dog, DogKey>
    ){}
   
    async update(key: DogKey, dog: Partial<Dog>): Promise<Dog> {
        const dogUpdated = await this.dogModel.update(key, dog);
        return dogUpdated;
    }
    
    async findOne(key: DogKey): Promise<Dog> {
        const dog = await this.dogModel.get(key);
        return dog;
    }
    
    async findDogsByOwnerId(ownerId: string): Promise<Dog[]> {
        const dogs = await this.dogModel.query('owner_id').eq(ownerId).exec();
        return dogs;
    }
    
    async create(dog: Dog): Promise<Dog> {
        dog.id = uuid.v4();
        const dogCreated = await this.dogModel.create(dog);
        return dogCreated;
    }
    
    
    async findAll(): Promise<Dog[]> {
        return await this.dogModel.scan().exec();
    }
    
    async findDogsByVeterinarianId(vetId: string): Promise<Dog[]> {
        const dogs = await this.dogModel.query('veterinarian_id').eq(vetId).exec();
        return dogs;
    }
    
    async findDogsByBreedId(breedId: string): Promise<Dog[]> {
        const dogs = await this.dogModel.query('breed_id').eq(breedId).exec();
        return dogs;
    }
    
    
}