import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';


export class PageParams {
  sortBy: string;
  order: string;
  limit: number;
  page: number;
  search: string;
  filter: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  pageParams: Partial<PageParams> = {
    page: 1,
    limit: 5
  };
  usersList: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'city','phone'];
  totalLength: number = 50; 
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.usersService.getUsersList(this.pageParams).subscribe((res: any)=>{
      this.usersList = res;
      console.log("usersList: ",this.usersList);
    })
  }

  onPageChanged(e) {
    console.log("e: ",e);
    this.pageParams.page = e.pageIndex + 1;
    this.pageParams.limit = e.pageSize;
    this.getUsersList();
  }

}
