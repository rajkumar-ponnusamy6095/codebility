import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from './users.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';

export class PageParams {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  search: string;
  filter: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  pageParams: Partial<PageParams> = {
    page: 1,
    limit: 5,
  };
  @ViewChild('userSearchInput', { static: true }) userSearchInput: ElementRef;
  usersList: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'action'];
  totalLength: number = 50;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getUsersList();

    fromEvent(this.userSearchInput.nativeElement, 'keyup')
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
        this.getUsersList();
      });
  }

  getUsersList() {
    this.usersService.getUsersList(this.pageParams).subscribe((res: any) => {
      this.usersList = res;
      console.log('usersList: ', this.usersList);
    });
  }

  onPageChanged(e) {
    console.log('e: ', e);
    this.pageParams.page = e.pageIndex + 1;
    this.pageParams.limit = e.pageSize;
    this.getUsersList();
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
    this.getUsersList();
  }

  editRecord(info) {
    console.log("info: ",info);
    let dialogRef = this.dialog.open(EditUserComponent, {
      data: info,
      maxWidth: '700px',
      width: '80vw',
      disableClose: true,
      autoFocus: false
    }).afterClosed().subscribe((val: any)=>{
      this.getUsersList();
    });
  }

  deleteRecord(info) {
    console.log("info: ",info);
    this.usersService.deleteUser(info.id).subscribe((res: any)=>{
      this.getUsersList();
    })
  }
}
