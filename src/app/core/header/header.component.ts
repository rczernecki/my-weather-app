import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  private userAuthSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userAuthSubscription = this.authService.user.subscribe((data) => {
      this.isAuthenticated = !!data;
    });
    const userJson: string | null = localStorage.getItem('user');
    let user: User | null = null;
    if (!!userJson) {
      user = JSON.parse(userJson);
    }
    this.isAuthenticated = user !== undefined && user !== null;
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}
