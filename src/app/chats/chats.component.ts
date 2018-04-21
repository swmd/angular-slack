import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BaseComponent } from '../shared/base/basecomponent.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DrawerService } from '../core/drawer/drawer.service';
import { DrawerItem } from '../core/drawer/drawer-item.class';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './chat.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private drawerService: DrawerService, private chatService: ChatService) {
    super();
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
