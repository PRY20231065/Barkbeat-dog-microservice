import { Dog, DogKey } from "../model/dog.model";

export interface DogRepository {
    create(dog: Dog): Promise<Dog>;
    update(key: DogKey, dog: Partial<Dog>): Promise<Dog>;
    findOne(key: DogKey): Promise<Dog>;
    findAll(): Promise<Dog[]>;
    findDogsByVeterinarianId(vetId: string): Promise<Dog[]>;
    findDogsByBreedId(breedId: string, size: string, startKey: string): Promise<Dog[]>;
    findDogsByOwnerId(ownerId: string): Promise<Dog[]>;
}