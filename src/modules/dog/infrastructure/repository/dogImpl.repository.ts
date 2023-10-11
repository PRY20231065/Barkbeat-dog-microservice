import { Injectable } from "@nestjs/common";
import { DogRepository } from "../../domain/interface/dog.repository";
import { Dog, DogKey } from "../../domain/model/dog.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';
import { IPaginatedStartKey } from "src/utils/generic";


@Injectable()
export class DogImplRepository implements DogRepository {
  

    constructor(
        @InjectModel('dog')
        private readonly dogModel: Model<Dog, DogKey>
    ) { }

    async update(key: DogKey, dog: Partial<Dog>): Promise<Dog> {
        const findDog = await this.dogModel.get(key);
        if(!findDog){
            return null;
        }
        const dogUpdated = await this.dogModel.update(key, dog);
        return dogUpdated;
    }

    async findOne(key: DogKey): Promise<Dog> {
        const dog = await this.dogModel.get(key);
        return dog;
    }

    async findDogsByOwnerId(owner_id: string, size: string, startKey: string): Promise<any> {
        const queryCount = await this.dogModel.query('owner_id').eq(owner_id);
        const totalCount = await queryCount.count().exec();

        const queryItems = await this.dogModel.query('owner_id').eq(owner_id);
        

        if(size) queryItems.limit(+size);
        if(startKey) {
            const startKeyObj = (JSON.parse(startKey) as IPaginatedStartKey)
            queryItems.startAt(startKeyObj);
        }

        const dogs = await queryItems.exec();
        return {dogs, totalCount};
    }

    async create(dog: Dog): Promise<Dog> {
        dog.id = uuid.v4();
        const dogCreated = await this.dogModel.create(dog);
        return dogCreated;
    }


    async findAll(size: string, startKey: string): Promise<any> {
        const totalCount = await this.dogModel.scan().count().exec();
        const queryItems = await this.dogModel.scan();

        if(size) queryItems.limit(+size);
        if(startKey) {
            const startKeyObj = (JSON.parse(startKey) as IPaginatedStartKey)
            queryItems.startAt(startKeyObj);
        }

        const dogs = await queryItems.exec();
        return {dogs, totalCount};

    }

    async findDogsByVeterinarianId(vet_id: string, size: string, startKey: string): Promise<any> {
        const queryCount = await this.dogModel.query('veterinarian_id').eq(vet_id);
        const totalCount = await queryCount.count().exec();

        const queryItems = await this.dogModel.query('veterinarian_id').eq(vet_id);
        
        if(size) queryItems.limit(+size);
        if(startKey) {
            const startKeyObj = (JSON.parse(startKey) as IPaginatedStartKey)
            queryItems.startAt(startKeyObj);
        }

        const dogs = await queryItems.exec();
        return {dogs, totalCount};
    }


    async findDogsWithoutVeterinarianId() {
        const queryItems = await this.dogModel.scan().where('veterinarian_id').not().exists();
        const dogs = await queryItems.exec();
        return dogs;
    }

    async findDogsByBreedId(breed_id: string, size: string, startKey: string): Promise<any> {

        const queryCount = await this.dogModel.query('breed_id').eq(breed_id);
        const totalCount = await queryCount.count().exec();

        const queryItems = await this.dogModel.query('breed_id').eq(breed_id);
        

        if(size) queryItems.limit(+size);
        if(startKey) {
            const startKeyObj = (JSON.parse(startKey) as IPaginatedStartKey)
            queryItems.startAt(startKeyObj);
        }

        const dogs = await queryItems.exec();
        return {dogs, totalCount};
    }


}