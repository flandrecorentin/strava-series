import {NgModule, importProvidersFrom} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {NotFound404PageComponent} from './pages/not-found404-page/not-found404-page.component';
import {WelcomePageComponent} from './pages/welcome-page/welcome-page.component';
import {ActivityComponent} from './components/activity/activity.component';
import {ButtonComponent} from './components/button/button.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {TryConnectionPageComponent} from './pages/try-connection-page/try-connection-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {BackendStravaService} from "./services/backend-strava.service";
import {TryDeconnectionPageComponent} from './pages/try-deconnection-page/try-deconnection-page.component';
import {InternalService} from "./services/internal.service";
import {RevokeAccessPageComponent} from './pages/revoke-access-page/revoke-access-page.component';
import {FormsModule} from "@angular/forms";
import {ContactPageComponent} from './pages/contact-page/contact-page.component';
import {GlobalConfigService} from "../global-config.service";
import {SeriesPageComponent} from './pages/series-page/series-page.component';
import {SeriesCreatePageComponent} from './pages/series-create-page/series-create-page.component';
import { SerieFormComponent } from './components/serie-form/serie-form.component';
import { ErrorFormComponent } from './components/error-form/error-form.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutPageComponent,
        NotFound404PageComponent,
        WelcomePageComponent,
        ActivityComponent,
        ButtonComponent,
        HeaderComponent,
        FooterComponent,
        TryConnectionPageComponent,
        ProfilePageComponent,
        TryDeconnectionPageComponent,
        RevokeAccessPageComponent,
        ContactPageComponent,
        SeriesPageComponent,
        SeriesCreatePageComponent,
        ErrorFormComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        SerieFormComponent
    ],
    providers: [
        HttpClientModule,
        BackendStravaService,
        InternalService,
        GlobalConfigService
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
