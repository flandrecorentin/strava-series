import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @Input() word: string = "";
  @Input() number: number = 0;
  @Input() index: number | undefined;
}
