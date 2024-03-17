import {Component} from '@angular/core';
import {BackendStravaService} from "../../services/backend-strava.service";
import {InternalService} from "../../services/internal.service";

@Component({
  selector: 'app-try-deconnection-page',
  templateUrl: './try-deconnection-page.component.html',
  styleUrls: ['./try-deconnection-page.component.scss']
})
export class TryDeconnectionPageComponent {
  state: { error: boolean, message: string[] } = {error: true, message: ["Display error", "Erreur affichage"]}

  constructor(protected internalService: InternalService, private backendStrava: BackendStravaService) {
  }

  ngOnInit(): void {
    this.backendStrava.deconnect().subscribe({
      next: (res) => {
        this.state = {
          error: false,
          message: ["the server keep the authentication token to update actives series.\nIf you want to totally delete the app to access your strava data, go to 'Revoke access' section",
            "le serveur garde le jeton d'authentification pour mettre à jour les series actives.\nSi vous souhaitez totalement supprimé l'accès à vos données strava, allez dans la section 'Retirer accèss'"]
        }
      },
      error: (res) => {
        if (res.status == 404) this.state.message = ["Impossible to deconnect: not authentified", "Impossible de se déconnecter: pas authentifié"]
        this.internalService.handleErrorStatus(res.status)
      },
      complete: () => {
      }
    });
  }

  messageSuccess = ['Successful Logout', 'Déconnexion réussie']
  messageFailed = ['Failed to logout', 'Déconnexion échouchée']
}
