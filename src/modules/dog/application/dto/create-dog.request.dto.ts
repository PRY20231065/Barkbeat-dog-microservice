import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsDecimal, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateDogRequestDTO {

    //id como es clave de ordenacion se genera
    
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    owner_id: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    name: string;

    @ApiProperty()
    @Max(15)
    @Min(1)
    @IsNumber()
    @AutoMap()
    age: number;

    @ApiProperty()
    @Transform((params: TransformFnParams) => {
        return parseFloat(params.value);
      })
    @AutoMap()
    weight: number;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    veterinarian_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @AutoMap()
    breed_id: string;

    @ApiProperty()
    @AutoMap()
    note: string;
}