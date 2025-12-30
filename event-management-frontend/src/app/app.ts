import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import { KeycloakService } from './services/keycloak/keycloak';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('event-management-frontend');
  username = '';

  constructor(private keycloakService: KeycloakService) {
    this.username = this.keycloakService.getUsername();
  }

  logout() {
    this.keycloakService.logout();
  }

  isAuthenticated(): boolean {
    return this.keycloakService.isAuthenticated();
  }

  getUsername(): string {
    return this.keycloakService.getUsername();
  }
  login(): void {
    this.keycloakService.login();
  }

  
}



