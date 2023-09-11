import { Schema } from "dynamoose";

export const BreedSchema = new Schema({
    id: {
        type: String,
        hashKey: true
    },
    
    name: {
        type: String,
    },
});