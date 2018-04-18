import { DrawerItem } from './drawer-item.class';
import { EventEmitter } from '@angular/core';

export class DrawerService {

  public onToggleDrawer: EventEmitter<void>;

  private drawerItems: Array<DrawerItem>;

  private onDrawerItemsChanged: EventEmitter<Array<DrawerItem>>;

  constructor() {
    this.onToggleDrawer = new EventEmitter();
    this.onDrawerItemsChanged = new EventEmitter();
    this.drawerItems = [];
  }

  /**
   * Toggles the drawer
   */
  public toggleDrawer(): void {
    this.onToggleDrawer.emit();
  }

  /**
   * Sets the toolbar items
   * @param toolbarItems The items to display in the toolbar
   */
  public setDrawerItems(drawerItems: DrawerItem[]) {
    this.drawerItems = drawerItems;
    this.onDrawerItemsChanged.emit(this.drawerItems);
  }

  /**
   * Gets the toolbar items observable
   */
  public getDrawerItems() {
    return this.onDrawerItemsChanged;
  }

  /**
   * Resets the toolbar items
   */
  public reset() {
    this.setDrawerItems([]);
  }
}
