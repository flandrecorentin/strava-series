import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {NotFound404PageComponent} from './pages/not-found404-page/not-found404-page.component';
import {WelcomePageComponent} from './pages/welcome-page/welcome-page.component';
import {TryConnectionPageComponent} from "./pages/try-connection-page/try-connection-page.component";
import {TryDeconnectionPageComponent} from "./pages/try-deconnection-page/try-deconnection-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {RevokeAccessPageComponent} from "./pages/revoke-access-page/revoke-access-page.component";
import {ContactPageComponent} from "./pages/contact-page/contact-page.component";
import {SeriesPageComponent} from "./pages/series-page/series-page.component";
import {SeriesCreatePageComponent} from "./pages/series-create-page/series-create-page.component";

const nameApp = 'StravaSeries'

const routes: Routes = [

  // *** Profile pages ***
  {path: 'profile', component: ProfilePageComponent, title: nameApp + ' - Profile'},

  // *** Series pages ***
  {path: 'series', component: SeriesPageComponent, title: nameApp + ' - Series'},
  {path: 'series/create', component: SeriesCreatePageComponent, title: nameApp},

  // *** Authentication pages ***
  {path: 'try-connection', component: TryConnectionPageComponent, title: nameApp},
  {path: 'try-deconnection', component: TryDeconnectionPageComponent, title: nameApp},
  {path: 'revoke-access', component: RevokeAccessPageComponent, title: nameApp},

  // *** Other page***
  {path: 'contact', component: ContactPageComponent, title: nameApp + ' - Contact'},
  {path: 'about', component: AboutPageComponent, title: nameApp + ' - About'},
  {path: '', component: WelcomePageComponent, title: nameApp},

  // *** Default page ***
  {path: '**', pathMatch: 'full', component: NotFound404PageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
