import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { ViewViewComponent } from '../../Enrollees/view-view/view-view.component';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-view-messages',
  standalone: true,
  imports: [
    CommonModule,
    ViewViewComponent,
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    CustomSidenavComponent,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    SearchFilterPipe,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.css'
})
export class ViewMessagesComponent implements OnInit {
  messages: any; // Initialize as an empty array
  message: any;
  // chatForm: FormGroup;

  constructor(
    private chatService: ConnectService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchMessages();
    this.getFilteredEnrollments();
    this.filterapprove();
  }

  saveform = new FormGroup({
    message_sender: new FormControl("1"),
    message_reciever: new FormControl(""),
    message: new FormControl(" ")
  })
  fetchMessages(): void {
    this.chatService.getMessages().subscribe(
      data => {
        this.messages = data;
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  sendMessage(): void {
    console.log(this.saveform.value)
    this.saveform.patchValue({ message_sender: '1' });
    // this.saveform.patchValue({ message_reciever: '2' });
    this.chatService.sendMessage(this.saveform.value).subscribe(
      response => {
        this.messages.push(response); // Add the new message to the list
        this.message = ''; // Clear only the message input
        this.fetchMessages();
        this.saveform.reset();
      },
      error => {
        console.error('Error sending message:', error);
      }
    );
    
      // if (this.chatForm.valid) {
      //   const newMessage = this.chatForm.value;
  
      //   this.chatService.sendMessage(newMessage).subscribe(
      //     response => {
      //       this.messages.push(response);
      //       this.chatForm.reset(); // Clear form fields
      //     },
      //     error => {
      //       console.error('Error sending message:', error);
      //     }
      //   );
      // }
    

  }
  

  // message = '';
  // messages = [];

  // keyword: any;
  selectedClass: string = 'All';
  students: any;

  // constructor(
  //   private chatService: ConnectService,
  //   private conn: ConnectService,
  //   private route: Router
  // ) { }

  // ngOnInit(): void {
  //   this.getMessages();
  //   this.filterapprove()
  //   this.getFilteredEnrollments()
  // }

  // sendMessage() {
  //   const message = {
  //     message_reciever: '1', // Adjust based on the actual logged-in user
  //     message_sender: '1', // Adjust based on the actual conversation target
  //     message: this.message,
  //     message_date: new Date() // Optional, set current date
  //   };
  //   this.chatService.sendMessage(message).subscribe(() => {
  //     this.message = '';
  //     this.getMessages(); // Refresh message list after sending
  //   });
  // }

  // getMessages() {
  //   this.chatService.getMessages().subscribe((messages: any) => {
  //     this.messages = messages;
  //   });
  // }

  filterapprove(){
    this.chatService.displaymsg().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
      if (this.students && this.students.length > 0) {
        const pendingTransactions = this.students.filter((transaction: any) => transaction.payment_approval === 'Pending');

        if (pendingTransactions.length > 0) {
            console.log('Pending Transactions:', pendingTransactions);
            this.students = pendingTransactions;
        } else {
            console.log('No pending transactions found');
            this.students = [];
        }
    } else {
        console.log('No transactions available');
        this.students = [];
    }
    })
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
