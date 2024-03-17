import {Component} from '@angular/core';
import {InternalService} from "../../services/internal.service";

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent {

  createSerieButton = {
    title: ["New Serie", 'Nouvelle série'],
    redirectionUrl: 'create',
    class: 'button-create-serie'
  }

  constructor(protected internalService: InternalService) {
  }

  ngOnInit(): void {
    this.internalService.initLanguage()
  }
}
