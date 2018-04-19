import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { ChatsComponent } from './chats.component';
// import { ChatsListComponent } from './chats-list/chats-list.component';

const routes: Routes = [
  {
    path: 'chats',
    component: ChatsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: ChatsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
