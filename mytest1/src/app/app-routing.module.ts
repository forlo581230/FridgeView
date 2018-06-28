import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { WipDashboardComponent } from './wip-dashboard/wip-dashboard.component';
const routes: Routes = [
    { path: '',   redirectTo: '/map', pathMatch: 'full' },
    { path: 'dashboard/:id', component: DashboardComponent },
    { path: 'WIPdashboard/:id', component: WipDashboardComponent },
    { path: 'map',        component: MapComponent },
];
  // { path: 'carSetting', component: AppCarSetting},
  // { path: 'trafficInfo', component: AppTrafficInfo},
  // { path: 'speed', component: SpeedComponent}

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
