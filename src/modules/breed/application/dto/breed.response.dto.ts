import { AutoMap } from "@automapper/classes";

export class BreedResponseDTO {
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;
}