import { Joke } from "../interfaces/joke";
import { AppUtils } from "../static/Utils";

export class Jokes implements Joke{   
    _id!: string;
    created_at!: Date;
    joke!: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        this.created_at = AppUtils.parseJokeIDToDate(input._id);
        return this;
    }

}