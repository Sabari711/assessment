import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserApiService } from '../../_services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {

  constructor(private api: UserApiService,private router:Router){}

  displayedColumns: string[] = ['serialNumber','userFirstName',"userLastName", 'userEmail','contactNo', 'userType', 'createdAt'];
  dataSource = new MatTableDataSource<UserFormat>();
  dataSourceLength : any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      (result)=>{
        this.dataSource.data = result.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSourceLength = result.data.length
      },
      (err)=>{
        console.log("err",err);        
      }
    )
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  } 
}

export interface UserFormat {
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  role:string;
  createdAt:string;
}
