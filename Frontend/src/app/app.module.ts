import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventImageComponent } from './event-image/event-image.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { LocalDetailsComponent } from './local-details/local-details.component';
import { LocalListComponent } from './local-list/local-list.component';
import { MapComponent } from './map/map.component';
import { LocalImageComponent } from './local-image/local-image.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutCancelComponent } from './checkout-cancel/checkout-cancel.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ProfileComponent } from './profile/profile.component';
import { EventNameComponent } from './event-name/event-name.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventImageComponent,
    LoginComponent,
    RegisterComponent,
    EventDetailsComponent,
    DateTimeComponent,
    LocalDetailsComponent,
    LocalListComponent,
    MapComponent,
    LocalImageComponent,
    NavBarComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutSuccessComponent,
    CheckoutCancelComponent,
    MaintenanceComponent,
    ProfileComponent,
    EventNameComponent,
  ],
  imports: [FormsModule,BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
