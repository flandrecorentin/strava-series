import {Component} from '@angular/core';
import {InternalService} from "../../services/internal.service";
import {BackendStravaService} from "../../services/backend-strava.service";
import {GlobalConfigService} from "../../../global-config.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  classButtonHeader = 'button-header'

  title:string = 'Strava Series'
  state:string = 'KO'

  // Connect or profil
  connect = {
    title: ['Connect to Strava', 'Se connecter à Strava'],
    redirectionUrl: 'https://www.strava.com/oauth/authorize?client_id=' + this.globalConfigService.config.client_id + '&response_type=' + this.globalConfigService.config.response_type + '&redirect_uri=' + this.globalConfigService.config.redirect_uri + '&scope=' + this.globalConfigService.config.scope + '&state=' + this.globalConfigService.config.state,
    type: 'externalRedirection'
  }

  series = {
    title: ['My series', 'Mes séries'],
    redirectionUrl: 'series',
  }

  // TODO : picture in local storage
  profile = {
    title: ['My profile', 'Mon profil'],
    redirectionUrl: 'profile',
  }

  languages = [
    {code: 'EN', hover: 'English'}, {code: 'FR', hover: 'Français'}
  ]

  constructor(protected internalService: InternalService, private backend: BackendStravaService, public globalConfigService: GlobalConfigService) {
  }

  ngOnInit(): void {
    this.internalService.initLanguage()
  }

  handlerLanguage(code: string): void {
    this.internalService.changeLanguage(code)
  }
}
