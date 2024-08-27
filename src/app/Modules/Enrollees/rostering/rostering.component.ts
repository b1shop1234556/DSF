import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rostering',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatListModule],
  templateUrl: './rostering.component.html',
  styleUrl: './rostering.component.css'
})
export class RosteringComponent {
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