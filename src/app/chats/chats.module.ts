import { NgModule } from '@angular/core';

import { LayoutModule } from '../shared/layout/layout.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { ChatsComponent } from './chats.component';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatSendComponent } from './chat-send/chat-send.component';
import { ChatService } from './chat.service';
import { ChatDeleteComponent } from './chat-delete/chat-delete.component';
import { ChatEditComponent } from './chat-edit/chat-edit.component';
import { ChatsRoutingModule } from './chats-routing.module';

@NgModule({
  declarations: [
    ChatsComponent,
    ChatsListComponent,
    ChatSendComponent,
    ChatDeleteComponent,
    ChatEditComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ChatsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule
  ],
  exports: [
    ChatsComponent,
    ChatsListComponent,
    ChatSendComponent
  ],
  providers: [
    ChatService
  ]
})
export class ChatsModule { }
