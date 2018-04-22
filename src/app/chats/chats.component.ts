import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { BaseComponent } from '../shared/base/basecomponent.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DrawerService } from '../core/drawer/drawer.service';
import { DrawerItem } from '../core/drawer/drawer-item.class';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './chat.service';
import { AUTH_SERVICE } from '../shared/auth/auth-service.token';
import { IAuthService } from '../shared/auth/iauth-service.interface';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['chats.component.scss']
})
export class ChatsComponent extends BaseComponent implements OnInit, OnDestroy {

  @ViewChild(ChatsListComponent)
  public chatListComponent: ChatsListComponent;

  // public chat: Chat;
  private groupId: string;

  private typers: Object;
  public statusText: string;
  private currentUserId: string;

  constructor(private route: ActivatedRoute, private router: Router, private drawerService: DrawerService, private chatService: ChatService, @Inject(AUTH_SERVICE) private authService: IAuthService) {
    super();
    this.typers = {};
    this.statusText = '';
    this.currentUserId = this.authService.getUser().id;
  }

  ngOnInit() {

    this.subscription = this.route.params
      .subscribe((params: Params) => {
        this.groupId = params['id'] ? params['id'] : 'general';
      });

    const generalChannel: DrawerItem = {
      name: 'General',
      icon: 'group',
      link: 'chats/general'
    };

    this.drawerService.setDrawerItems([generalChannel]);

    this.chatService
        .getStatus()
        .subscribe(status => {
          if (status.id !== this.currentUserId) {
            // console.log('status: ', status);
            this.typers[status.username] = this.typers[status.username] ? this.typers[status.username] + 1 : 1;
            this.updateTypingStatus();
            setTimeout(() => {
              this.typers[status.username] = this.typers[status.username] - 1;
              this.updateTypingStatus();
            }, 3000);
          }
        });
  }

  updateTypingStatus() {
    console.log(this.typers);
    if (Object.keys(this.typers).length === 0) {
      this.statusText = '';
    } else {
      let users = [];
      
      for (let typer in this.typers) {
        if (this.typers[typer] > 0) {
          users.push(typer);
        }
      }
      
      if (users.length > 1) {
        this.statusText = users.join(', ') + ' are typing';
      } else if (users.length === 1) {
        this.statusText = users[0] + ' is typing';
      } else {
        this.statusText = '';
      }
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.drawerService.reset();
  }

  /**
   * Gets the observable which is used to check if the items have been refreshed
   */
  public getRefreshObservable() {
    return this.chatListComponent.getRefreshObservable();
  }

  /**
   * Loads the messages
   */
  private loadMessages() {
    // this.subscription = this.groupService.get(this.id).subscribe((group) => {
    //   this.group = group;

    //   this.toolbarService.setTitle(this.group.name);
    // }, (error) => {
    //   console.error('Group was not found!', error);
    //   this.router.navigate(['../'], { relativeTo: this.route });
    // });
  }
}
