import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { LayoutModule } from '../shared/layout/layout.module';
import { AuthModule } from '../auth/auth.module';
import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { ChatSendComponent } from './chat-send/chat-send.component';
import { ChatService } from './chat.service';
import { ChatDeleteComponent } from './chat-delete/chat-delete.component';
import { ChatEditComponent } from './chat-edit/chat-edit.component';
import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

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
    SocketIoModule.forRoot(config),
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
    ChatService,
    {
      provide: '_OPTIONS_',
      useValue: {
        query: `token=${localStorage.getItem('token')}`
      }
    },
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class ChatsModule { }
