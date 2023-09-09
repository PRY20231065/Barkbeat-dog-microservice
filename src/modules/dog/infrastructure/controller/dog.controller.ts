import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DogImplService } from "../../application/service/dogimpl.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateDogRequestDTO } from "../../application/dto/create-dog.request.dto";

@ApiTags('dogs')
@Controller('dogs')
export class DogController {
    constructor(private readonly dogService: DogImplService){}

    @ApiOperation({ summary: 'Registrar un dog' })
    @Post()
    async registerAnVet(@Body() dogReq: CreateDogRequestDTO){
        return await this.dogService.createDog(dogReq);
    }
}