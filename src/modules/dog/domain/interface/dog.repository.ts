import { Dog, DogKey } from "../model/dog.model";

export interface DogRepository {
    create(dog: Dog): Promise<Dog>;
    update(key: DogKey, dog: Partial<Dog>): Promise<Dog>;
    findOne(key: DogKey): Promise<Dog>;
    findAll(size: string, startKey: string): Promise<any>
    findDogsByVeterinarianId(vet_id: string, size: string, startKey: string): Promise<any>;
    findDogsByBreedId(breed_id: string, size: string, startKey: string): Promise<Dog[]>;
    findDogsByOwnerId(owner_id: string, size: string, startKey: string): Promise<any>;
}