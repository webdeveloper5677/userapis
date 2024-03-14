
import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export const UserSchema = new mongoose.Schema({
    id: { type: String, default: uuid.v4 },
    username: { type: String, required: true },
    age: { type: Number, required: true },
    hobbies: { type: [String], default: [] },
});