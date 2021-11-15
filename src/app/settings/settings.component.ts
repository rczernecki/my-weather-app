import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  deleteAccount() {
    this.authService.deleteAccount().subscribe({
      next: (data) => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.authService.logout();
        this.router.navigate(['/login']);
      },
    });
  }
}
