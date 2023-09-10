import { IPaginatedRequest, IPaginatedStartKey } from "src/utils/generic";

export class ByBreedPaginatedRequest implements IPaginatedRequest {
    startKey: string; 
    size: string;
    breed_id: string;
}

export class ByBreedPaginatedStartKey implements IPaginatedStartKey {
    id: string;
    breed_id: string;
    owner_id: string;
} 