import {ProfileStrava} from "./profile-strava";
import {ActivityStrava} from "./activity-strava";

export interface Profile {
  profileStrava: ProfileStrava,
  activitiesStrava: ActivityStrava[];
}
