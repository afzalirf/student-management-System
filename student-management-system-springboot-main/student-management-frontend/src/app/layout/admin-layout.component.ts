import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <aside class="admin-sidebar">
        <div class="brand-lockup">
          <div class="brand-mark"><i class="bi bi-mortarboard-fill"></i></div>
          <div>
            <div class="brand-name">Northstar SMS</div>
            <span class="brand-caption">Academic workspace</span>
          </div>
        </div>

        <div class="sidebar-section-label">Workspace</div>
        <nav class="admin-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="sidebar-link">
            <i class="bi bi-grid-1x2-fill"></i><span>Overview</span>
          </a>
          <a routerLink="/students" routerLinkActive="active" class="sidebar-link">
            <i class="bi bi-people-fill"></i><span>Students</span>
          </a>
          <a routerLink="/courses" routerLinkActive="active" class="sidebar-link">
            <i class="bi bi-journal-bookmark-fill"></i><span>Courses</span>
          </a>
          <a routerLink="/enrollments/new" routerLinkActive="active" class="sidebar-link">
            <i class="bi bi-person-plus-fill"></i><span>New enrollment</span>
          </a>
          <a routerLink="/enrollments" routerLinkActive="active" class="sidebar-link">
            <i class="bi bi-card-checklist"></i><span>Enrollment records</span>
          </a>
        </nav>

        <div class="sidebar-bottom">
          <div class="sidebar-section-label">Account</div>
          <button type="button" class="sidebar-link" (click)="logout()">
            <i class="bi bi-box-arrow-left"></i><span>Sign out</span>
          </button>
        </div>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div class="topbar-left">
            <button type="button" class="topbar-icon menu-toggle" aria-label="Toggle navigation" (click)="toggle()">
              <i class="bi bi-list"></i>
            </button>
            <div>
              <div class="topbar-kicker">Northstar / Administration</div>
              <div class="topbar-title">Student Management</div>
            </div>
          </div>
          <div class="topbar-actions">
            <div class="topbar-icon"><i class="bi bi-bell"></i></div>
            <div class="admin-profile">
              <div class="profile-avatar">A</div>
              <div>
                <span class="profile-name">Admin User</span>
                <span class="profile-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <router-outlet></router-outlet>

        <footer class="admin-footer">
          <span>© 2026 Northstar Student Management</span>
          <span class="float-end">Built for better campus operations</span>
        </footer>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  private api = inject(ApiService);
  private router = inject(Router);

  toggle(): void {
    document.body.classList.toggle('sb-sidenav-toggled');
  }

  logout(): void {
    this.api.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
