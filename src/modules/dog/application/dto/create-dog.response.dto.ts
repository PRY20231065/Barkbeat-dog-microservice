import { AutoMap } from "@automapper/classes";

export class CreateDogResponseDTO {
    
    @AutoMap()
    owner_id: string;

    @AutoMap()
    id: string;

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