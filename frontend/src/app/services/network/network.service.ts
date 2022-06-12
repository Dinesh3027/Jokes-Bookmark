import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Joke } from '../../interfaces/joke';
import { RandomResponse } from '../../interfaces/randomResponse';
import { Jokes } from '../../models/Jokes.model';
import { Urls } from '../../static/Urls';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {


  isJokeSaved = new Subject<boolean>();
  isJokeSavedToDB(): Observable<boolean> {
    return this.isJokeSaved.asObservable();
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient
  ) { }

  get aRandomJoke(): Observable<RandomResponse>{
   return this.http.get<RandomResponse>(Urls.GET_A_RANDOM_JOKE);
  }

  get AllJokesFromDB(): Observable<Array<Joke>>{
    return this.http.get<Array<Joke>>(Urls.GET_ALL_JOKES);
  }

  insertAJoke(joke: Joke): Observable<any>{
    return this.http.post(Urls.MODIFY_A_JOKE, {joke: joke})
  }

  deleteJokes(jokes: Array<Jokes>): Observable<any>{
    const options = { headers: this.headers, body: { jokes: jokes.map(it => it.joke) } };
    return this.http.delete(Urls.MODIFY_A_JOKE, options);
  }
}
