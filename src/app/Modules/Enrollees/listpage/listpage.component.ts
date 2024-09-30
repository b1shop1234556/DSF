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
import { PostService } from '../../../post.service';
import { ConnectService } from '../../../connect.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-listpage',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatListModule],
  templateUrl: './listpage.component.html',
  styleUrl: './listpage.component.css'
})
export class ListpageComponent {

  // students:any[]=[];
  students:any;
  
  constructor(
    // private dialog: MatDialog,
    // private conn: PostService,
    private conn: ConnectService,
    private route: Router
  ){}

  // ngOnInit(): void {
  //   this.conn.getstudent().subscribe((data)=>{
  //     this.students = data;
  //   })
  // }



  ngOnInit(): void {
    this.conn.getData().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
    })
  }



  // openDialog(): void{
  //   const dialogRef = this.dialog.open(ViewViewComponent, {
  //     height: '800px',
  //     width: '500px'
  //   });



  // }



  classes: string[] = [
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ];

  sections: string[] = [
    'Emerald',
    'Diamond',
    'Pearl',
    'Sapphire',
    'Amethyst',
    'A',
    'B',
    'C',
  ];

  strands: string[] = [
    'STEM',
    'ABM',
    'HUMSS',
  ];

  enrolees: string[] = ['Victoria Nueman', 'John Lander', 'Jessie Train', 'Queen Maeve', 'Chace Deep'];
}
