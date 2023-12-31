import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import {UpdateUserComponent} from "./update-user/update-user.component";
import {checkForChangesGuard} from "../../guards/check-for-changes.guard";

export const usersRoutes: Routes = [
  {
    path: "",
    component: ListUsersComponent
  },
  {
    path: "add",
    component: AddUserComponent
  },
  {
    path: "update",
    component: UpdateUserComponent,
    canDeactivate: [checkForChangesGuard]
  }
];
