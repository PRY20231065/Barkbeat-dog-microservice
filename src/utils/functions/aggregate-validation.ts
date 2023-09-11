import { catchError, firstValueFrom } from "rxjs";
import { ErrorManager } from "../errors/error.manager";
import { AxiosError } from "axios";
import { BreedImplRepository } from "src/modules/breed/infrastructure/repository/breedImpl.repository";
import { DogImplRepository } from "src/modules/dog/infrastructure/repository/dogImpl.repository";
import { HttpService } from "@nestjs/axios";
import { JwtService } from "@nestjs/jwt";

export async function validateBreedExistence(breedId: string, breedRepository: BreedImplRepository) {
    const breed = await breedRepository.findOne({ id: breedId });
    if (!breed) {
        throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `breed_id does not correspond to an existing breed`
        });
    }
}

export async function validateDogExistence(dogId: string, ownerId: string, dogRepository: DogImplRepository) {
    const dog = await dogRepository.findOne({ id: dogId, owner_id: ownerId });
    if (!dog) {
        throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `dog_id and owner_id do not correspond to an existing dog`
        });
    }
}

export async function validateOwnerExistence(ownerId: string, jwtService: JwtService ,httpService: HttpService) {
    const token = await generateBearerToken(jwtService);
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    await firstValueFrom(
        httpService.get(
            `${process.env.USER_API_URL}/owners/${ownerId}`,
            requestConfig).pipe(
                catchError((error: AxiosError) => {
                    const data: any = error.response.data;

                    if(data.code == 404){
                        throw new ErrorManager({
                            type: 'NOT_FOUND',
                            message: `owner_id does not correspond to an existing owner`
                        });
                    }
                    else{
                        throw new ErrorManager({
                            type: 'BAD_REQUEST',
                            message: data.message
                        });
                    }

                }),
            )
    );
}

export async function validateVetExistence(vetId: string, jwtService: JwtService, httpService: HttpService) {
    const token = await generateBearerToken(jwtService);
    const requestConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    await firstValueFrom(
        httpService.get(
            `${process.env.USER_API_URL}/veterinarians/${vetId}`,
            requestConfig).pipe(
                catchError((error: AxiosError) => {
                    const data: any = error.response? error.response.data: error.cause;
                    //console.log(data);

                    if(data.code == 404){
                        throw new ErrorManager({
                            type: 'NOT_FOUND',
                            message: `veterinarian_id does not correspond to an existing vet`
                        });
                    }
                    else{
                        throw new ErrorManager({
                            type: 'BAD_REQUEST',
                            message: data.message
                        });
                    }

                }),
            )
    );
}



async function generateBearerToken(jwtService: JwtService): Promise<string> {
    const payload = {
        agw: process.env.PAYLOAD_AGW_KEY,
        exp: Math.round(
            (new Date().getTime() / 1000)
            + Number(process.env.PAYLOAD_EXP_TIME),
        ),
    };
    

    return await jwtService.signAsync(payload);
}