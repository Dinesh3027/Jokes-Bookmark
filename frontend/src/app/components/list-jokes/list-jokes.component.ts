import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Jokes } from 'src/app/models/Jokes.model';
import { NetworkService } from 'src/app/services/network/network.service';
import { AppUtils } from 'src/app/static/Utils';

@Component({
  selector: 'list-jokes',
  templateUrl: './list-jokes.component.html',
  styleUrls: ['./list-jokes.component.scss']
})
export class ListJokesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'joke'];
  dataSource!: MatTableDataSource<Jokes>;
  selection!: SelectionModel<Jokes>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private network: NetworkService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllJokes();
    this.network.isJokeSavedToDB().subscribe(it => {
      if (it) {
        this.getAllJokes();
      }
    });
  }

  ngAfterViewInit() {
  }

  getAllJokes() {
    this.network.AllJokesFromDB.subscribe(it => {
      var jokes = AppUtils.parseJokes(it);
      console.log("Jokes", jokes);
      this.dataSource = new MatTableDataSource<Jokes>(jokes);
      this.selection = new SelectionModel<Jokes>(true, []);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.network.isJokeSaved.next(false);
    })
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** 
   * Selects all rows if 
   * they are not all selected
   * otherwise clear selection
   * */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** 
   * The label for the checkbox 
   * on the passed row 
   * */
  checkboxLabel(row?: Jokes): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  /**
   * Remove Jokes from DB
   * On Delete button click 
   */
  deleteJokes() {
    if (!this.selection.isEmpty()) {
      console.log("selection", this.selection.selected);
      this.network.deleteJokes(this.selection.selected).subscribe(it => {
        this.snackBar.open(it.message, it.status === 0 ? "Success" : "Error", {
          duration: 3000
        });
        if (it.status === 0) {
          this.selection.clear();
          this.getAllJokes();
        }
      });
    }
  }

}
