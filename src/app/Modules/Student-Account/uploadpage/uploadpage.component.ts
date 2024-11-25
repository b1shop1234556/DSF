import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { StatementComponent } from '../statement/statement.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-uploadpage',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatListModule, SearchFilterPipe],
  templateUrl: './uploadpage.component.html',
  styleUrl: './uploadpage.component.css'
})
export class UploadpageComponent {


  keyword: any;
  students:any;

  Modal(id: any): void {
    console.log(id);
    localStorage.setItem('LRN', id);
    // this.displaypending();
    this.dialog.open(StatementComponent, {
        width: '700px',  // Fixed width
        height: '327px', // Fixed height
        maxWidth: '800px',
        maxHeight: '800px',
    });
  }

  ngOnInit(): void {
    this.conn.displayStudent().subscribe((result: any) => {
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

  constructor(
    private dialog: MatDialog,
    // private conn: PostService,
    private conn: ConnectService,
    private route: Router
  ){}

  // [routerLink]="['/main-page/enrollees/homepage/viewdetails']"

  // getLRN(id: any){
  //   console.log(id);
  //   localStorage.setItem('LRN', id);
  //   this.route.navigate(['/main-page/student/home-page/soa'])
  // }
}
