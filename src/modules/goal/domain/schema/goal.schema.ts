import { Schema,  } from "dynamoose";
import { IndexType } from "dynamoose/dist/Schema";

export const GoalSchema = new Schema({
    id: {
        type: String,
        rangeKey: true
    },
    dog_id:{
        type: String,
        hashKey: true
    },
    title:{
        type: String
    },
    description: {
        type: String
    },
    veterinarian_id:{
        type: String,
        index: {
            name: 'veterinarian-id-index',
            type: IndexType.global
        }
    },
    is_completed: {
        type: Boolean
    },
    created_date: {
        type: String
    }
})