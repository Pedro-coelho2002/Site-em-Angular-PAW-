import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventImageComponent } from './event-image/event-image.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LocalListComponent } from './local-list/local-list.component';
import { LocalDetailsComponent } from './local-details/local-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutCancelComponent } from './checkout-cancel/checkout-cancel.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventListComponent,
    data: { title: 'Events List' },
  },
  {
    path: 'event-image',
    component: EventImageComponent,
    data: { title: 'Event Image' },
  },
  {
    path: 'event/view/:id',
    component: EventDetailsComponent,
    data: { title: 'Event Details' },
  },
  {
    path: 'locals',
    component: LocalListComponent,
    data: { title: 'Locals List' },
  },
  {
    path: 'local/view/:id',
    component: LocalDetailsComponent,
    data: { title: 'Local Details' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Checkout' },
  },
  {
    path: 'checkout/success',
    component: CheckoutSuccessComponent,
    data: { title: 'Success Checkout' },
  },
  {
    path: 'checkout/cancel',
    component: CheckoutCancelComponent,
    data: { title: 'Cancel Checkout' },
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    data: { title: 'Maintenance' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: EventListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
