import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { RouterLink, RouterModule } from '@angular/router';
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
    MatIcon
  ],
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.css'
})
export class ViewMessagesComponent implements OnInit {

  message = '';
  messages = [];

  constructor(private chatService: ConnectService) { }

  ngOnInit(): void {
    this.getMessages();
  }

  sendMessage() {
    const message = {
      message_reciever: '1', // Adjust based on the actual logged-in user
      message_sender: '1', // Adjust based on the actual conversation target
      message: this.message,
      message_date: new Date() // Optional, set current date
    };
    this.chatService.sendMessage(message).subscribe(() => {
      this.message = '';
      this.getMessages(); // Refresh message list after sending
    });
  }

  getMessages() {
    this.chatService.getMessages().subscribe((messages: any) => {
      this.messages = messages;
    });
  }
}
