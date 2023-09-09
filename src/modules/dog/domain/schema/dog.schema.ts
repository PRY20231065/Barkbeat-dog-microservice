import { Schema } from "dynamoose";
import { IndexType } from "dynamoose/dist/Schema";

export const DogSchema = new Schema({
    id: {
        type: String,
        rangeKey: true, //clave de ordenacion
    },
    owner_id: {
        type: String,
        hashKey: true //clave de particion
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    veterinarian_id: {
        type: String,
        index: {
            name: 'veterinarian-id-index',
            type: IndexType.global
        }
    },
    breed_id: {
        type: String,
        index: {
            name: 'breed-id-index',
            type: IndexType.global
        }
    },
    
});