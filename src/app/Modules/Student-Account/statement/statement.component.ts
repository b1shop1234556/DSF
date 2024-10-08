import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent, MatBadgeModule, MatMenuModule, MatListModule],
 templateUrl: './statement.component.html',
  styleUrl: './statement.component.css'
})
export class StatementComponent implements OnInit{
  LRN:{ id: string | null } = {id:localStorage.getItem('LRN')}
  students: any;
  lname:any;
  fname: any;
  mname: any;
  currentDate: any;

  constructor(
    private conn: ConnectService
  ){}
  formDate(date: Date):string{
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  ngOnInit(): void {

    this.currentDate = this.formDate(new Date());
    console.log(this.LRN.id)
    this.conn.printSOA(this.LRN.id).subscribe((result: any) => {
      this.students = result;
      this.lname = result[0].lname;
      this.fname = result[0].fname;
      this.mname = result[0].mname;
      console.log(this.students, this.lname, this.fname, this.mname);
      
    })
  }
}
