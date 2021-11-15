import { CanActivate, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from '../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(private authSerrvice: AuthenticationService) {}

  canActivate():
    | boolean
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const user: User | null = this.authSerrvice.getUser();
    return !!user;
  }
}
