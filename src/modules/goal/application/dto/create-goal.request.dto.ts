import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";

export class CreateGoalRequestDTO {
    
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    title: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    owner_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    dog_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    veterinarian_id: string;
    
    @ApiProperty()
    @IsBoolean()
    @AutoMap()
    is_completed: boolean;
    
    @ApiProperty()
    @IsDateString()
    @AutoMap()
    created_date: string;
}