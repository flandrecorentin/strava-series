import {Component} from '@angular/core';
import {InternalService} from "../../services/internal.service";
import {BackendStravaService} from "../../services/backend-strava.service";

@Component({
  selector: 'app-revoke-access-page',
  templateUrl: './revoke-access-page.component.html',
  styleUrls: ['./revoke-access-page.component.scss']
})
export class RevokeAccessPageComponent {

  titlePage = ['Revoke Access', "Désactiver l'accès "]
  instruction = ['Recopy the following text to get access to the revoke endpoint:',
    "Recopier le texte suivant pour avoir accès au lien pour désactiver l'accès à l'application sur Strava:"]
  textLink = ['Revoke Access on Strava', "Désactiver l'accès sur Strava"]

  targetValueRevoke: string[] = ['revoke-access', 'desactiver-acces']
  inputValueRevoke: string = ''
  classRevokeLink: string = 'disable'

  constructor(protected internalService: InternalService, private backend: BackendStravaService) {
  }

  checkInputValue(): void {
    if (this.inputValueRevoke == this.targetValueRevoke[this.internalService.getLanguage()]) {
      this.classRevokeLink = 'active'
    } else {
      this.classRevokeLink = 'disable'
    }
  }

  revokeAccess(): void {
    this.backend.revokeAccessStrava().subscribe(resp => {
    });
  }
}
