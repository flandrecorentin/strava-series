import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {

  // config for production
  // config = {
  //   "client_id": 117484,
  //   "redirect_uri": "https://flandrecorentin.com/"+"try-connection",
  //   "response_type": "code",
  //   "scope": "activity:read_all,activity:write",
  //   "state": "connect"
  // }

  // config for development
  config = {
    "client_id": 117484,
    "redirect_uri": "http://localhost:4200/" + "try-connection",
    "response_type": "code",
    "scope": "activity:read_all,activity:write",
    "state": "connect"
  }
}
