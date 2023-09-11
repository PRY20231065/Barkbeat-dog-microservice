import { Breed, BreedKey } from "../model/breed.model";

export interface BreedRepository {
    create(breed: Breed): Promise<Breed>;
    update(key: BreedKey, breed: Partial<Breed>): Promise<Breed>;
    delete(key: BreedKey): Promise<void>;
    findOne(key: BreedKey): Promise<Breed>;
    findAll(): Promise<Breed[]>
}