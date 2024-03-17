import {Component, Input} from '@angular/core';
import {InternalService} from "../../services/internal.service";

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss'],
})
export class ErrorFormComponent {
  @Input() name: string[] = ["Error", "Erreur"];
  @Input() display: boolean = true;

  constructor(protected internalService: InternalService){}
}
