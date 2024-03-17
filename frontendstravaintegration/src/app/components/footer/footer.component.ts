import {Component} from '@angular/core';
import {InternalService} from "../../services/internal.service";
import {BackendStravaService} from "../../services/backend-strava.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  version: string = ''

  classButtonFooter = 'button-footer'

  sectionApp = ['App', "l'App"]
  sectionRights = ['Actions', "Actions"]
  sectionCode = ['Resources', 'Ressources']

  about = {
    title: ['About', 'A propos'],
    redirectionUrl: 'about',
  }

  contact = {
    title: ['Contact', 'Contact'],
    redirectionUrl: 'contact',
  }

  deconnection = {
    title: ['Logout', 'Se déconnecter'],
    redirectionUrl: 'try-deconnection',
  }

  revoke = {
    title: ['Revoke access', 'Retirer access'],
    redirectionUrl: 'revoke-access',
  }

  code = {
    title: ['Source code', 'Code source'],
    redirectionUrl: 'https://github.com/flandrecorentin',
    type: 'externalRedirection'
  }

  strava = {
    title: ['Strava Dev', 'Strava Dev'],
    redirectionUrl: 'https://developers.strava.com/',
    type: 'externalRedirection'
  }

  constructor(protected internalService: InternalService, private backend: BackendStravaService) {}

  ngOnInit(): void {
    try {
      this.backend.getVersion().subscribe({
        next: (res) => {
          this.version = res.content;
        },
        error: (res) => {
          this.internalService.handleErrorStatus(res.status)
          this.version = "api unavailable";
        },
        complete: () => {
        }
      });
    } catch (error) {
      this.internalService.handleErrorStatus(500)
    }
  }
}
