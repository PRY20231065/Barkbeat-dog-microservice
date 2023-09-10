import { Injectable } from "@nestjs/common";
import { DogRepository } from "../../domain/interface/dog.repository";
import { Dog, DogKey } from "../../domain/model/dog.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';
import { ByBreedPaginatedStartKey } from "../../application/dto/pagination/by-breed-paginated.request";

@Injectable()
export class DogImplRepository implements DogRepository {

    constructor(
        @InjectModel('dog')
        private readonly dogModel: Model<Dog, DogKey>
    ) { }

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

    async findDogsByBreedId(breedId: string, size: string, startKey: string): Promise<any> {

        const queryCount = await this.dogModel.query('breed_id').eq(breedId);
        const totalCount = await queryCount.count().exec();

        const queryItems = await this.dogModel.query('breed_id').eq(breedId);
        

        if(size) queryItems.limit(+size);
        if(startKey) {
            const startKeyObj = (JSON.parse(startKey) as ByBreedPaginatedStartKey)
            queryItems.startAt(startKeyObj);
        }

        const dogs = await queryItems.exec();
        return {dogs, totalCount};
    }


}