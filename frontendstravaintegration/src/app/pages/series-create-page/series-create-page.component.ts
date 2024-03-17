import {Component} from '@angular/core';
import {InternalService} from "../../services/internal.service";
import {BackendStravaService} from "../../services/backend-strava.service";

@Component({
  selector: 'app-series-create-page',
  templateUrl: './series-create-page.component.html',
  styleUrls: ['./series-create-page.component.scss'],
})
export class SeriesCreatePageComponent {
  constructor(protected internalService: InternalService, private backend: BackendStravaService) {}
}
