import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DirectorService } from './director.service';
import { AddDirectorComponent } from './add-director/add-director.component';

export class PageParams {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  search: string;
  filter: string;
}

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {

  pageParams: Partial<PageParams> = {
    page: 1,
    limit: 5,
  };
  @ViewChild('directorSearchInput', { static: true }) directorSearchInput: ElementRef;
  directorsList: any[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'action'];
  totalLength: number = 50;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;

  constructor(private dirService: DirectorService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDirectorsList();

    fromEvent(this.directorSearchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe((text: string) => {
        console.log('text: ', text);
        this.pageParams.search = text;
        this.getDirectorsList();
      });
  }

  getDirectorsList() {
    this.dirService.getDirectorList(this.pageParams).subscribe((res: any) => {
      this.directorsList = res;
      console.log('directorsList: ', this.directorsList);
    });
  }

  onPageChanged(e) {
    console.log('e: ', e);
    this.pageParams.page = e.pageIndex + 1;
    this.pageParams.limit = e.pageSize;
    this.getDirectorsList();
  }

  sortData(e) {
    console.log('e: ', e);
    if (e.direction == '') {
      delete this.pageParams.sortBy;
      delete this.pageParams.order;
    } else {
      this.pageParams.sortBy = e.active;
      this.pageParams.order = e.direction;
    }
    this.getDirectorsList();
  }

  editRecord(info) {
    console.log('info: ', info);
    let dialogRef = this.dialog
      .open(AddDirectorComponent, {
        data: {
          action: 'EDIT',
          info: info
        },
        maxWidth: '800px',
        width: '80vw',
        disableClose: true,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((val: any) => {
        this.getDirectorsList();
      });
  }

  deleteRecord(info) {
    console.log('info: ', info);
    this.dirService.deleteDirector(info.id).subscribe((res: any) => {
      this.getDirectorsList();
    });
  }

  addDirector() {
    let dialogRef = this.dialog
      .open(AddDirectorComponent, {
        data: {
          action: 'ADD'
        },
        maxWidth: '800px',
        width: '80vw',
        disableClose: true,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((val: any) => {
        this.getDirectorsList();
      });
  }


}
