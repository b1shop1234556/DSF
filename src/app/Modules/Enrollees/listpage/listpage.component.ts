import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
// import { PostService } from '../../../post.service';
import { ConnectService } from '../../../connect.service';
import { MatDividerModule } from '@angular/material/divider';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { StatementComponent } from '../../Student-Account/statement/statement.component';
import { MatDialog } from '@angular/material/dialog';
// import { PutpayComponent } from '../putpay/putpay.component';

@Component({
  selector: 'app-listpage',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatListModule, SearchFilterPipe],
  templateUrl: './listpage.component.html',
  styleUrl: './listpage.component.css'
})
export class ListpageComponent {

  enrollments: any;

  // selectedProgress: string = 'All';
  selectedClass: string = 'All';
  
  keyword: any;
  students: any;
  grade: any;

  classes: string[] =[
    'All',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ]
  
  
  constructor(
    // private dialog: MatDialog,
    // private conn: PostService,
    private conn: ConnectService,
    // private route: Router
  ){}

 


  ngOnInit(): void {
    // this.getEnrollments()
    // this.displaypending()
    this.filterapprove()
    this.getFilteredEnrollments()
  }

  displaygrade(){
    this.conn.displaygrade().subscribe(
      (result: any) => {
        this.grade = result;
        console.log(this.grade);
      },
      
    )
  }

  //
  
 
  filterapprove() {
    this.conn.getDataPUT().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
  
      if (this.students && this.students.length > 0) {
        // Filter for transactions where payment_approval is NOT null and not '0000-00-00'
        const approvedTransactions = this.students.filter((transaction: any) => 
          transaction.payment_approval !== null && transaction.payment_approval !== '0000-00-00'
        );
  
        if (approvedTransactions.length > 0) {
          console.log('Approved Transactions:', approvedTransactions);
          this.students = approvedTransactions;
  
          // Now sort the students alphabetically by their name (lname, fname, mname)
          this.students.sort((a: any, b: any) => {
            const nameA = `${a.lname}, ${a.fname} ${a.mname}`.toLowerCase();
            const nameB = `${b.lname}, ${b.fname} ${b.mname}`.toLowerCase();
  
            if (nameA < nameB) return -1; // A comes before B
            if (nameA > nameB) return 1;  // B comes before A
            return 0; // names are equal
          });
  
        } else {
          console.log('No approved transactions found');
          this.students = [];
        }
      } else {
        console.log('No transactions available');
        this.students = [];
      }
    });
  }
  
  
  getFilteredEnrollments(){
    switch(this.selectedClass){
      case 'All':
        return this.students;
      case 'Grade 7':
        return this.students.filter((student: any) => student.grade_level == '7' );
      case 'Grade 8':
        return this.students.filter((student: any) => student.grade_level == '8' );
      case 'Grade 9':
        return this.students.filter((student: any) => student.grade_level == '9' );
      case 'Grade 10':
        return this.students.filter((student: any) => student.grade_level == '10' );
      case 'Grade 11':
        return this.students.filter((student: any) => student.grade_level == '11' );
      case 'Grade 12':
        return this.students.filter((student: any) => student.grade_level == '12' );
      default:
        return[];    
    }
  }

}
