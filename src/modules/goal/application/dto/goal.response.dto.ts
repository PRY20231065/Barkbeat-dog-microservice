import { AutoMap } from "@automapper/classes";

export class GoalResponseDTO {
    
    @AutoMap()
    id: string;

    @AutoMap()
    dog_id: string;

    @AutoMap()
    title: string;
    
    @AutoMap()
    description: string;

    @AutoMap()
    veterinarian_id: string;
    
    @AutoMap()
    is_completed: boolean;
    
    @AutoMap()
    created_date: string;
}