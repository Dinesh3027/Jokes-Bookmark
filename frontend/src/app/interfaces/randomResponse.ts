import { RandomJoke } from "./randomJoke";

export interface RandomResponse {
    type: string;
    value: RandomJoke;
}