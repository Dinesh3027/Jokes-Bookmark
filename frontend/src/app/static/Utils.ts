import { Joke } from "../interfaces/joke";
import { RandomResponse } from "../interfaces/randomResponse";
import { Jokes } from "../models/Jokes.model";


export class AppUtils {

    /**
     * Take Joke as parameter
     * and return Joke Object
     * @param { string } joke Joke string
     * @returns { Joke } Joke object
     */
    public static parseJoke(joke: string): Joke {
        return {
            _id: AppUtils.JokeId,
            joke: joke
        };
    }

    public static parseJokes(jokesInterface: Array<Joke>): Array<Jokes>{
        var jokes: Array<Jokes> = [];
        jokesInterface.forEach(it => jokes.push(new Jokes().deserialize(it)));
        return jokes;
    }

    /**
     * Get id param to insert Into DB
     * @returns { string } Unix Epoch as a string
     */
    public static get JokeId(): string {
        var date = new Date();
        return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
    }
    
    /**
     * Parse the Unix Epoch returned
     * from DB to Date Object
     * @param { string } id Unix Epoch as a string
     * @returns { Date } Date Object
     */
    public static parseJokeIDToDate(id: string): Date {
        return new Date(parseInt(id.substring(0, 8), 16) * 1000);
    }
}