import { AutoMap } from "@automapper/classes";

export class GoalKey {
    @AutoMap()
    id: string;
    @AutoMap()
    dog_id: string;
}

export class Goal extends GoalKey {
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