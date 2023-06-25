import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let xApiKey = localStorage.getItem("X-Api-Key");
    if(!xApiKey) {
      xApiKey = (Math.random() + 1 ).toString(20).substring(2);
      localStorage.setItem("X-Api-Key", xApiKey);
    }
    return next.handle(request.clone({ setHeaders: { "X-Api-Key": xApiKey}}));
  }

}
