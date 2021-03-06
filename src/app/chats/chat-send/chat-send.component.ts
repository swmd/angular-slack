import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../shared/base/basecomponent.class';
import { ChatService } from '../chat.service';
// import { ChatMessage } from 'app/chats/chat.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-send',
  templateUrl: 'chat-send.component.html',
})
export class ChatSendComponent extends BaseComponent implements OnInit {

  /**
   * The group id to send the chats to
   */
  @Input()
  public groupId: string;

  /**
   * The message currently being typed by the user
   */
  public message: string;

  /**
   * The message form
   */
  public sendMessageForm: FormGroup;

  constructor(private chatService: ChatService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  public onTyping() {
    this.chatService.sendTypingStatus();
  }

  /**
   * Sends a message
   */
  public onSubmit() {
    if (!this.message) {
      return;
    }

    this.chatService.sendMessage({
      groupId: this.groupId,
      text: this.message
    });
    this.message = '';
  }

  /**
  * Initializes the form
  */
  private initForm() {
    this.sendMessageForm = new FormGroup({
      message: new FormControl('')
    });
  }
}
