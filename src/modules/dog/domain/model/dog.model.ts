import { AutoMap } from "@automapper/classes";

export class DogKey {
    @AutoMap()
    owner_id: string;

    @AutoMap()
    id: string;
}


export class Dog extends DogKey {

    @AutoMap()
    name: string;

    @AutoMap()
    age: number;

    @AutoMap()
    weight: number;

    @AutoMap()
    veterinarian_id: string;

    @AutoMap()
    breed_id: string;

    @AutoMap()
    note: string;
}