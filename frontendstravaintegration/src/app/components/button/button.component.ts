import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() class: string = "button-default";
  @Input() type: string = "internalRedirection";
  @Input() text: string | undefined;
  @Input() redirectionUrl: string | undefined;

  constructor() {
  }

  ngOnInit(): void {

  }

  redirectionExternalUrl(url: string | undefined): void {
    if (url != undefined) window.location.href = url;
  }
}
