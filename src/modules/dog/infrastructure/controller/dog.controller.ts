import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateDogRequestDTO } from "../../application/dto/create-dog.request.dto";
import { DogRequestDTO } from "../../application/dto/dog.request.dto";
import { PaginatedRequest } from "../../application/dto/pagination/paginated.request";
import { DogImplService } from "../../application/service/dogImpl.service";



@ApiTags('dogs')
@Controller('dogs')
export class DogController {
    constructor(private readonly dogService: DogImplService){}

    @ApiOperation({ summary: 'Registrar un dog' })
    @Post()
    async registerADog(@Body() dogReq: CreateDogRequestDTO){
        return await this.dogService.createDog(dogReq);
    }

    @ApiOperation({ summary: 'Actualizar un dog' })
    @Put(':dogId/owner/:ownerId')
    async updateADog(@Param('dogId') dogId: string, @Param('ownerId') ownerId: string, @Body() dogReq: DogRequestDTO){
        return await this.dogService.updateDogByOwnerIdAndId(ownerId, dogId,dogReq);
    }

    @ApiOperation({ summary: 'Obtener un dog' })
    @Get(':dogId/owner/:ownerId')
    async getADog(@Param('dogId') dogId: string, @Param('ownerId') ownerId: string){
        return await this.dogService.findOneDogByOwnerIdAndId(ownerId,dogId);
    }

    @ApiOperation({ summary: 'Obtener todos los dog' })
    @ApiQuery({ name: 'size', type: Number, required: false })
    @ApiQuery({ name: 'startKey', type: String, required: false })
    @Get()
    async getDogs(@Query() pagination: PaginatedRequest){
        return await this.dogService.findAllDogs(pagination);
    }

    /*@ApiOperation({ summary: 'Obtener dogs por OwnerId' })
    @ApiQuery({ name: 'ownerId', type: String, required: true })
    @Get('filter')
    async getDogsByOwnerId(@Query() ownerId: string){
        return await this.dogService.findDogsByOwnerId(ownerId);
    }*/

    @ApiOperation({ summary: 'Obtener dogs por BreedId' })
    @ApiQuery({ name: 'breed_id', type: String, required: true })
    @ApiQuery({ name: 'size', type: Number, required: false })
    @ApiQuery({ name: 'startKey', type: String, required: false })
    @Get('filterByBreed')
    async getDogsByBreedId(@Query() pagination: PaginatedRequest){
        return await this.dogService.findDogsByBreedId(pagination);
    }

    @ApiOperation({ summary: 'Obtener dogs por OwnerId' })
    @ApiQuery({ name: 'owner_id', type: String, required: true })
    @ApiQuery({ name: 'size', type: Number, required: false })
    @ApiQuery({ name: 'startKey', type: String, required: false })
    @Get('filterByOwner')
    async getDogsByOwnerId(@Query() pagination: PaginatedRequest){
        return await this.dogService.findDogsByOwnerId(pagination);
    }

    @ApiOperation({ summary: 'Obtener dogs por VetId' })
    @ApiQuery({ name: 'vet_id', type: String, required: true })
    @ApiQuery({ name: 'size', type: Number, required: false })
    @ApiQuery({ name: 'startKey', type: String, required: false })
    @Get('filterByVet')
    async getDogsByVetId(@Query() pagination: PaginatedRequest){
        return await this.dogService.findDogsByVeterinarianId(pagination);
    }
}