import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthenticateService} from '../services/authenticate.service';

@Injectable()
export class LoginGuardService implements CanActivate{
  constructor(private authService: AuthenticateService, private router: Router) { }

  canActivate() {
      // If the user is not logged in we'll send them back to the home page
      if (!this.authService.isLoggedIn()) {
          console.log('No estas logueado');
          this.router.navigate(['/']);
          return false;
      }

      return true;
  }
}
