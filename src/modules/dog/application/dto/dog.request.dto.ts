import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class DogRequestDTO {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @AutoMap()
    name: string;

    @ApiProperty()
    @Max(15)
    @Min(1)
    @IsNumber()
    @IsOptional()
    @AutoMap()
    age: number;

    @ApiProperty()
    @IsOptional()
    @Transform((params: TransformFnParams) => {
        console.log(params)
        return parseFloat(params.value);
      })
    @AutoMap()
    weight: number;

    @ApiProperty({})
    @IsOptional()
    @IsNotEmpty()
    @AutoMap()
    veterinarian_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @AutoMap()
    breed_id: string;

    @ApiProperty()
    @IsOptional()
    @AutoMap()
    note: string;
}