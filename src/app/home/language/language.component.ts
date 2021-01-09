import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from './language.service';
import { AddLanguageComponent } from './add-language/add-language.component';

export class PageParams {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  search: string;
  filter: string;
}

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  pageParams: Partial<PageParams> = {
    page: 1,
    limit: 5,
  };
  @ViewChild('languageSearchInput', { static: true }) languageSearchInput: ElementRef;
  languagesList: any[] = [];
  displayedColumns: string[] = ['name', 'action'];
  totalLength: number = 50;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;

  constructor(private langService: LanguageService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getLanguagesList();

    fromEvent(this.languageSearchInput.nativeElement, 'keyup')
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
        this.getLanguagesList();
      });
  }

  getLanguagesList() {
    this.langService.getLanguageList(this.pageParams).subscribe((res: any) => {
      this.languagesList = res;
      console.log('languagesList: ', this.languagesList);
    });
  }

  onPageChanged(e) {
    console.log('e: ', e);
    this.pageParams.page = e.pageIndex + 1;
    this.pageParams.limit = e.pageSize;
    this.getLanguagesList();
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
    this.getLanguagesList();
  }

  editRecord(info) {
    console.log('info: ', info);
    let dialogRef = this.dialog
      .open(AddLanguageComponent, {
        data: {
          action: 'EDIT',
          info: info
        },
        maxWidth: '400px',
        width: '80vw',
        disableClose: true,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((val: any) => {
        this.getLanguagesList();
      });
  }

  deleteRecord(info) {
    console.log('info: ', info);
    this.langService.deleteLanguage(info.id).subscribe((res: any) => {
      this.getLanguagesList();
    });
  }

  addLanguage() {
    let dialogRef = this.dialog
      .open(AddLanguageComponent, {
        data: {
          action: 'ADD'
        },
        maxWidth: '400px',
        width: '80vw',
        disableClose: true,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((val: any) => {
        this.getLanguagesList();
      });
  }

}
