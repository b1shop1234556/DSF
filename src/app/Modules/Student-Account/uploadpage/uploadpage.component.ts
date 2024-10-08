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

  ngOnInit(): void {
    this.conn.displayStudent().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
    })
  }

  constructor(
    // private dialog: MatDialog,
    // private conn: PostService,
    private conn: ConnectService,
    private route: Router
  ){}

  // classes: string[] = [
  //   'Grade 7',
  //   'Grade 8',
  //   'Grade 9',
  //   'Grade 10',
  //   'Grade 11',
  //   'Grade 12',
  // ];

  // sections: string[] = [
  //   'Emerald',
  //   'Diamond',
  //   'Pearl',
  //   'Sapphire',
  //   'Amethyst',
  //   'A',
  //   'B',
  //   'C',
  // ];

  // strands: string[] = [
  //   'STEM',
  //   'ABM',
  //   'HUMSS',
  // ];

  enrolees: string[] = ['Victoria Nueman', 'John Lander', 'Jessie Train', 'Queen Maeve', 'Chace Deep'];
  // [routerLink]="['/main-page/enrollees/homepage/viewdetails']"

  getLRN(id: any){
    console.log(id);
    localStorage.setItem('LRN', id);
    this.route.navigate(['/main-page/student/home-page/soa'])
  }
}
