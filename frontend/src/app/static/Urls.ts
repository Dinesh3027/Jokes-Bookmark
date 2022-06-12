import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Urls {

    // G
    public static GET_ALL_JOKES: string = 'api/jokes';
    public static GET_A_RANDOM_JOKE: string = 'http://api.icndb.com/jokes/random';

    // M
    /** Insert or Update Or Delete a JOKE */ 
    public static MODIFY_A_JOKE: string = 'api/joke';
}