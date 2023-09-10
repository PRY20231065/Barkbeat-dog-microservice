import { AutoMap } from "@automapper/classes";

export class DogResponseDTO {
    
    @AutoMap()
    id: string;
    
    @AutoMap()
    owner_id: string;

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