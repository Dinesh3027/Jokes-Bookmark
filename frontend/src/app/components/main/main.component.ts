import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isSaved: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log("Timestamp", new Date().getTime());
  }

  /**
   * Event Handler When a Joke
   * Sacved on the Find Jokes
   * Component
   * @param { any } event Event Object emitted 
  */
  onJokeSaved(event: any){
    if('joke_saved' in event){
        this.isSaved = event.joke_saved;
    }
  }

}
