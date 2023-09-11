import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";

export class GoalRequestDTO {

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    description: string;
    
    @ApiProperty()
    @IsBoolean()
    @AutoMap()
    is_completed: boolean;
    
    @ApiProperty()
    @IsDateString()
    @AutoMap()
    created_date: string;
}