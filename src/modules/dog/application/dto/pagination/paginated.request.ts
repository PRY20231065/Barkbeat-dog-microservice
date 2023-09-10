import { IPaginatedRequest } from "src/utils/generic";

export class PaginatedRequest implements IPaginatedRequest {
    startKey: string; 
    size: string;
    breed_id?: string;
    owner_id?: string;
    vet_id?: string;
}