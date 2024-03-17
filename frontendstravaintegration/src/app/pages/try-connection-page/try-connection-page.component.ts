import {Component} from '@angular/core';
import {InternalService} from "../../services/internal.service";
import {BackendStravaService} from "../../services/backend-strava.service";
import {GlobalConfigService} from "../../../global-config.service";

@Component({
  selector: 'app-try-connection-page',
  templateUrl: './try-connection-page.component.html',
  styleUrls: ['./try-connection-page.component.scss'],
  providers: [
    InternalService,
    BackendStravaService
  ],
})
export class TryConnectionPageComponent {
  conform: boolean | undefined
  error: boolean | undefined
  code: string = ""
  scope: string = ""
  state: string | undefined

  constructor(private internalService: InternalService, private backendStravaService: BackendStravaService, public globalConfigService: GlobalConfigService) {
  }

  ngOnInit(): void {
    let queryParams = this.internalService.getParamsURL();

    if (queryParams.error == "access_denied") {
      this.error = true;
      this.conform = true;
      return;
    } else {
      this.error = false;
    }

    // Check if parameters of the query is conform
    // TODO : see what's happening when not all scope authorize ?
    if (queryParams.code == undefined || queryParams.state == undefined || queryParams.scope == undefined) {
      this.conform = false;
      return;
    } else {
      this.conform = true;
      this.code = queryParams.code;
      this.state = queryParams.state;
      this.scope = queryParams.scope;
    }
    let grand_type = "authorization_code"
    this.backendStravaService.exchangeToken(this.globalConfigService.config.client_id, this.code, grand_type, this.scope).subscribe(resp => {
    })
  }


}
