import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NetworkService } from 'src/app/services/network/network.service';

import { ListJokesComponent } from './list-jokes.component';

describe('ListJokesComponent', () => {
  let component: ListJokesComponent;
  let fixture: ComponentFixture<ListJokesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, HttpClientModule, MatPaginatorModule, MatSnackBarModule, MatTableModule ],
      declarations: [ ListJokesComponent ],
      providers: [ NetworkService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should contain a table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('table')).not.toBe(null);
  });
});
