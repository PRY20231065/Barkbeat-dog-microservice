import { AutoMap } from "@automapper/classes";

export class BreedKey {
    @AutoMap()
    id: string;
}

export class Breed extends BreedKey {
    @AutoMap()
    name:string;
}