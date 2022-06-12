import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NetworkService } from 'src/app/services/network/network.service';

import { FindJokesComponent } from './find-jokes.component';

describe('FindJokesComponent', () => {
  let component: FindJokesComponent;
  let fixture: ComponentFixture<FindJokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      declarations: [ FindJokesComponent ],
      providers: [ NetworkService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
