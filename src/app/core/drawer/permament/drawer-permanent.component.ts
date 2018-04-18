import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { DrawerService } from '../drawer.service';
import { DrawerItem } from '../drawer-item.class';
import { BaseComponent } from '../../../shared/base/basecomponent.class';
import { AUTH_SERVICE } from '../../../shared/auth/auth-service.token';
import { IAuthService } from '../../../shared/auth/iauth-service.interface';

@Component({
  selector: 'app-drawer-permanent',
  templateUrl: 'drawer-permanent.component.html'
})
export class DrawerPermanentComponent extends BaseComponent implements OnInit {
  public items: DrawerItem[];

  constructor(public media: ObservableMedia, private drawerService: DrawerService, private cdr: ChangeDetectorRef) {
    super();
    this.items = [];
  }

  ngOnInit(): void {
    this.subscription = this.drawerService.getDrawerItems().subscribe((items: DrawerItem[]) => {
      this.items.splice(0, this.items.length);
      this.items.push(...items);
      this.cdr.detectChanges();
    });
  }
}
