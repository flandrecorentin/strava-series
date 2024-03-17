import {Component} from '@angular/core';
import {BackendStravaService} from "../../services/backend-strava.service";
import {Profile} from "../../interfaces/profile";
import {InternalService} from "../../services/internal.service";
import {Message} from "../../interfaces/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  profile: Profile | undefined
  indexActivity: number = 0;
  lenActivities: number = 0;

  titlePage = ['Stravaaaa...', "Stravaaaa..."]
  subTitleSeries = ['My Series of Activities', "Mes séries d'activitiés"]
  subTitleStrava = ['Stravaaaa...', "Stravaaaa..."]

  constructor(private backend: BackendStravaService, protected internalService: InternalService) {
  }

  ngOnInit(): void {
    try {
      this.backend.getProfile().subscribe({
        next: (res) => {
          this.profile = res;
          this.lenActivities = res.activitiesStrava.length
        },
        error: (res) => {
          this.internalService.handleErrorStatus(res.status)
        },
        complete: () => {
        }
      });
    } catch (error) {
      this.internalService.handleErrorStatus(500)
    }
  }

  handleIncrementStravaActivity(increment: number): void {
    if (this.indexActivity == 0 && increment < 0) this.indexActivity = this.lenActivities + increment
    else this.indexActivity = (this.indexActivity + increment) % this.lenActivities
  }
}
