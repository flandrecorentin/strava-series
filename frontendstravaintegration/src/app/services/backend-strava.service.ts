import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Authentication} from "../interfaces/authentication";
import {Profile} from "../interfaces/profile";
import {Message} from "../interfaces/message";
import {InternalService} from "./internal.service";
import { environment } from '../../environments/environment';

@Injectable()
export class BackendStravaService {

  backendstravaPathRewrite = environment.apiUrlv1
  backendStravaVersion = this.backendstravaPathRewrite + 'version/'
  backendStravaTokenExchange = this.backendstravaPathRewrite + 'token-exchange/'
  backendStravaConfig = this.backendstravaPathRewrite + 'config/'
  backendStravaProfileStrava = this.backendstravaPathRewrite + 'profile/'
  backendStravaRevokeAccess = this.backendstravaPathRewrite + 'revoke-access/'
  backendStravaDeconnect = this.backendstravaPathRewrite +  'deconnect/'

  constructor(private http: HttpClient, private internalService: InternalService) {
  }

  healthCheck() {
    return this.http.get<Message>(this.backendstravaPathRewrite+'/' );
  }

  getVersion() {
    return this.http.get<Message>(this.backendStravaVersion);
  }

  exchangeToken(client_id: number, code: string, grand_type: string, scope: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${localStorage['access_token']}`,
    });
    const params = new HttpParams()
      .set('client_id', client_id)
      .set('code', code)
      .set('grant_type', grand_type)
      .set('scope', scope);
    return this.http.get<Message>(this.backendStravaTokenExchange, {headers, params});
  }

  getProfile() {
    return this.http.get<Profile>(this.backendStravaProfileStrava, {});
  }

  revokeAccessStrava() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${localStorage['access_token']}`,
    });
    this.deconnect().subscribe({
      next: (res) => {
      },
      error: (res) => this.internalService.handleErrorStatus(res.status),
      complete: () => {
      }
    });
    return this.http.get<Message>(this.backendStravaRevokeAccess, {headers});
  }

  deconnect() {
    return this.http.get<Message>(this.backendStravaDeconnect);
  }

}
