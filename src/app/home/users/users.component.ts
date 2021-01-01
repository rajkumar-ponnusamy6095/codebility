import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';


export class PageParams {
  search: string;
  sort: string;
  limit: number
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  pageParams: Partial<PageParams> = {
    limit: 5
  };
  usersList: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'company','phone'];

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

}
