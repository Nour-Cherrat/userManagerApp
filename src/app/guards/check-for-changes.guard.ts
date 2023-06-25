import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UsersService} from "../services/users.service";

export const checkForChangesGuard: CanActivateFn = (route, state) => {
  console.log("U have some unsaved changes guard");
  if(inject(UsersService).hasUnsavedChanges()) {
    return confirm('There are unsaved changes! Are you sure you want to leave this page?');
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};
