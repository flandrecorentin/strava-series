import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendStravaService} from './backend-strava.service';

@Injectable()
export class InternalService {

  queryParams: any;

  pathToken: string = 'access_token';

  pathLanguage: string = 'language_code'

  constructor(private route: ActivatedRoute, private router: Router) {
  }


  getParamsURL() {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params
    })
    return this.queryParams
  }

  // ************ Internal Service for Manage Errors *****************
  handleErrorStatus(status: number): void {
    switch (status) {
      case 400: {
        break;
      }
      case 401: {
        this.router.navigate([''])
        alert('Not authenticated')
        break;
      }
      case 403: {
        this.router.navigate([''])
        alert('Are you sure to accept the needed right on the strava (OAuth)entication ? Try to logout and reconnect with them')
        break;
      }
      case 404: {
        break;
      }
      case 500: {
        break;
      }
      default: {
        // do nothing by default
        break;
      }
    }
  }

  // ************ Internal Service for Authentication *****************


  // ************ Internal Service for Language *****************
  initLanguage(): void {
    if (!localStorage.getItem('language_code')) {
      localStorage.setItem('language_code', 'EN');
    }
  }

  changeLanguage(code: string): void {
    if (localStorage.getItem('language_code') != code) {
      localStorage.setItem('language_code', code);
    }
  }

  getLanguage(): number {
    try {
      switch (localStorage.getItem('language_code')) {
        case 'EN':
          return 0;
          break;
        case 'FR':
          return 1;
          break
      }
    } catch (error) {
      return 0
    }
    return 0
  }
}
