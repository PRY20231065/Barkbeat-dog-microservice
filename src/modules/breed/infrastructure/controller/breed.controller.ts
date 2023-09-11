import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { BreedImplService } from "../../application/service/breedImpl.service";
import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { BreedRequestDTO } from "../../application/dto/breed.request.dto";

@ApiTags('breeds')
@Controller('breeds')
export class BreedController {
    constructor(private readonly breedService: BreedImplService){}

    @ApiOperation({ summary: 'Registrar una raza' })
    @Post()
    async registerABreed(@Body() breedReq: BreedRequestDTO){
        return await this.breedService.createBreed(breedReq);
    }

    @ApiOperation({ summary: 'Actualizar una raza' })
    @Put(':breedId')
    async updateABreed(@Param('breedId') breedId: string, @Body() breedReq: BreedRequestDTO){
        return await this.breedService.updateBreed(breedId,breedReq);
    }

    @ApiOperation({ summary: 'Obtener una raza' })
    @Get(':breedId')
    async getABreed(@Param('breedId') breedId: string){
        return await this.breedService.findOneBreedById(breedId);
    }

    @ApiOperation({ summary: 'Obtener las razas' })
    @Get()
    async getBreeds(){
        return await this.breedService.listAllBreeds();
    }


    @ApiOperation({ summary: 'Eliminar una raza' })
    @Delete(':breedId')
    async deleteABreed(@Param('breedId') breedId: string){
        return await this.breedService.deleteBreed(breedId);
    }
}