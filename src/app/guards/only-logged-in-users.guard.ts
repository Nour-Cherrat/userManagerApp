import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UsersService} from "../services/users.service";

export const onlyLoggedInUsersGuard: CanActivateFn = (route, state) => {
  console.log("OnlyLoggedInUsers guard");
  if(inject(UsersService).hasAcces()) {
    return true;
  } else {
    window.alert("vous n'avez pas le permission pour acceder à cette page");
    inject(Router).navigate(["/"], {queryParams: { returnUrl: state.url}});
    return false;
  }
};
