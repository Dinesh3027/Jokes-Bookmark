import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Joke } from 'src/app/interfaces/joke';
import { NetworkService } from 'src/app/services/network/network.service';
import { AppUtils } from 'src/app/static/Utils';

@Component({
  selector: 'find-jokes',
  templateUrl: './find-jokes.component.html',
  styleUrls: ['./find-jokes.component.scss']
})
export class FindJokesComponent implements OnInit {

  enableButton: boolean = true;

  jokeInput: FormControl = new FormControl('');

  constructor(
    private network: NetworkService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.setRandomJokeToTextBox();
  }


  /**
   * Custome Event to observe
   * the input changes and 
   * setting the button
   */
  observeValueChangeOnInput() {
    this.jokeInput.markAsUntouched();
    this.jokeInput.valueChanges.subscribe(it => {
      this.enableButton = false;
    });
  }

  onFindingARandomJoke(){
    // Clear the Test Box
    this.jokeInput.setValue('');
    // Then fetch a random joke
    // from API
    this.setRandomJokeToTextBox();
  }

  /**
   * When Save button click
   * save the Joke into the DB
   */
  onSaveBtnClick() {
    this.saveJoke(this.jokeInput.value);
  }

  /**
   * Pull a random joke
   * from the Chuck Norris 
   * Database API and
   * place it into the text box.
   */
  setRandomJokeToTextBox() {
    this.network.aRandomJoke.subscribe(it => {
      this.jokeInput.setValue(it.value.joke);
      this.observeValueChangeOnInput();
    });
  }

  /**
   * Save Joke to the DB
   * @param { string } jokeStr Joke string from input
   */
  saveJoke(jokeStr: string) {
    var joke: Joke = AppUtils.parseJoke(jokeStr);
    this.network.insertAJoke(joke).subscribe(it => {
      this.snackBar.open(it.message, it.status === 0 ? "Success" : "Error", {
        duration: 3000
      });
      if (it.status === 0) { 
        this.network.isJokeSaved.next(true);
        this.enableButton = true; }
    });
  }

}
