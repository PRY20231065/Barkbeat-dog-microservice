export interface IGenericResponse<T> {
    success: boolean;
    data?: T;
    code?: number;
    messages?: string[];
}

export interface IPaginatedRequest {
    startKey: string;
    size: string;
}


//con 2 campos: sortBy (campo), sortOrder (ASC o DESC)
export interface IPaginatedResponse<T> {
    success: boolean;
    items?: Array<T>;
    recordsTotal: number;
    startKey: string;
    lastKey: string;
    size: number;
}

export interface IPaginatedStartKey {
    id: string;
    breed_id: string;
    owner_id: string;
}

